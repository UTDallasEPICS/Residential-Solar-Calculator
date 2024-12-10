import requests
import os
import math
from location import location  # Assumed to be a custom module for getting location data
from flask import Flask, jsonify, request
from flask_cors import CORS


# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)


# NREL PVWatts API URL
url = 'https://developer.nrel.gov/api/pvwatts/v8.json'


##Constants
ppr = 0.375 #power panel rating of LG NeON 2 solar panels in kW
cost_perW = 2.75 #average cost for a solar panel per watt of power panel rating in dollars
batt_cost_perkW = 250 #average cost for a 1kW battery

# Flask route to handle POST requests for system information
@app.route('/getSystemInfo', methods=['POST'])
def get_system_info():
    with app.app_context():  # Ensures that the application context is available
        data = request.json  # Get JSON data from the request
        address = data.get('address')  # Extract 'address' from request data
        annual_energy_use = int(data.get('annualEnergyUse'))  # Extract 'annualEnergyUse' and convert to integer
        solarPanelCapacity = int(data.get('solarPanelCapacity'))
        if address or annual_energy_use is not None:  # Check if address or annual energy use is provided
            pvw_result = process_system_info(address, annual_energy_use, solarPanelCapacity)  # Process the information
            print(pvw_result["ac_monthly"])  
            return jsonify(pvw_result)  # Return the results as JSON


# Read the API key from a text file
#api_file = open("api-keys.txt", "r")
#line = api_file.readlines()[0]
#print(line)
#api_key = line.split(',')[1]  # Extract API key from the file
api_key = '5cfaHYaMmcrwrpWaI6b3940c9vhzgiTYVG3fB4Sg'






# Function to process system information using PVWatts API
def process_system_info(address, annual_energy_use, solarPanelCapacity):  
    if solarPanelCapacity > 0:
            ppr = solarPanelCapacity/1000.0  
    global results
    results = "none"
    if address is None or annual_energy_use is None:  # Check if address and annual energy use are provided
        print("No System Info.")
        return results  # Return default results if missing


    loc = location(address)  # Get location details (latitude and longitude) from the 'location' module
    params_min = {
        "api_key": '5cfaHYaMmcrwrpWaI6b3940c9vhzgiTYVG3fB4Sg',  # API key for the request
        "azimuth": 180,  # Azimuth angle for solar panels (0 for true north, 90 for east, 180 for south, and 270 for west)
        "lat": loc.latitude,  # Latitude of the location
        "lon": loc.longitude,  # Longitude of the location
        "system_capacity": ppr,  # System capacity in kW
        "losses": 14,  # Estimated system losses (%)
        "array_type": 1,  # Fixed tilt array type
        "module_type": 0,  # Standard module type
        "tilt": 30  # Tilt angle of the panels (usually between 20-30)
    }  


    #creating a second set of paramaters so that the program can output a range from the min number of panels needed to the max number
    params_max = params_min.copy()
    params_max["azimuth"] = 90 #assuming the azimuth is east facing
 
    # Make a GET request to PVWatts API
    response = requests.get(url, params=params_min)
    response2 = requests.get(url, params = params_max)
    data_min = response.json()  # Convert response to JSON format
    data_max = response2.json()  # Convert response to JSON format
   
    # Check if the response contains necessary datas
    if 'outputs' in data_min and 'ac_annual' in data_min['outputs']:
        ac_annual_min = data_min['outputs']['ac_annual']  # Annual AC energy output in kWh  
        ac_annual_max = data_max['outputs']['ac_annual']
        solrad_monthly = data_min['outputs']['solrad_monthly']  # Annual solar radiation
        capacity_factor = data_min['outputs']['capacity_factor']  # Capacity factor
        ac_monthly = data_min['outputs']['ac_monthly']
        # Calculate additional system details
        #pv_system = get_pv_system(annual_energy_use)  # Calculate PV system size
        #battery_capacity = get_battery_capacity(pv_system)  # Calculate number of batteries needed
        num_panels_min = math.ceil(annual_energy_use/ac_annual_min)
        num_panels_max = math.ceil(annual_energy_use/ac_annual_max)
        pv_system_cost_min = ppr * 1000 * cost_perW * num_panels_min
        pv_system_cost_max = ppr * 1000 * cost_perW * num_panels_max
       
        # Store results in a dictionary
        results = {
            "ac_monthly" : ac_monthly,
            "ac_annual": ac_annual_min,
            "panel_cost": cost_perW * ppr * 1000,
            #"solrad_monthly": solrad_monthly,
            "capacity_factor": capacity_factor,
            #"pv_system": pv_system,
            "num_panels": [num_panels_min, num_panels_max],
            #"battery_capacity": battery_capacity,
            "pv_system_cost": (pv_system_cost_min, pv_system_cost_max),
            #"solrad_annual": solrad_annual,
            "battery_capacity": math.ceil(annual_energy_use/365),
            "battery_cost" : math.ceil(annual_energy_use/365) * batt_cost_perkW,
            "pv_cost": cost_perW * ppr * 1000,
            "ac_monthly" : ac_monthly,
            "annualEnergyUse" : annual_energy_use
        }
        # Print estimated results
        #print(f"Estimated Cost for Solar Panels: {results['pv_system_cost']}")
        #print(f"Num Pannels: {results["num_panels"]}")
        print(results['ac_monthly'][0])


   
        return results


# Function to estimate daily energy production per panel
# ppr = Panel Power Rating(Using LG NeON 2 as default panel specifications), rad = avg daily solar radiation for
# a particular month, eff = system efficiency (1-(losses/100)), cons = monthly energy consumption
# ppr MUST BE IN kW NOT W
""" def get_num_panels(ppr, rad, eff, cons):
    return (math.ceil(cons/(ppr * rad * eff * 30))) """




# Function to estimate the PV system size based on annual energy use
def get_pv_system(annual_energy_use):
    return (((annual_energy_use / 365) * 1.29)/ 5.07)


# Function to calculate the number of batteries needed
def get_battery_capacity(pv_system):
    return round(((pv_system * 3) / 4.8), 0)


# Function to calculate the total cost of the PV system
def get_pv_cost(pv_system, num_panels, battery_capacity):
    panel_cost = (num_panels * 1.8 * 108) + (3270 * pv_system)  # Calculate cost of panels
    battery_cost = 535 * battery_capacity  # Calculate cost of batteries
    return (0.7 * (panel_cost + battery_cost))  # Return total cost with a 30% reduction

if __name__ == '__main__':
    app.run(debug=True)
#print(process_system_info("453 Booth Street, Ottawa ON",10000)["pv_cost"])
#get_system_info("1600 Pennsylvania Ave, Dallas, TX 75201",12000)
	
