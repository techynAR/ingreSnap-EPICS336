import React from 'react';
import { Leaf, Shield, Users } from 'lucide-react';

const About = () => {
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
    <section id="about" className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About ingreSnap
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We believe in empowering people to make informed decisions about the products they use daily. Our mission is to make ingredient transparency accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <div className="mt-16 bg-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Our Commitment
          </h3>
          <p className="text-gray-400 text-center max-w-3xl mx-auto">
            At ingreSnap, our goal is to help create a community of health-conscious individuals by promoting awareness about the ingredients in everyday products. We strive to encourage healthier choices by providing transparent, reliable information, and empowering users to make informed decisions about what they consume.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;