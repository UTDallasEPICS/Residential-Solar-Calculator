import React from "react";
import "./Styles.css"
import { useState, useEffect} from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const AnyReactComponent = ( { text} ) => <div>{text}</div>;
const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 32.99352921142714, 
    lng: -96.7521324973148,
};
import background from '../assets/solarPanel.jpg'

function LandingPage() {

    const [address, setAddress] = useState("")
    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // fetch('/getData').then(res => res.json()).then(data => {
            //     setData(data.results.ac_annual);
            //   });
            const response = await fetch('getData')
            // , {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify( { address })
            // });
            const jsonData = await response.json();
            setData(jsonData.ac_annual);
        }
        catch (error) {
            console.error('Error fetching data: ', error)
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/getAddress', {address})
        } catch (error) {
            console.error('Error: ', error);
        }
        fetchData();
        //https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=aIZq3vAuBiQrBN8d3hyJoh3za1m7s0aVQ12gDSzq&lat=40&lon=-105

    };
    
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

    return isLoaded ? (
        <div className="home">
            <img src={`${background}`} className="backgroundImage" alt="solar panel background"></img>
            <h1 className="MainHeader">
                    Residential Solar Calculator
                    <p>Address: {address}</p>
                    <p>AC Annual: {data}</p>
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
                <h1>{address}</h1>
            <div className="map">    
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
            >
            {
                //child components here
            }
            <></>
            
            </GoogleMap>
            <></>
            </div>
        </div>


    ): <></>
}

export default LandingPage;