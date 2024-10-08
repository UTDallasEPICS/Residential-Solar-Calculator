/*import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 32.99352921142714, // default latitude
  lng: -96.7521324973148, // default longitude
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBuQesx3dhroD6_tGnOcFlbr-ACkh8axcY',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;*/
import React, { useEffect } from 'react';
import TrimbleMaps from "@trimblemaps/trimblemaps-js";
//import '@trimblemaps/trimblemaps-js/dist/trimblemaps-3.20.0.css'; // Import CSS

const Map = () => {
  useEffect(() => {
    // Set your API Key
    TrimbleMaps.APIKey = "F78AF24D77FAED4B82A35495D6B21B13"; 

    // Create the map using 'new' keyword
    const myMap = new TrimbleMaps.Map({
      container: "myMap",
      center: new TrimbleMaps.LngLat(-96, 35),
      zoom: 3,
    });

    // Customize your map once it's loaded
    myMap.on('load', function() {
      // Add customizations here
    });

    // Cleanup function to remove the map on component unmount
    return () => {
      if (myMap) {
        myMap.remove();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount
  
  return (
    <div id="myMap" style={{ height: '300px', width: '400px' }}></div>
  );
};

export default Map;