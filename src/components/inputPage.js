import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import Map from './Map';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: 'Arial, sans-serif';
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; // Centers form elements horizontally
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  color: #666;
  width: 100%; // Ensures the label uses the full width for proper alignment
  display: flex;
  justify-content: center; // Centers the text of the label
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%; // Ensures the input field fills the form width
  max-width: 360px; // Optional to limit input size
  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;


const SolarCalculator = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [annualEnergyUse, setannualEnergyUse] = useState('');
  const [PVWResult, setPVWResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (annualEnergyUse !== '' && annualEnergyUse > 0) {
        const response = await axios.post('/getSystemInfo', {address, annualEnergyUse});
        const PVWResult_JSON = response.data;
        setPVWResult(response.data);
        console.log('PVWResult:', PVWResult_JSON);
        navigate('/outputPage', { state: { PVWResult_JSON } }); 
      }
      else {
        console.log('Invalid annual energy usage: ', annualEnergyUse);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Container>
      <Title>System Information</Title>
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
          Enter you total annual energy usage in kWh:
          <Input
            type="number"
            placeholder="Enter energy usage in kWh"
            value={annualEnergyUse}
            onChange={(e) => setannualEnergyUse(e.target.value)}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </Form>
      <Map /> 
      
    </Container>
  );
};

export default SolarCalculator;