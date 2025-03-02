import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Camera, AlertTriangle, CheckCircle } from 'lucide-react';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// Import the Animation.json file instead of lottie.lottie
import animationData from '../assets/Animation.json';

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

  const features = [
    {
      icon: <Camera className="h-6 w-6 text-emerald-500" />,
      title: "Ingredient Analysis",
      description: "Gain detailed information about each component in an ingredient list."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-emerald-500" />,
      title: "Allergen Detection",
      description: "Automatically identifies and highlights potential allergens."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-emerald-500" />,
      title: "Smart Text Processing",
      description: "Advanced algorithms to clean and process ingredient text."
    }
  ];

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
              {/* Use Lottie with the Animation.json file */}
              <Lottie
                loop
                animationData={animationData}
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
              className="text-gray-400 italic mb-12"
            >
              "What you eat is what you become"
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Why We Built ingreSnap</h2>
              <p className="text-gray-300 mb-6">
                Consumers often struggle to make sense of complex ingredient lists, many of which contain terms that are unfamiliar or ambiguous. This lack of clarity can lead to confusion, especially for those managing allergies or following strict dietary restrictions.
              </p>
              <p className="text-gray-300 mb-6">
                <strong className="text-emerald-400">ingreSnap</strong> addresses this problem by offering a tool that simplifies ingredient analysis, empowering users to make informed decisions about their food choices.
              </p>
              <div className="bg-gray-700 rounded-lg p-6 border-l-4 border-emerald-500">
                <p className="text-white italic">
                  Our mission is to make ingredient transparency accessible to everyone, helping create a community of health-conscious individuals by promoting awareness about the ingredients in everyday products.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              {/* Use Lottie with the Animation.json file */}
              <Lottie
                loop
                animationData={animationData}
                play
                style={{ width: 400, height: 400 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our tool provides comprehensive analysis to help you understand what's in your products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-colors"
              >
                <div className="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to analyze your products?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start making informed choices about the products you use every day.
          </p>
          <button
            onClick={() => navigate('/scanner')}
            className="bg-white text-emerald-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Try ingreSnap Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;