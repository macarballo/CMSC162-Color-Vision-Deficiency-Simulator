import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import pyloidLogo from './assets/pyloid_icon.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [hello_charmagne, setHello_charmagne] = useState<string>("");

  useEffect(() => {
    window.pyloid.TestApi.hello_charmagne().then((response: string) => {
      setHello_charmagne(response);
    });
  }, []);
    
  
  
  return (
    <>
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={pyloidLogo}
            className="logo pyloid"
            alt="Pyloid logo"
          />
        </a>
      </div>
      <h1>Vite + React + Pyloid</h1>
      <div className="card">
        <button onClick={() => window.pyloid.custom.create_window()}>
          Create Window
        </button>
        <button onClick={() => window.pyloid.WindowAPI.close()}>
          Close
        </button>
        <button onClick={async () => await window.pyloid.TestApi.hello_charmagne()}>
          <p>{hello_charmagne}</p>
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
