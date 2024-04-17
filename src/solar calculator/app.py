import requests
from location import location

url = 'https://developer.nrel.gov/api/pvwatts/v8.json'

api_file = open("src/solar calculator/api-keys.txt", "r")
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

def display_request(data):
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "September", "November", "December"]

    print("----AC Monthly----")
    for x in range(12):
        print(f"{months[x]}: {data['outputs']['ac_monthly'][x]}")
    print("\n----POA Monthly----")
    for x in range(12):
        print(f"{months[x]}: {data['outputs']['poa_monthly'][x]}")
    print("\n---Solar Radiation Monthly---")
    for x in range(12):
        print(f"{months[x]}: {data['outputs']['solrad_monthly'][x]}")
    print("\n----DC Monthly----")
    for x in range(12):
        print(f"{months[x]}: {data['outputs']['dc_monthly'][x]}")
    
    ac_annual = data['outputs']['ac_annual']
    solrad_annual = data['outputs']['solrad_annual']
    capacity_factor = data['outputs']['capacity_factor']
    
    print(f"\nEstimated annual AC energy production: {ac_annual} kWh")
    print(f"Estimated annual solar radiation: {solrad_annual}")
    print(f"Estimated annual solar radiation: {capacity_factor}")
    

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    display_request(data)
else:
    print(f"Request failed with status code {response.status_code}")

