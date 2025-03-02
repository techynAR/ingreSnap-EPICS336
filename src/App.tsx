import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ScannerPage from './pages/ScannerPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="bg-gray-900 min-h-screen">
          <Navigation />
          <AnimatePresence mode="wait">
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/scanner" element={<ScannerPage />} />
              </Routes>
            </main>
          </AnimatePresence>
          <Analytics />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;