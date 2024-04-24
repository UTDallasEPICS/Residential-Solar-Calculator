import React from "react";
import "./Styles.css"
import { useState, useEffect} from "react";

function LandingPage() {

    const [address, setAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("address entered!");


        //https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=aIZq3vAuBiQrBN8d3hyJoh3za1m7s0aVQ12gDSzq&lat=40&lon=-105

    };

    return (
        <div className="home">
            <h1 className="MainHeader">
                Residential Solar Calculator
            </h1>

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

        </div>
    );
}

export default LandingPage;