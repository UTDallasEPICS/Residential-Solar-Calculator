import requests
import os
import math
from location import location  # Assumed to be a custom module for getting location data
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv  # Import load_dotenv
from flask import send_from_directory

load_dotenv()

# Initialize Flask application
app = Flask(__name__, static_folder="../../build", static_url_path="")
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)


# NREL PVWatts API URL
url = "https://developer.nrel.gov/api/pvwatts/v8.json"


##Constants
ppr = 0.375  # power panel rating of LG NeON 2 solar panels in kW
cost_perW = (
    2.75  # average cost for a solar panel per watt of power panel rating in dollars
)
batt_cost_perkW = 250  # average cost for a 1kW battery


@app.route("/")
def serve_root():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def serve_react(path):
    return send_from_directory(app.static_folder, "index.html")


# Flask route to handle POST requests for system information
@app.route("/getSystemInfo", methods=["POST"])
def get_system_info():
    with app.app_context():  # Ensures that the application context is available
        data = request.json  # Get JSON data from the request
        address = data.get("address")  # Extract 'address' from request data
        annual_energy_use = int(
            data.get("annualEnergyUse")
        )  # Extract 'annualEnergyUse' and convert to integer
        annualEnergyCost = int(data.get("annualEnergyCost"))
        solarPanelCapacity = int(data.get("solarPanelCapacity"))
        if (
            address or annual_energy_use is not None
        ):  # Check if address or annual energy use is provided
            pvw_result = process_system_info(
                address, annual_energy_use, annualEnergyCost, solarPanelCapacity
            )  # Process the information
            return jsonify(pvw_result)  # Return the results as JSON


# Read the API key
api_key = os.getenv("NREL_API_KEY")


# Function to process system information using PVWatts API
def process_system_info(
    address, annual_energy_use, annualEnergyCost, solarPanelCapacity
):
    if solarPanelCapacity > 0:
        ppr = solarPanelCapacity / 1000.0
    global results
    results = "none"
    if (
        address is None or annual_energy_use is None
    ):  # Check if address and annual energy use are provided
        print("No System Info.")
        return results  # Return default results if missing

    loc = location(
        address
    )  # Get location details (latitude and longitude) from the 'location' module
    params_min = {
        "api_key": api_key,  # API key for the request
        "azimuth": 180,  # Azimuth angle for solar panels (0 for true north, 90 for east, 180 for south, and 270 for west)
        "lat": loc.latitude,  # Latitude of the location
        "lon": loc.longitude,  # Longitude of the location
        "system_capacity": ppr,  # System capacity in kW
        "losses": 14,  # Estimated system losses (%)
        "array_type": 1,  # Fixed tilt array type
        "module_type": 0,  # Standard module type
        "tilt": 30,  # Tilt angle of the panels (usually between 20-30)
    }

    # creating a second set of paramaters so that the program can output a range from the min number of panels needed to the max number
    params_max = params_min.copy()
    params_max["azimuth"] = 90  # assuming the azimuth is east facing

    # Make a GET request to PVWatts API
    response = requests.get(url, params=params_min)
    response2 = requests.get(url, params=params_max)
    data_min = response.json()  # Convert response to JSON format
    data_max = response2.json()  # Convert response to JSON format

    # Check if the response contains necessary datas
    if "outputs" in data_min and "ac_annual" in data_min["outputs"]:
        ac_annual_min = data_min["outputs"][
            "ac_annual"
        ]  # Annual AC energy output in kWh
        ac_annual_max = data_max["outputs"]["ac_annual"]
        capacity_factor = data_min["outputs"]["capacity_factor"]  # Capacity factor
        ac_monthly = data_min["outputs"]["ac_monthly"]
        # Calculate additional system details
        num_panels_min = math.ceil(annual_energy_use / ac_annual_min)
        num_panels_max = math.ceil(annual_energy_use / ac_annual_max)
        pv_system_cost_min = ppr * 1000 * cost_perW * num_panels_min
        pv_system_cost_max = ppr * 1000 * cost_perW * num_panels_max

        # Store results in a dictionary
        results = {
            "ac_monthly": ac_monthly,
            "ac_annual": ac_annual_min,
            "panel_cost": cost_perW * ppr * 1000,
            "capacity_factor": capacity_factor,
            "num_panels": [num_panels_min, num_panels_max],
            "pv_system_cost": (pv_system_cost_min, pv_system_cost_max),
            "battery_capacity": math.ceil(annual_energy_use / 365),
            "battery_cost": math.ceil(annual_energy_use / 365) * batt_cost_perkW,
            "pv_cost": cost_perW * ppr * 1000,
            "ac_monthly": ac_monthly,
            "annualEnergyUse": annual_energy_use,
            "annualCost": annualEnergyCost,
        }

        return results


# Function to estimate the PV system size based on annual energy use
def get_pv_system(annual_energy_use):
    return ((annual_energy_use / 365) * 1.29) / 5.07


# Function to calculate the number of batteries needed
def get_battery_capacity(pv_system):
    return round(((pv_system * 3) / 4.8), 0)


# Function to calculate the total cost of the PV system
def get_pv_cost(pv_system, num_panels, battery_capacity):
    panel_cost = (num_panels * 1.8 * 108) + (
        3270 * pv_system
    )  # Calculate cost of panels
    battery_cost = 535 * battery_capacity  # Calculate cost of batteries
    return 0.7 * (panel_cost + battery_cost)  # Return total cost with a 30% reduction


if __name__ == "__main__":
    app.run(debug=True)
