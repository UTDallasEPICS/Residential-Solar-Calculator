import React from "react";
import "./Styles.css"
import { useState, useEffect} from "react";
<<<<<<< HEAD
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
=======
import background from '../assets/solarPanel.jpg'
>>>>>>> ff9d85b04bab9504a9e058b8e7d0ce7013c2b446

function LandingPage() {

    const [address, setAddress] = useState("")
    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetch('/data').then(res => res.json()).then(data => {
            setData(data.ac_monthly);
          });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("address entered!");
        
        //https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=aIZq3vAuBiQrBN8d3hyJoh3za1m7s0aVQ12gDSzq&lat=40&lon=-105

    };

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
                    <p>Your annual AC output is {data} kWH.</p>
            </h1>
<<<<<<< HEAD
            <form onSubmit={handleSubmit}>
                
                <input 
                    className="addressField"
                    type="text" 
                    placeholder="Enter your address"
                    value={address} 
                    onChange={e => setAddress(e.target.value)}
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
=======

            <div className="fieldWithButton">
                <form onSubmit={handleSubmit}>
                        
                        <input 
                            className="addressField"
                            type="text" 
                            placeholder="Enter your address"
                            value={address} 
                            onChange={e => setAddress(e.target.value)}
                        />
                        <input className="submitAddress" type="submit" value="Submit" />

                    </form>
            </div>
                
            <h1>{address}</h1>

>>>>>>> ff9d85b04bab9504a9e058b8e7d0ce7013c2b446
        </div>


    ): <></>
}

export default LandingPage;