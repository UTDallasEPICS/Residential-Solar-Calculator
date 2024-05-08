import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import LandingPage from './components/landingPage';
import About from './components/about';
import InputPage from './components/inputPage'; // Import your InputPage component
import background from './assets/mountainRange.jpg'
import OutputPage from './components/outputPage';

function App() {
  return (
    <div>
      <nav className='nav'>
        <Link to="/" className='nav-item'>Home</Link>
        <Link to="/About" className='nav-item'>About us</Link>
        <Link to="/inputPage" className='nav-item'>Calculate your solar usage</Link> {/* Add this line */}
      </nav>
      <Routes>
        {/*"/" is the root page which is for landing page*/}
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/inputPage" element={<InputPage/>}/> {/* And this line */}
        <Route path="/output-page" element={<OutputPage />} />
      </Routes>

    </div>
  );
}

export default App;
