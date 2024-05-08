import requests 
import os
from location import location
from flask import Flask, jsonify, request

app = Flask(__name__)
address = None
results = {
    "ac_annual": None
}

url = 'https://developer.nrel.gov/api/pvwatts/v8.json'

@app.route('/getAddress', methods=['POST'])
def get_address():
    global address
    with app.app_context():
        data = request.json
        addr = data.get('address')
        address = addr
        return "Address recieved."

@app.route('/getData', methods=['GET'])
def get_data():
    with app.app_context():
        global address
        global results
        pvw_results = display_request(address)
        ac_annual = pvw_results['ac_annual']
        if pvw_results is not None:
            return jsonify({'ac_annual': ac_annual})
        else:
            return "Address not initalized."
        
    


api_file = open("api-keys.txt", "r")
line = api_file.readlines()[0]
api_key = line.split(',')[1]


def display_request(address):    
    global results
    if address is None: 
        print("No address entered.")
        return results

    loc = location(address)
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

    response = requests.get(url, params=params)
    data = response.json()

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "September", "November", "December"]

    # print("----AC Monthly----")
    # for x in range(12):
    #     print(f"{months[x]}: {data['outputs']['ac_monthly'][x]}")
    # print("\n----POA Monthly----")
    # for x in range(12):
    #     print(f"{months[x]}: {data['outputs']['poa_monthly'][x]}")
    # print("\n---Solar Radiation Monthly---")
    # for x in range(12):
    #     print(f"{months[x]}: {data['outputs']['solrad_monthly'][x]}")
    # print("\n----DC Monthly----")
    # for x in range(12):
    #     print(f"{months[x]}: {data['outputs']['dc_monthly'][x]}")
    
    if 'outputs' in data and 'ac_annual' in data['outputs']:
        ac_annual = data['outputs']['ac_annual']
        solrad_annual = data['outputs']['solrad_annual']
        capacity_factor = data['outputs']['capacity_factor']
    
        results = {
            "ac_annual": ac_annual
        }

        print(f"\nEstimated annual AC energy production: {ac_annual} kWh")
        print(f"Estimated annual solar radiation: {solrad_annual}")
        print(f"Estimated annual solar radiation: {capacity_factor}")
    
        return results
