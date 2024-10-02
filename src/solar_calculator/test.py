import requests
response = requests.get("https://developer.nrel.gov/api/pvwatts/v8.json?api_key=5cfaHYaMmcrwrpWaI6b3940c9vhzgiTYVG3fB4Sg&system_capacity=4&module_type=1&losses=10&array_type=0&tilt=45&azimuth=90&lat=37.7749&lon=-122.4194")
print(response.status_code)
# Should return 200 if the request is valid

