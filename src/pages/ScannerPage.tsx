import React from 'react';
import { Helmet } from 'react-helmet-async';
import Scanner from '../components/Scanner';

const ScannerPage = () => {
  return (
    <>
      <Helmet>
        <title>Scan Ingredients - ingreSnap</title>
        <meta name="description" content="Upload a product image to analyze ingredients, identify allergens, and get detailed information about what's in your products with ingreSnap's scanning tool." />
      </Helmet>
      
      <div className="pt-16">
        <Scanner />
      </div>
    </>
  );
};

export default ScannerPage;