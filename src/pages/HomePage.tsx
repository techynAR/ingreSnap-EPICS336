import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import Lottie from 'react-lottie-player';
import healthAnimation from '../assets/health-animation.json';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
          <Lottie
            loop
            animationData={healthAnimation}
            play
            style={{ width: 300, height: 300 }}
          />
          <h1 className="text-4xl sm:text-6xl font-bold mt-8 mb-4">
            Welcome to <span className="text-emerald-500">ingreSnap</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering informed choices through ingredient analysis
          </p>
          <div className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-2xl">
            <p className="text-yellow-400 font-semibold mb-2">Beta Notice</p>
            <p className="text-gray-300">
              This tool is currently in beta phase and under active development. We're working hard to improve its accuracy and features.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => navigate('/scanner')}
              className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              Try the Tool
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="https://github.com/techynAR/ingreSnap-EPICS336"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              View on GitHub
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-400 italic">
            "What you eat is what you become"
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;