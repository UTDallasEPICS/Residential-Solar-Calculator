import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [annualEnergyUsage, setAnnualEnergyUsage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Annual energy usage: ", annualEnergyUsage);
    // Routing logic here for moving to output page
  };

  return (
    <Container>
      <Title>Annual Energy Usage</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Enter your total annual energy usage in kWh:
          <Input
            type="number"
            placeholder="Enter energy usage in kWh"
            value={annualEnergyUsage}
            onChange={(e) => setAnnualEnergyUsage(e.target.value)}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default SolarCalculator;
