import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import LandingPage from './components/landingPage';
import About from './components/about';

function App() {
  return (
    <div>
      <nav className='nav'>
        <Link to="/" className='nav-item'>Home</Link>
        <Link to="/About" className='nav-item'>About us</Link>
      </nav>
      <Routes>
        {/*"/" is the root page which is for landing page*/}
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/About" element={<About/>}/>
      </Routes>

    </div>
  );
}

export default App;
