import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Users, Book, Code } from 'lucide-react';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import healthAnimation from '../assets/health-animation.json';

const HomePage = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center"
        >
          <motion.div variants={fadeIn}>
            <Lottie
              loop
              animationData={healthAnimation}
              play
              style={{ width: 300, height: 300 }}
            />
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-4xl sm:text-6xl font-bold mt-8 mb-4"
          >
            Welcome to <span className="text-emerald-500">ingreSnap</span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Empowering informed choices through ingredient analysis
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-2xl"
          >
            <p className="text-yellow-400 font-semibold mb-2">Beta Notice</p>
            <p className="text-gray-300">
              This tool is currently in beta phase and under active development. We're working hard to improve its accuracy and features.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl"
          >
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Team Project</h3>
              <p className="text-gray-400 text-sm">Created by VIT Bhopal University students</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Book className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Research Backed</h3>
              <p className="text-gray-400 text-sm">Guided by Dr. Arindam Ghosh</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Code className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Open Source</h3>
              <p className="text-gray-400 text-sm">Community-driven development</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
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
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="text-gray-400 italic"
          >
            "What you eat is what you become"
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;