import requests 
import os
from solar_calculator.location import location
from flask import Flask, jsonify

app = Flask(__name__)

url = 'https://developer.nrel.gov/api/pvwatts/v8.json'

api_file = open("api-keys.txt", "r")
line = api_file.readlines()[0]
api_key = line.split(',')[1]

address = input("Enter your address: ")
loc = location(address)
print(f"{loc}\n")

params = {
    "api_key": 'DEMO_KEY',
    "azimuth":0,
    "lat": loc.latitude,  # latitude
    "lon": loc.longitude,  # longitude
    "system_capacity":4,
    "losses":14,
    "array_type":1,
    "module_type":0,
    "gcr":0.4,
    "dc_ac_ratio":1.2,
    "inv_eff":96.0,
    "radius":0,
    "dataset": "nsrdb",
    "tilt": 10
}


@app.route('/data', methods=['GET'])
def get_data():
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        ac_annual = data['outputs']['ac_annual']
        print(params)
        return jsonify({'ac_annual': ac_annual})
    else:
        return jsonify({'error': f"Request failed with status code {response.status_code}"})

if __name__ == "__main__":
    app.run(debug=True)