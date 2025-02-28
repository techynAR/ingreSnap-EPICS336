import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Users, Book, Code } from 'lucide-react';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>ingreSnap - Ingredient Analysis Made Easy</title>
        <meta name="description" content="Analyze food and cosmetic ingredients instantly with ingreSnap. Identify allergens, understand ingredients, and make informed choices about your products." />
      </Helmet>
      
      <section className="min-h-screen bg-gray-900 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center"
          >
            <motion.div variants={fadeIn}>
              <img 
                src="/ingresnap-logo.png" 
                alt="ingreSnap Logo" 
                className="w-48 h-auto mb-6 mx-auto" 
              />
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
    </>
  );
};

export default HomePage;