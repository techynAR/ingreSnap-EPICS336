import React from 'react';
import { Leaf, Shield, Users, Github, Linkedin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

  const developers = [
    {
      name: "Aryan Sharma",
      role: "Lead Developer",
      department: "B.Tech CSE Core",
      linkedin: "https://www.linkedin.com/in/aryan-sharma-techynar/",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Bachhav Ujjwal Ganesh",
      role: "Developer",
      department: "B.Tech CSE Cybersecurity Specialization",
      linkedin: "https://www.linkedin.com/in/ujjwal-bachhav-26b98824b",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Faraz Ahmad Khan",
      role: "Developer",
      department: "B.Tech CSE Cloud Computing Specialization",
      linkedin: "https://linkedin.com/in/faraz-ahmad-khan-634a40251",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Fanish Kumar Diwan",
      role: "Developer",
      department: "B.Tech CSE Cybersecurity Specialization",
      linkedin: "https://linkedin.com/in/fanish-diwan-074226339",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Krishna Teja",
      role: "Developer",
      department: "B.Tech CSE Core",
      linkedin: "",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Niranjan Kumar Chaurasiya",
      role: "Developer",
      department: "B.Tech CSE Core",
      linkedin: "",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Sameer Kumar",
      role: "Developer",
      department: "B.Tech CSE Core",
      linkedin: "",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Sreemukhi Kunche",
      role: "Developer",
      department: "B.Tech CSE AI Specialization",
      linkedin: "",
      avatar: "/placeholder-avatar.png"
    },
    {
      name: "Vikash Kumar Singh",
      role: "Developer",
      department: "B.Tech CSE Cybersecurity Specialization",
      linkedin: "https://www.linkedin.com/in/vikash-kumar-singh-62a948251/",
      avatar: "/placeholder-avatar.png"
    }
  ];

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: commitmentRef, inView: commitmentInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
        <title>About ingreSnap - Our Mission and Team</title>
        <meta name="description" content="Learn about ingreSnap's mission to empower informed choices through ingredient analysis. Created by VIT Bhopal University students under Dr. Arindam Ghosh's guidance." />
      </Helmet>
      
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About ingreSnap
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              We are a dynamic team of multidisciplinary engineering students from VIT Bhopal University, united by the mission to create innovative solutions that address real-world challenges.
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800/50 rounded-lg p-6 mb-8 max-w-2xl mx-auto"
            >
              <p className="text-yellow-400 font-semibold mb-2">Development Status</p>
              <p className="text-gray-300">
                ingreSnap is currently in beta phase. We're actively working on improving the accuracy of ingredient analysis and adding new features.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            ref={featuresRef}
            variants={staggerChildren}
            initial="initial"
            animate={featuresInView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gray-800 rounded-lg p-8 text-center hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Section */}
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Our Team
            </h3>
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="flex flex-col items-center mb-10">
                <img 
                  src="/placeholder-avatar.png" 
                  alt="Dr. Arindam Ghosh" 
                  className="w-32 h-32 rounded-full mb-4 border-4 border-emerald-600"
                />
                <h4 className="text-xl font-semibold text-white">Dr. Arindam Ghosh</h4>
                <p className="text-emerald-400 text-sm">Project Supervisor</p>
              </div>
              
              <p className="text-gray-300 mb-6 text-center">
                This project is conducted under the esteemed guidance of <span className="font-semibold text-emerald-400">Dr. Arindam Ghosh</span>, whose expertise and mentorship have been instrumental in shaping ingreSnap.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {developers.map((dev, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors flex flex-col items-center text-center"
                  >
                    <img 
                      src={dev.avatar} 
                      alt={dev.name} 
                      className="w-24 h-24 rounded-full mb-4 border-2 border-emerald-500"
                    />
                    <h4 className="text-white font-medium">{dev.name}</h4>
                    {dev.role && <p className="text-emerald-400 text-sm">{dev.role}</p>}
                    <p className="text-gray-300 text-sm mt-1">{dev.department}</p>
                    {dev.linkedin && (
                      <a 
                        href={dev.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm mt-2"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 border border-gray-700 rounded-lg">
                <h4 className="text-xl font-semibold text-white mb-4">About Our Supervisor</h4>
                <p className="text-gray-300 mb-3">
                  <span className="font-semibold text-emerald-400">Dr. Arindam Ghosh</span> is a distinguished academic and researcher with a Doctorate from the National Institute of Science Education and Research, Bhubaneswar, specializing in Supramolecular Organic Chemistry (Expanded Porphyrinoid Analogues).
                </p>
                <p className="text-gray-300 mb-3">
                  He holds an M.Sc. in Chemistry from the Indian Institute of Technology (ISM), Dhanbad, and has over four years of professional experience, including:
                </p>
                <ul className="list-disc list-inside text-gray-300 mb-3 ml-4">
                  <li>Postdoctoral research funded by DST-SERB.</li>
                  <li>Service as an Ad-hoc Assistant Professor at NIT Warangal.</li>
                  <li>Over two years in organic medicinal chemistry at TCG Lifesciences Pvt. Ltd.</li>
                </ul>
                <p className="text-gray-300">
                  Dr. Ghosh has published nine research articles in internationally reputed journals, including <em>Nature Chemistry, Chemical Science, Organic Letters,</em> and <em>Chemistry A European Journal</em>. His areas of research interest include Organic Supramolecular Chemistry and Organic Medicinal Chemistry.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            ref={commitmentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={commitmentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Contribute to ingreSnap
            </h3>
            <p className="text-gray-400 mb-6">
              We believe in the power of community-driven development. Your contributions can help make ingreSnap even better!
            </p>
            <motion.a
              href="https://github.com/techynAR/ingreSnap-EPICS336"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
