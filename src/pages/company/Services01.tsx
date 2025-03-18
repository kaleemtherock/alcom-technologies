import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaCode, FaDatabase, FaCloud, FaBrain } from 'react-icons/fa';

const services = [
  {
    icon: <FaRobot className="text-4xl text-blue-600" />,
    title: 'AI Solutions',
    description: 'Custom artificial intelligence solutions tailored to your business needs, including machine learning models and neural networks.',
    features: [
      'Custom ML Models',
      'Neural Network Design',
      'AI Integration',
      'Automated Decision Systems'
    ]
  },
  {
    icon: <FaChartLine className="text-4xl text-green-600" />,
    title: 'Data Analytics',
    description: 'Transform your raw data into actionable insights with our advanced analytics and visualization solutions.',
    features: [
      'Predictive Analytics',
      'Business Intelligence',
      'Data Visualization',
      'Real-time Analytics'
    ]
  },
  {
    icon: <FaCode className="text-4xl text-purple-600" />,
    title: 'Custom Development',
    description: 'End-to-end software development services focusing on AI-powered applications and systems.',
    features: [
      'Web Applications',
      'Mobile Solutions',
      'API Development',
      'System Integration'
    ]
  },
  {
    icon: <FaDatabase className="text-4xl text-red-600" />,
    title: 'Data Management',
    description: 'Comprehensive data management solutions to organize, protect, and optimize your data assets.',
    features: [
      'Data Architecture',
      'Database Design',
      'Data Migration',
      'Data Security'
    ]
  },
  {
    icon: <FaCloud className="text-4xl text-cyan-600" />,
    title: 'Cloud Solutions',
    description: 'Cloud-native solutions and migration services to modernize your infrastructure and applications.',
    features: [
      'Cloud Migration',
      'Cloud Architecture',
      'Serverless Solutions',
      'Cloud Security'
    ]
  },
  {
    icon: <FaBrain className="text-4xl text-orange-600" />,
    title: 'AI Consulting',
    description: 'Expert guidance on AI strategy, implementation, and optimization for your organization.',
    features: [
      'AI Strategy',
      'Technical Assessment',
      'Implementation Planning',
      'AI Training'
    ]
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Empowering businesses with cutting-edge AI solutions and expert services
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Schedule a Consultation
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;