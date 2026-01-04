import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import TimerPage from './components/pages/TimerPage';
import SettingsPage from './components/pages/SettingsPage';
import SpotifyCallback from './components/pages/SpotifyCallback';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<TimerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/callback" element={<SpotifyCallback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
