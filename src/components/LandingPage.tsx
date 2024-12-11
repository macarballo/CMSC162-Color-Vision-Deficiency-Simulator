import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import handsImage from '../assets/hands.png'; 
import './LandingPage.css'; 

const LandingPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Initialize the navigate hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">

      <h1 className="landing-page-title">Chromify</h1>
      <p className="landing-page-subtitle">Empathy through every hue.</p>

      <button
        className={`landing-page-button ${isHovered ? 'hovered' : ''}`} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        onClick={() => navigate('/PreviewPage')}
      >
        Get Started
      </button>


      <div className="landing-page-image-container">
        <img
          src={handsImage} 
          alt="Chromify Illustration" 
          className="landing-page-image" 
        />
      </div>
    </div>
  );
};


export default LandingPage;