<<<<<<< HEAD
=======
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
>>>>>>> 7f8417c9a44f96a864b3129ea3f7eaa2cedeb99e
import React, { useState } from "react";
import styled from 'styled-components';
import background from '../assets/solarPanel.jpg';
import './Styles.css';
<<<<<<< HEAD
=======
import Map from './Map';
>>>>>>> Stashed changes
>>>>>>> 7f8417c9a44f96a864b3129ea3f7eaa2cedeb99e

// Styled components for layout and styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: 'Arial, sans-serif';
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  box-sizing: border-box;
`;

// Card container for white background with rounded corners and shadow
const Card = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; // Ensures the card doesn't exceed a reasonable size
  margin: 20px auto; // Centers the card horizontally
  text-align: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #C95100;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 12px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 360px;
  box-sizing: border-box;
  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const LandingPage = () => {
  const [address, setAddress] = useState("");
  const [annualEnergyUse, setAnnualEnergyUse] = useState('');

  // Handle form submission (currently a placeholder for functionality)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', { address, annualEnergyUse });
  };

  return (
    <Container>
      <Card>
        <Title>Residential Solar Calculator</Title>

<<<<<<< HEAD
=======
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
>>>>>>> 7f8417c9a44f96a864b3129ea3f7eaa2cedeb99e
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
<<<<<<< HEAD
    </Container>
  );
=======
      <Map/>;
    </Container>
  );
>>>>>>> Stashed changes
>>>>>>> 7f8417c9a44f96a864b3129ea3f7eaa2cedeb99e
}

export default LandingPage;
