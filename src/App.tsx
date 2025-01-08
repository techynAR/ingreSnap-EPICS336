import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import About from './components/About';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Scanner />
        <About />
      </main>
    </div>
  );
}

export default App;