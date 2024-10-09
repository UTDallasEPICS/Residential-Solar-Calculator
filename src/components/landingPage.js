<<<<<<< Updated upstream
import React from "react";
import "./Styles.css"
import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import background from '../assets/solarPanel.jpg'
import InputPage from './inputPage'
import OutputPage from './outputPage'
=======
import React, { useState } from "react";
import styled from 'styled-components';
import background from '../assets/solarPanel.jpg';
import './Styles.css';
import Map from './Map';
>>>>>>> Stashed changes

const AnyReactComponent = ( { text} ) => <div>{text}</div>;
const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 32.99352921142714, 
    lng: -96.7521324973148,
};

function LandingPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('landingPage')
    const [address, setAddress] = useState("")
    const [ACAnnual, setACAnnual] = useState('');
    const [ACMonthly, setACMonthly] = useState([]);

    const handleNavigation = (page) => {
        navigate(page);
    }
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try { 
    //         const response = await fetch('getData')
    //         const jsonData = await response.json();
    //         setACAnnual(jsonData.ac_annual);
    //         setACMonthly(jsonData.ac_monthly);
    //     }
    //     catch (error) {
    //         console.error('Error fetching data: ', error)
    //     }

    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('/getAddress', {address})
        } catch (error) {
            console.error('Error: ', error);
        }
        //fetchData();
        navigate('/outputPage', { state: { address } });
        //https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=aIZq3vAuBiQrBN8d3hyJoh3za1m7s0aVQ12gDSzq&lat=40&lon=-105

    // };
    
    const handleChange = (e) => {
        setAddress(e.target.value);
    }

    const { isLoaded} = useJsApiLoader({
        is: 'google-map-script',
        googleMapsApiKey: "AIzaSyBuQesx3dhroD6_tGnOcFlbr-ACkh8axcY"
    })

    const [map, setMap] = React.useState(null)
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

<<<<<<< Updated upstream
    return isLoaded ? (
        <div className="home">
            <img src={`${background}`} className="backgroundImage" alt="solar panel background"></img>
            <h1 className="MainHeader">
                    Residential Solar Calculator
            </h1>
            <form onSubmit={handleSubmit}>
                
                <input 
                    className="addressField"
                    id = "address"
                    type="text" 
                    placeholder="Enter your address"
                    value={address} 
                    onChange={handleChange}
                />
                <input className="submitAddress" type="submit" value="Submit" />

            </form>
            <div className="map">    
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                onLoad={onLoad}
                onUnmount={onUnmount}>

            </GoogleMap>
            
            </div>
        </div>


    ): <></>
    }
=======
        {/* Form Section */}
        <Form onSubmit={handleSubmit}>
          <Label>
            Enter your address:
            <Input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Label>
          <Label>
            Enter your total annual energy usage in kWh:
            <Input
              type="number"
              placeholder="Enter energy usage in kWh"
              value={annualEnergyUse}
              onChange={(e) => setAnnualEnergyUse(e.target.value)}
            />
          </Label>
          <Button type="submit">Submit</Button>
        </Form>
      </Card>
      <Map/>;
    </Container>
  );
>>>>>>> Stashed changes
}
export default LandingPage;