require 'sinatra'
require 'json'
require 'httparty'
require "addressable/uri"
require "redis"

URL = "https://lostinspace.lanemarknad.se:8000/api2/"
API_KEY = "d5e7bb18-f924-4744-bb21-1059c7fe6064"
r = Redis.new

get "/stars" do
	stars = r.get "stars"
	if stars.nil?
		response = HTTParty.get("#{URL}?session=#{API_KEY}&command=longrange")
		stars = JSON.parse(response.body)["stars"].to_json
		r.set "stars", stars
	end
	stars
end

get "/map" do
	File.read(File.join('public', 'map.html'))
end

get "/ship" do
	response = HTTParty.get("#{URL}?session=#{API_KEY}&command=ship&arg=show")
	response.body
end

post "/set_direction" do
	data = JSON.parse request.body.read
	name = data["name"]

	uri = Addressable::URI.new
	uri.query_values = {
		:session => API_KEY,
		:command => "ship",
		:arg => "setunidest",
		:arg2 => name
	}

	response = HTTParty.get("#{URL}?#{uri.query}")
	{"msg" => "ok"}.to_json
end

post "/set_in_system_direction" do
	data = JSON.parse request.body.read
	name = data["name"]

	uri = Addressable::URI.new
	uri.query_values = {
		:session => API_KEY,
		:command => "ship",
		:arg => "setsystemdest",
		:arg2 => name
	}

	response = HTTParty.get("#{URL}?#{uri.query}")
	{"msg" => "ok"}.to_json
end

get "/planets" do
	# Indata: x, y
	# 1. Make a shortrange call
	# 2. Loop through the planets, are we on x, y?
	#	Try to get extended planet data from DB
	#	If it doesn't exists but we are on x, y - Do a call to object and store the data in db
	x = params["x"].to_i
	y = params["y"].to_i

	response = HTTParty.get("#{URL}?session=#{API_KEY}&command=shortrange")
	system_data = JSON.parse(response.body)
	reached_planet = false
	planets = system_data["system"]["planetarray"]
	result = []
	begin
		planets.each do |planet|
			puts "Lookup '#{planet["planet_no"]}'. The ship is on #{x}, #{y}. The planet is on #{planet["x"]}, #{planet["y"]}"
			planet_info = r.get planet["planet_no"]
			if not planet_info.nil?
				puts "Found '#{planet["planet_no"]}' in database"
				planet_data = JSON.parse planet_info
			elsif planet_info.nil? and x == planet["x"] and y == planet["y"]
				planet_data = JSON.parse HTTParty.get("#{URL}?session=#{API_KEY}&command=object").body
				puts "Store '#{planet["planet_no"]}' in database"
				json_data = planet_data["object_data"].to_json
				if json_data != "null"
					r.rpush "planets", planet["planet_no"]
					r.set planet["planet_no"], planet_data["object_data"].to_json
					reached_planet = true
				end
			else
				puts "Just return '#{planet["planet_no"]}'"
				planet_data = planet
			end
			result.push planet_data
		end
		{
			:reachedPlanet => reached_planet,
			:planets => result
		}.to_json
	rescue
		{
			:reachedPlanet => false,
			:planets => [] 
		}.to_json
	end
end

get "/visited_planets" do
	planets = r.lrange "planets", 0, -1
	result = []
	planets.each do |planet|
		result.push(JSON.parse(r.get planet))
	end
	result.to_json
end

post "/release_drone" do
	data = JSON.parse request.body.read
	x = data["x"].to_i
	y = data["y"].to_i
	drone_id = data["drone_id"]
	planets = r.lrange "planets", 0, -1
	did_release = false
	planets.each do |planet|
		planet = JSON.parse(r.get planet)
		if planet["anomalies"] and planet["x"] == x and planet["y"] == y
			anomaly = planet["anomalies"].first
			uri = Addressable::URI.new
			uri.query_values = {
				:session => API_KEY,
				:command => "ship",
				:arg => "enteranomaly",
				:arg2 => anomaly,
				:arg3 => drone_id
			}
			response = JSON.parse HTTParty.get("#{URL}?#{uri.query}").body
			if response["success"] 
				did_release = true
			end
			puts response.inspect
			break
		end
	end
	{
		:isReleased => did_release,
		:droneID => drone_id
	}.to_json
end

post "/drone_scan" do
	data = JSON.parse request.body.read
	drone_id = data["drone_id"]
	uri = Addressable::URI.new
	uri.query_values = {
		:session => API_KEY,
		:command => "drone",
		:arg => drone_id,
		:arg2 => "scan"
	}
	response = HTTParty.get("#{URL}?#{uri.query}")
	response.body
end
