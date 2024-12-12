# Residential-Solar-Calculator

## Conceptual Overview
After the severe storms like the February 2021 Texas winter storm, many Texas residents are worried about future electricity grid failures. To prevent experiencing another power crisis, many have looked towards transitioning to alternative energy sources. The Residential Solar Calculator application will assist DFW residents in shifting to solar energy by providing estimates on a suitable solar system. The calculator assists users in determining the best solar energy system configuration, estimated investment costs, and educates users on the benefits of solar energy.

## Functional Requirements
- Provide a breakdown of the solar energy system's configuration based on user need's 
    - Number of solar panels
    - Number of batteries
- Provide the estimated total investment cost
- Educate users on solar energy and its benefits

## Third Party Integrations
- PVWatts: Third party API to calculate solar production
- Geopy: library for getting longitude and latitude based off of address

## Stack

### Frontend
- React (framework)
- PrimeReact (UI component library)
- TailwindCSS (styling)
- Javascript (language)

### Backend
- Node.js (runtime)
- Flask (framework)

## Project Setup

### First Time Setup

Before running the project, make sure the following software are installed:
- [Node.js](https://nodejs.org/en/download/package-manager)
- [Flask](https://flask.palletsprojects.com/en/stable/installation/)  

After installing the required software, do the following:

1. Open VSCode and click the "Clone Repository" Button on the welcome screen.
2. In the GitHub repository, click on the green "Code" Button and copy the HTTPS URL.
3. Enter the HTTPS URL into the input box and choose a location for the local repository.
4. Once the project is open, click on the terminal window.
5. Run "npm install" to install the required dependencies.
6. Traverse to the solar calculator directory by running "cd src/solar_calculator" to get to the python code.
7. Then run "flask run". This should display a message saying the server successfully started.
8. Open another terminal window and run "npm start" to start the frontend application.

### Running the Project

After the setting up the first time, you only need to do the following:

1. Open a terminal and "cd src/solar_calculator".
2. Run "flask run".
3. Open another terminal window and run "npm start".