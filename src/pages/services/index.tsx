import React from 'react';
import { FaCode, FaServer, FaMobile, FaCloud, FaDesktop, FaShieldAlt } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Custom web applications and responsive websites built with modern technologies.'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.'
    },
    {
      icon: <FaServer />,
      title: 'Backend Solutions',
      description: 'Scalable server-side applications and API development.'
    },
    {
      icon: <FaCloud />,
      title: 'Cloud Services',
      description: 'Cloud infrastructure setup and management.'
    },
    {
      icon: <FaDesktop />,
      title: 'IT Consulting',
      description: 'Technical consultation and digital transformation strategies.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Cybersecurity',
      description: 'Security audits and implementation of security measures.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">
            Comprehensive IT solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 mb-6">
            Contact us to discuss your specific requirements
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;