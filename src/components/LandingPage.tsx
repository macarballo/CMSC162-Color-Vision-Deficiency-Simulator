import handsImage from '../assets/hands.png'
import { useState } from 'react';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontFamily: 'Montserrat',
          fontSize: '10vw', 
          fontWeight: 'bold',
          margin: '0',
          textAlign: 'center',
        }}
      >
        Chromify
      </h1>
      <p
        style={{
          fontFamily: 'Montserrat',
          fontSize: '1.9vw', 
          fontWeight: 'bold',
          margin: '16px 0', 
          textAlign: 'center',
        }}
      >
        Empathy through every hue.
      </p>

      <button
        style={{
          backgroundColor: isHovered ? 'transparent' : '#4E6AF0',
          color: isHovered ? '#4E6AF0' : 'white',
          border: `2px solid ${isHovered ? '#4E6AF0' : 'transparent'}`,
          borderRadius: '4px',
          padding: '16px 20px',
          fontFamily: 'Montserrat',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          maxWidth: '140px',
          maxHeight: '52px',
          width: '100%',
          height: '100%',
          margin: '16px auto',
          transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        Get Started
      </button>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '24px', 
        }}
      >
        
        <img
          src={handsImage}
          alt="Chromify Illustration"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
						width: '480px',
            objectFit: 'contain',

          }}
        />
      </div>
    </div>
  );
}

