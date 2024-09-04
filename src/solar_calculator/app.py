import requests 
import os
from location import location
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# address = None
# annual_energy_use = None
# results = {
#     "ac_annual": None,
#     "solrad_annual": None,
#     "capacity_factor": None,
#     "pv_system": None,
#     "num_panels": None,
#     "num_batteries": None,
#     "pv_cost": None
# }

url = 'https://developer.nrel.gov/api/pvwatts/v8.json'

@app.route('/getSystemInfo', methods=['POST'])
def get_system_info():
    with app.app_context():
        data = request.json
        address = data.get('address')
        annual_energy_use = int(data.get('annualEnergyUse'))
        if address or annual_energy_use is not None:
            pvw_result = process_system_info(address, annual_energy_use)
            print(pvw_result)  
            return jsonify(pvw_result)

#@app.route('/getData', methods=['GET'])
# def get_data(address, annual_energy_use):
#     with app.app_context():
#         global address
#         global annual_energy_use
#         global results
#         if address is not None:
#             pvw_results = display_request(address, annual_energy_use)
#             if pvw_results is not None:
#                 ac_annual = pvw_results['ac_annual']
#                 solrad_annual = pvw_results['solrad_annual']
#                 capacity_factor = pvw_results['capacity_factor']
#                 pv_system = pvw_results['pv_system']
#                 num_panels = pvw_results['num_panels']
#                 num_batteries = pvw_results['num_batteries']
#                 pv_cost = pvw_results['pv_cost']
            
#                 return jsonify({'ac_annual': ac_annual, 'solrad_annual': solrad_annual, 'capacity_factor': capacity_factor, 'pv_system': pv_system, 'num_panels': num_panels, 'num_batteries': num_batteries, 'pv_cost': pv_cost})
#             else:
#                 return "System Info not initalized."
        

api_file = open("api-keys.txt", "r")
line = api_file.readlines()[0]
api_key = line.split(',')[1]


def process_system_info(address, annual_energy_use):    
    global results
    if address is None or annual_energy_use is None: 
        print("No System Info.")
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
    
    if 'outputs' in data and 'ac_annual' in data['outputs']:
        ac_annual = data['outputs']['ac_annual']        
        solrad_annual = data['outputs']['solrad_annual']
        capacity_factor = data['outputs']['capacity_factor']

        pv_system = get_pv_system(annual_energy_use)
        num_panels = get_num_panels(pv_system)
        num_batteries = get_num_batteries(pv_system)
        pv_cost = get_pv_cost(pv_system, num_panels, num_batteries)

        results = {
            "ac_annual": ac_annual,
            "solrad_annual": solrad_annual,
            "capacity_factor": capacity_factor,
            "pv_system": pv_system,
            "num_panels": num_panels,
            "num_batteries": num_batteries,
            "pv_cost": pv_cost
        }
        print(f"\nEstimated annual AC energy production: {ac_annual} kWh")
        print(f"Estimated annual solar radiation: {solrad_annual}")
        print(f"Estimated annual solar radiation: {capacity_factor}")
    
        return results

def get_pv_system(annual_energy_use):
    return (((annual_energy_use / 365) * 1.29)/ 5.07)

def get_num_panels(pv_system):
    return round((pv_system / 0.365), 0)

def get_num_batteries(pv_system):
    return round(((pv_system * 3) / 4.8), 0)

def get_pv_cost(pv_system, num_panels, num_batteries):
    panel_cost = (num_panels * 1.8 * 108) + (3270 * pv_system)
    battery_cost = 535 * num_batteries
    return (0.7 * (panel_cost + battery_cost))


