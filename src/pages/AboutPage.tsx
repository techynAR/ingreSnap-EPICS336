import React from 'react';
import { Leaf, Shield, Users, Github } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-emerald-500" />,
      title: 'Natural Awareness',
      description: 'Understand the natural and artificial components in your products to make informed decisions.',
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-500" />,
      title: 'Safety First',
      description: 'Identify potential allergens and harmful ingredients before they affect your health.',
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-500" />,
      title: 'Community Driven',
      description: 'Join a community of health-conscious individuals making better choices together.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About ingreSnap - Our Mission and Team</title>
        <meta name="description" content="Learn about ingreSnap's mission to empower informed choices through ingredient analysis. Created by VIT Bhopal University students under Dr. Arindam Ghosh's guidance." />
      </Helmet>
      
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About ingreSnap
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              We are a dynamic team of multidisciplinary engineering students from VIT Bhopal University, united by the mission to create innovative solutions that address real-world challenges.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-yellow-400 font-semibold mb-2">Development Status</p>
              <p className="text-gray-300">
                ingreSnap is currently in beta phase. We're actively working on improving the accuracy of ingredient analysis and adding new features.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-8 text-center hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Contribute to ingreSnap
            </h3>
            <p className="text-gray-400 mb-6">
              We believe in the power of community-driven development. Your contributions can help make ingreSnap even better!
            </p>
            <a
              href="https://github.com/techynAR/ingreSnap-EPICS336"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;