import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: 'Arial, sans-serif';
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Section = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const Text = styled.p`
  color: #666;
  font-size: 16px;
`;

const InfoBox = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  width: 100%;
`;

const InfoTitle = styled.h4`
  margin: 0;
  color: #444;
  font-size: 14px;
`;

const InfoContent = styled.p`
  margin: 5px 0 0;
  font-size: 12px;
  color: #666;
`;

const OutputPage = () => {
  return (
    <PageContainer>
      <Section>
        <Title>Solar Sizing Summary</Title>
        <Text>
          Example Output: This section will display the calculated size of the solar panel system required
          based on the annual energy usage input. It may include details like total kW needed and estimated
          costs.
        </Text>
        <InfoBox>
          <InfoTitle>Total kW Needed</InfoTitle>
          <InfoContent>Approximately 10 kW</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Estimated Cost</InfoTitle>
          <InfoContent>$7,000 - $10,000</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Installation Time</InfoTitle>
          <InfoContent>Typically 3-4 weeks</InfoContent>
        </InfoBox>
      </Section>
      <Section>
        <Title>Battery Sizing</Title>
        <Text>
          Example Output: Here, the required battery size to support the solar system will be shown. This
          could include battery capacity in kWh, number of batteries recommended, and their respective costs.
        </Text>
        <InfoBox>
          <InfoTitle>Battery Capacity</InfoTitle>
          <InfoContent>15 kWh per unit</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Number of Batteries</InfoTitle>
          <InfoContent>3 units recommended</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>Total Cost</InfoTitle>
          <InfoContent>$4,500</InfoContent>
        </InfoBox>
      </Section>
    </PageContainer>
  );
};

export default OutputPage;
