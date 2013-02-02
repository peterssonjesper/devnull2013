require 'sinatra'
require 'json'
require 'httparty'
require "addressable/uri"
require "redis"

URL = "https://lostinspace.lanemarknad.se:8000/api2/"
API_KEY = "c579d00e-67e0-4587-b54e-a1cf239f9e18"
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

get "/ship_position" do
	response = HTTParty.get("#{URL}?session=#{API_KEY}&command=ship&arg=show")
	ship = JSON.parse(response.body)
	{
		:x => ship["unix"],
		:y => ship["uniy"],
		:system_x => ship["systemx"],
		:system_y => ship["systemy"]
	}.to_json
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
	begin
		planets = system_data["system"]["planetarray"]
		result = []
		planets.each do |planet|
			puts "Lookup '#{planet["planet_no"]}'. The ship is on #{x}, #{y}. The planet is on #{planet["x"]}, #{planet["y"]}"
			planet_info = r.get planet["planet_no"]
			if not planet_info.nil?
				puts "Found '#{planet["planet_no"]}' in database"
				planet_data = JSON.parse planet_info
			elsif planet_info.nil? and x == planet["x"] and y == planet["y"]
				planet_data = JSON.parse HTTParty.get("#{URL}?session=#{API_KEY}&command=object").body
				puts "Store '#{planet["planet_no"]}' in database"
				r.set planet["planet_no"], planet_data["object_data"].to_json
			else
				puts "Just return '#{planet["planet_no"]}'"
				planet_data = planet
			end
			result.push planet_data
		end
		result.to_json
	rescue
		[].to_json
	end
end
