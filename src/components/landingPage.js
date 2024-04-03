import React from "react";
import "./Styles.css"
import { useState, useEffect} from "react";

function LandingPage() {

    const [address, setAddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("address entered!");
    };

    return (
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

        </div>
    );
}

export default LandingPage;