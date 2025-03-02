import React from 'react';
import { Helmet } from 'react-helmet-async';
import Scanner from '../components/Scanner';
import { motion } from 'framer-motion';

const ScannerPage = () => {
  return (
    <>
      <Helmet>
        <title>Scan Ingredients - ingreSnap</title>
        <meta name="description" content="Upload a product image to analyze ingredients, identify allergens, and get detailed information about what's in your products with ingreSnap's scanning tool." />
      </Helmet>
      
      <motion.div 
        className="pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Scanner />
      </motion.div>
    </>
  );
};

export default ScannerPage;