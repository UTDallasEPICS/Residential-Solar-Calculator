import requests 
import os
from location import location  # Assumed to be a custom module for getting location data
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# NREL PVWatts API URL
url = 'https://developer.nrel.gov/api/pvwatts/v8.json'

# Flask route to handle POST requests for system information
@app.route('/getSystemInfo', methods=['POST'])
def get_system_info():
    with app.app_context():  # Ensures that the application context is available
        data = request.json  # Get JSON data from the request
        address = data.get('address')  # Extract 'address' from request data
        annual_energy_use = int(data.get('annualEnergyUse'))  # Extract 'annualEnergyUse' and convert to integer
        if address or annual_energy_use is not None:  # Check if address or annual energy use is provided
            pvw_result = process_system_info(address, annual_energy_use)  # Process the information
            print(pvw_result)  
            return jsonify(pvw_result)  # Return the results as JSON

# Read the API key from a text file
#api_file = open("api-keys.txt", "r") 
#line = api_file.readlines()[0]
#print(line)
#api_key = line.split(',')[1]  # Extract API key from the file
api_key = '5cfaHYaMmcrwrpWaI6b3940c9vhzgiTYVG3fB4Sg'



# Function to process system information using PVWatts API
def process_system_info(address, annual_energy_use):    
    global results
    results = "none"
    if address is None or annual_energy_use is None:  # Check if address and annual energy use are provided
        print("No System Info.")
        return results  # Return default results if missing

    loc = location(address)  # Get location details (latitude and longitude) from the 'location' module
    params = {
        "api_key": 'DEMO_KEY',  # API key for the request
        "azimuth": 0,  # Azimuth angle for solar panels
        "lat": loc.latitude,  # Latitude of the location
        "lon": loc.longitude,  # Longitude of the location
        "system_capacity": 4,  # System capacity in kW
        "losses": 14,  # Estimated system losses (%)
        "array_type": 1,  # Fixed tilt array type
        "module_type": 0,  # Standard module type
        "gcr": 0.4,  # Ground cover ratio
        "dc_ac_ratio": 1.2,  # DC to AC size ratio
        "inv_eff": 96.0,  # Inverter efficiency (%)
        "radius": 0,  # Search radius for weather data
        "dataset": "nsrdb",  # Dataset for solar data
        "tilt": 10  # Tilt angle of the panels
    }   

    # Make a GET request to PVWatts API
    response = requests.get(url, params=params)
    data = response.json()  # Convert response to JSON format
    
    # Check if the response contains necessary data
    if 'outputs' in data and 'ac_annual' in data['outputs']:
        ac_annual = data['outputs']['ac_annual']  # Annual AC energy output in kWh       
        solrad_annual = data['outputs']['solrad_annual']  # Annual solar radiation
        capacity_factor = data['outputs']['capacity_factor']  # Capacity factor

        # Calculate additional system details
        pv_system = get_pv_system(annual_energy_use)  # Calculate PV system size
        num_panels = get_num_panels(pv_system)  # Calculate number of panels needed
        num_batteries = get_num_batteries(pv_system)  # Calculate number of batteries needed
        pv_cost = get_pv_cost(pv_system, num_panels, num_batteries)  # Calculate total cost of PV system

        # Store results in a dictionary
        results = {
            "ac_annual": ac_annual,
            "solrad_annual": solrad_annual,
            "capacity_factor": capacity_factor,
            "pv_system": pv_system,
            "num_panels": num_panels,
            "num_batteries": num_batteries,
            "pv_cost": pv_cost
        }
        # Print estimated results
        print(f"\nEstimated annual AC energy production: {ac_annual} kWh")
        print(f"Estimated annual solar radiation: {solrad_annual}")
        print(f"Estimated annual solar radiation: {capacity_factor}")
    
        return results

# Function to estimate the PV system size based on annual energy use
def get_pv_system(annual_energy_use):
    return (((annual_energy_use / 365) * 1.29)/ 5.07)

# Function to calculate the number of solar panels needed
def get_num_panels(pv_system):
    return round((pv_system / 0.365), 0)

# Function to calculate the number of batteries needed
def get_num_batteries(pv_system):
    return round(((pv_system * 3) / 4.8), 0)

# Function to calculate the total cost of the PV system
def get_pv_cost(pv_system, num_panels, num_batteries):
    panel_cost = (num_panels * 1.8 * 108) + (3270 * pv_system)  # Calculate cost of panels
    battery_cost = 535 * num_batteries  # Calculate cost of batteries
    return (0.7 * (panel_cost + battery_cost))  # Return total cost with a 30% reduction

process_system_info("453 Booth Street, Ottawa ON",10000)