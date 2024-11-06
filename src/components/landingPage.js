import React, { useState } from "react";
import styled from 'styled-components';
import background from '../assets/solarPanel.jpg';
import './Styles.css';

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

const getCosts = async (aress, energy) => {
  const address = aress;
  const annualEnergyUse = energy;
  
  try {
    const response = await fetch('http://127.0.0.1:5000/getSystemInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // Add this header
      },
      body: JSON.stringify({ 
        address: address,
        annualEnergyUse: annualEnergyUse
      })
    });

    const result = await response.json();
    console.log("Result from Python:", result);  // Corrected to console.log
  } catch (error) {
    console.error("Error calling Python function:", error);
  }
};


const LandingPage = () => {
  const [address, setAddress] = useState("");
  const [annualEnergyUse, setAnnualEnergyUse] = useState('');

  // Handle form submission (currently a placeholder for functionality)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', { address, annualEnergyUse });
    getCosts(address, annualEnergyUse);
  };

  return (
    <Container>
      <Card>
        <Title>Residential Solar Calculator</Title>

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
    </Container>
  );
}

export default LandingPage;
