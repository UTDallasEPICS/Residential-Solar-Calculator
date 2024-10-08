import React from 'react';
import styled from 'styled-components';

// Card container with white background
const Card = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px;
  text-align: center; // Center all text within the card
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #C95100;
  font-size: 24px;
`;

const SubTitle = styled.h2`
  color: #e87500;
  font-size: 20px;
`;

const Text = styled.p`
  color: #333; // Dark color for better readability
  font-size: 16px;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #0077cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const TeamMember = styled.div`
  margin-bottom: 10px;
  color: #333; // Dark color for better readability
`;

const AboutUsPage = () => (
  <PageContainer>
    <Card>
      <Title>Residential Solar Calculator</Title>
      <SubTitle>Team SUS (Size Ur Solar)</SubTitle>
      <Text>
        <strong>Background:</strong> The University of Texas at Dallas Office of Sustainability was established under the Facilities Management in 2011. This office was made with a goal to engage the university in environmental stewardship, fostering a culture of sustainability to be cherished within the campus as a whole. The Office of Sustainability collaborates with stakeholders and students across the university to integrate sustainability principles and practices into the UT Dallas community.
      </Text>
      <Text>
        <strong>Project Description:</strong> The Residential Solar Calculator project plans to combat sustainable energy and electric grid failures by providing information to DFW residents on energy storage and solar panels. The calculator will provide estimates on solar panel pricing and batteries by taking inputs from the user and working alongside Pvwatts to calculate information to aid the user in their pricing and adequate needs. The end goal of the project is to have a functioning web application where users can receive information such as battery size needed for outages, total cost on solar panels, and time it would take for solar panels to pay themselves off.
      </Text>
      <SubTitle>Project Partner</SubTitle>
      <Text>
        <Link href="https://sustainability.utdallas.edu/">UTD Office of Sustainability</Link>
      </Text>
      <SubTitle>The Team</SubTitle>
      <TeamMember>Samiksha — Project Liaison</TeamMember>
      <TeamMember>Qays — Web Master</TeamMember>
      <TeamMember>Alp — Web Master</TeamMember>
      <TeamMember>Rohin Raina — Project Lead and Web Master</TeamMember>
      <TeamMember>Will — Financial Officer</TeamMember>
      <TeamMember>Lohit — Document Manager</TeamMember>
      <TeamMember>John Michael Bianty — Project Liaison</TeamMember>
      <TeamMember>Weber Tsao — Web Master</TeamMember>
      <TeamMember>Srinivas Devarajugettu — Web Master</TeamMember>
      <TeamMember>Soujanya Prakash Kamalapur — Project Lead</TeamMember>
      <TeamMember>Viswaretas Kotra — Financial Officer</TeamMember>
      <TeamMember>Colin Zhang — Document Manager</TeamMember>
      <Text>
        <strong>Visit our GitHub:</strong> <Link href="https://github.com/UTDallasEPICS/Residential-Solar-Calculator">Project Repository</Link>
      </Text>
    </Card>
  </PageContainer>
);

export default AboutUsPage;
