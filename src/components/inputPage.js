import React, { useState } from 'react';

const SolarCalculator = () => {
  const [monthlyEnergyUsage, setMonthlyEnergyUsage] = useState({
    January: '',
    February: '',
    March: '',
    April: '',
    May: '',
    June: '',
    July: '',
    August: '',
    September: '',
    October: '',
    November: '',
    December: '',
  });

  const handleEnergyUsageChange = (month, value) => {
    setMonthlyEnergyUsage((prevUsage) => ({
      ...prevUsage,
      [month]: value
    }));
  };

  function calculateAvg() {
    const usageValues = Object.values(monthlyEnergyUsage);
    let sum = 0;
    let count = 0;

    for (let value of usageValues) {
      if (value && !isNaN(value)) {  // Ensure the value is not empty and is a number
        sum += parseFloat(value);    // Convert to float and sum
        count++;
      }
    }

    if (count === 0) return 0;  // Prevent division by zero if all are empty or invalid

    return sum / count;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form logic goes here
    const avg = calculateAvg();
    console.log("total average: ", avg)
    console.log("inputted data: ", monthlyEnergyUsage);
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const submitButtonStyle = {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#f0ad4e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div className="solar-calculator" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Energy Usage</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(monthlyEnergyUsage).map((month) => (
          <label key={month} style={{ marginBottom: '20px', display: 'block' }}>
            {month}:
            <input
              type="text"
              placeholder={`Enter energy usage for ${month} in Kilowatts`}
              value={monthlyEnergyUsage[month]}
              onChange={(e) => handleEnergyUsageChange(month, e.target.value)}
              style={inputStyle}
            />
          </label>
        ))}
        <button type="submit" style={submitButtonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default SolarCalculator;
