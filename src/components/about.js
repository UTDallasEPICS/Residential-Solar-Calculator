import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
`;

const SubTitle = styled.h2`
  color: #555;
  font-size: 20px;
`;

const Text = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.5;
  max-width: 800px;
  text-align: justify;
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
`;

const AboutUsPage = () => (
  <PageContainer>
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
    <TeamMember>John Michael Bianty — Project Liaison</TeamMember>
    <TeamMember>Weber Tsao — Web Master</TeamMember>
    <TeamMember>Srinivas Devarajugettu — Web Master</TeamMember>
    <TeamMember>Soujanya Prakash Kamalapur — Project Lead</TeamMember>
    <TeamMember>Viswaretas Kotra — Financial Officer</TeamMember>
    <TeamMember>Colin Zhang — Document Manager</TeamMember>
    <Text>
      <strong>Visit our GitHub:</strong> <Link href="https://github.com/UTDallasEPICS/Residential-Solar-Calculator">Project Repository</Link>
    </Text>
  </PageContainer>
);

export default AboutUsPage;
