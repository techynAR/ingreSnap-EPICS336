import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowDown } from 'lucide-react';
import Lottie from 'react-lottie-player';
// Import the Animation.json file instead of health-animation.json
import animationData from './assets/Animation.json';

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="home" className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
          <div
            ref={ref}
            className={`transform transition-all duration-1000 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <img 
              src="/ingresnap-logo.png" 
              alt="ingreSnap Logo" 
              className="w-48 h-auto mb-6 mx-auto" 
            />
            <Lottie
              loop
              animationData={animationData}
              play
              style={{ width: 300, height: 300 }}
            />
            <h1 className="text-4xl sm:text-6xl font-bold mt-8 mb-4">
              Welcome to <span className="text-emerald-500">ingreSnap</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Understand what's in your products with just a snap.
            </p>
            <p className="text-lg sm:text-xl italic text-emerald-400 mb-12">
              "What you eat is what you become"
            </p>
            <button
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 mx-auto"
            >
              Get Started
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;