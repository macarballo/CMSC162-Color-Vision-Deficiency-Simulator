import { useState } from 'react'; // Importing React's useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook for navigation
import handsImage from '../assets/hands.png'; // Importing the image for the landing page illustration
import './LandingPage.css'; // Import the CSS file for styling and transitions

const LandingPage: React.FC = () => {
  // State to track whether the button is hovered
  const [isHovered, setIsHovered] = useState(false);

  // Initialize the navigate hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      {/* Title of the landing page */}
      <h1 className="landing-page-title">Chromify</h1>

      {/* Subtitle of the landing page */}
      <p className="landing-page-subtitle">Empathy through every hue.</p>

      {/* Button that changes style on hover and navigates to the PreviewPage */}
      <button
        className={`landing-page-button ${isHovered ? 'hovered' : ''}`} // Add hovered class when button is hovered
        onMouseEnter={() => setIsHovered(true)} // Trigger hover state when mouse enters button
        onMouseLeave={() => setIsHovered(false)} // Trigger hover state off when mouse leaves button
        onClick={() => navigate('/PreviewPage')} // Navigate to PreviewPage when button is clicked
      >
        Get Started
      </button>

      {/* Container for the image */}
      <div className="landing-page-image-container">
        {/* Image displayed on the landing page */}
        <img
          src={handsImage} // Source of the image
          alt="Chromify Illustration" // Alt text for the image
          className="landing-page-image" // CSS class for image styling
        />
      </div>
    </div>
  );
};

// Export the LandingPage component for use in other parts of the app
export default LandingPage;