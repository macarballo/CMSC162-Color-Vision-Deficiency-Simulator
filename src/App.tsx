import handsImage from './assets/hands.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
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
        marginTop: '40px', 
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
          fontSize: '2vw', 
          fontWeight: 'bold',
          margin: '16px 0', 
          textAlign: 'center',
        }}
      >
        Empathy through every hue.
      </p>

      <button
        style={{
          backgroundColor: '#4E6AF0',
          color: 'white',
          borderRadius: '4px',
          padding: 'auto 20px',
          fontFamily: 'Montserrat',
          fontSize: '1.4vw',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '24px', 
          maxWidth: '140px',
          width: '100%',
          height: 'auto',
          margin: '16px auto',
        }}
      >
        Get Started
      </button>

      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          maxHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px', 
        }}
      >
        <img
          src={handsImage}
          alt="Chromify Illustration"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
}

export default App;
