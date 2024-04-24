import React from "react";
import "./Styles.css"
import { useState, useEffect} from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

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

    const [address, setAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("address entered!");
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
            <h1 className="MainHeader">
                    Residential Solar Calculator
            </h1>
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
        </div>


    ): <></>
}

export default LandingPage;