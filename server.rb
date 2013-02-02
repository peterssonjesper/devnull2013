require 'sinatra'
require 'json'
require 'httparty'

URL = "https://lostinspace.lanemarknad.se:8000/api2/"
API_KEY = "c579d00e-67e0-4587-b54e-a1cf239f9e18"

get "/stars" do
	response = HTTParty.get("#{URL}?session=#{API_KEY}&command=longrange")
	response.body
end

get "/map" do
	File.read(File.join('public', 'map.html'))
end

get "/ship_position" do
	response = HTTParty.get("#{URL}?session=#{API_KEY}&command=ship&arg=show")
	response.body
end
