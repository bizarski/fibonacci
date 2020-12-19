require "sinatra"
require "uri"
require "net/http"
require "json"

set :port, 4000

get "/fibonacci" do
  size = params['n']
  
  table = nil
  saved = false
  errorMessage = nil 
  
  if size
	  uri = URI("http://localhost:3000/generate")
	  reqParams = { :n => size }
	  uri.query = URI.encode_www_form(reqParams)

	  begin
		res = Net::HTTP.get_response(uri)
		if res.is_a?(Net::HTTPSuccess)
		  result = JSON.parse(res.body) 
		  table = result["table"]
		  saved = result["saved"]
		else 
		  if res.is_a?(Net::HTTPBadRequest)
		    errorMessage = "Invalid value"
		  else 
		    errorMessage = "Unexpected status code from API"
		  end 
		end
	  rescue Errno::ECONNREFUSED => e 
	    errorMessage = "API request timeout. Please, try again later."
	  end
  end
  
  erb :fibonacci, :locals => { :size => size, :table => table, :saved => saved, :errorMessage => errorMessage }, :layout => :application
end

post "/fibonacci" do

  size = params["n"]
  
  table = nil
  errorMessage = nil 
  saved = false 
	
  if !size
	errorMessage = "Missing value"
  end

  uri = URI("http://localhost:3000/save")
  body = { "n" => size }.to_json 

  begin
	res = Net::HTTP.post(uri, body, "Content-Type" => "application/json")
	if res.is_a?(Net::HTTPCreated)
	  result = JSON.parse(res.body) 
	  table = result["table"]
	  saved = result["saved"]
	else 
	  if res.is_a?(Net::HTTPBadRequest)
		errorMessage = "Invalid value"
	  else 
		errorMessage = "Unexpected status code from API"
	  end 
	end
  rescue Errno::ECONNREFUSED => e 
	errorMessage = "API request timeout. Please, try again later."
  end

  erb :fibonacci, :locals => { :size => size, :table => table, :saved => saved, :errorMessage => errorMessage }, :layout => :application
end