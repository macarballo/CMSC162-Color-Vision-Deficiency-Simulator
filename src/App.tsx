import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Preview from './components/Preview';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/PreviewPage" element={<Preview />}/>
            </Routes>
        </Router>
    );
}

export default App;