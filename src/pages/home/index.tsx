import React from 'react';
import { FaBrain, FaChalkboardTeacher, FaCogs, FaMagic, FaServer, FaShieldAlt, FaDatabase, FaBalanceScale } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Welcome to Alcom Technologies
        </h1>
        <p className="mt-4 text-xl text-center text-gray-600">
          Your AI and Technology Partner
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "AI Transformation", icon: FaBrain },
            { title: "AI/ML Training", icon: FaChalkboardTeacher },
            { title: "AI Solutions", icon: FaCogs },
            { title: "Cybersecurity", icon: FaShieldAlt },
            { title: "Generative AI", icon: FaMagic },
            { title: "IT Infrastructure", icon: FaServer },
            { title: "Data Engineering", icon: FaDatabase },
            { title: "IT Governance", icon: FaBalanceScale }
          ].map((service, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <service.icon className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;