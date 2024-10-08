import React, { useState } from 'react';
import './App.css'; // Your custom CSS
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from './components/landingPage';
import About from './components/about';
import OutputPage from './components/outputPage';
import logo from './assets/utdLogo.png'; // Replace with the correct path to your UTD logo
import iconMenuOpen from './assets/icon_menu_open.png'; // Open menu icon
import iconMenuClose from './assets/icon_menu_close.png'; // Close menu icon

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="app-container"> 
      {/* Header Section */}
      <header className='header'>
        <div className="header-content">
          <a href="https://sustainability.utdallas.edu/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="UTD Logo" className='logo-img' />
          </a>

          {/* Title and Department Info */}
          <div className="header-titles">
            <h1 className="header-title">THE UNIVERSITY OF TEXAS AT DALLAS</h1>
            <h2 className="header-subtitle">Facilities & Economic Development</h2>
            <h3 className="header-department">Sustainability</h3>
          </div>

          {/* Menu Toggle Button */}
          <button id="header_menu_link" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="header_menu">
            <img
              id="header_menu_image"
              src={menuOpen ? iconMenuClose : iconMenuOpen}
              alt="Menu Icon"
            />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav id="header_menu" className={menuOpen ? 'default' : 'hidden'}>
          <ul className='nav'>
            <li><Link to="/" className='nav-item'>Home</Link></li>
            <li><Link to="/About" className='nav-item'>About Us</Link></li>
            <li><Link to="/outputPage" className='nav-item'>Output Page</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Area */}
      <main id="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/outputPage" element={<OutputPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
