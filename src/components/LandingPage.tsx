import handsImage from '../assets/hands.png';
import { useState } from 'react';
import UploadWindow from './UploadWindow';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showUploadWindow, setShowUploadWindow] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setShowUploadWindow(false); // Hide upload window after file selection
    navigate('/preview', { state: { fileURL } }); // Navigate to Preview page with the file URL
  };

  return (
    <div className="landing-page-container">
      <h1 className="landing-page-title">Chromify</h1>
      <p className="landing-page-subtitle">Empathy through every hue.</p>

      <button
        className={`landing-page-button ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowUploadWindow(true)}
      >
        Get Started
      </button>

      {showUploadWindow && (
        <div className="upload-window show">
          <UploadWindow onClose={() => setShowUploadWindow(false)} onFileSelect={handleFileSelect} />
        </div>
      )}

      <div className="landing-page-image-container">
        <img
          src={handsImage}
          alt="Chromify Illustration"
          className="landing-page-image"
        />
      </div>
    </div>
  );
}

export default LandingPage;