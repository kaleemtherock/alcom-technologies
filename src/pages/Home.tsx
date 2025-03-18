import { useEffect, useState } from "react";
import { servicesData } from "../data/servicesData";
import { FaBrain, FaChalkboardTeacher, FaCogs, FaMagic, FaServer, FaShieldAlt, FaDatabase, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";

const heroContent = [
  {
    text: "AI Transformation Consultancy",
    paragraph: "We help businesses integrate AI to optimize workflows and boost efficiency.",
    image: "/images/ai-consultancy.jpg",
    icon: FaBrain,
  },
  {
    text: "AI/ML Training Programs",
    paragraph: "Empower your team with top-tier AI/ML training and hands-on learning.",
    image: "/images/ai-training.jpg",
    icon: FaChalkboardTeacher,
  },
  {
    text: "Innovative AI Solutions",
    paragraph: "Custom AI solutions tailored to meet your business needs.",
    image: "/images/ai-solutions.jpg",
    icon: FaCogs,
  },
  {
    text: "Secure AI-Enabled Cybersecurity",
    paragraph: "Advanced AI-driven cybersecurity to protect your data and systems.",
    image: "/images/ai-security.jpg",
    icon: FaShieldAlt,
  },
  {
    text: "Generative AI Solutions",
    paragraph: "Unlock the potential of Generative AI to create, innovate, and automate like never before.",
    image: "/images/generative-ai.jpg",
    icon: FaMagic,
  },
  {
    text: "IT Infrastructure & Data Centers",
    paragraph: "Robust IT infrastructure solutions for Networks, Data centers, and Cloud computing.",
    image: "/images/it-infrastructure.jpg",
    icon: FaServer,
  },
  {
    text: "Data Engineering & Data Science",
    paragraph: "Harness the power of data with expert engineering and AI-driven insights.",
    image: "/images/data-science.jpg",
    icon: FaDatabase,
  },
  {
    text: "IT Governance & Compliance",
    paragraph: "Ensure compliance and security with expert IT Governance, Audit, and Forensic Solutions.",
    image: "/images/it-governance.jpg",
    icon: FaBalanceScale,
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 8000); // Matches the animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${heroContent[currentIndex].image}')` }}
      ></div>

      {/* Content Container with Glassomorphic Effect and Framer Motion */}
      <div className="relative flex items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-4xl shadow-lg text-black"
        >
          <h1 className="text-4xl font-poppins font-semibold mb-4 leading-tight">
            {heroContent[currentIndex].text}
          </h1>
          <p className="text-xl font-poppins">{heroContent[currentIndex].paragraph}</p>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        {heroContent.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

const AIRevolution = () => {
  return (
    <div className="text-center text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold font-poppins mb-6 text-primary">
          AI isn’t just transforming the world—it’s redefining reality.
        </h2>
        <p className="text-xl font-poppins leading-relaxed mb-6">
          Automation, intelligent systems, and vast data intelligence are no longer futuristic concepts; 
          they are revolutionizing industries, rewriting job roles, and reshaping human potential. 
          The age of AI is not approaching—it has already begun, and those who fail to embrace it risk being left behind.
        </p>
        <p className="text-2xl font-semibold font-poppins mb-6">
          The machines are evolving. The question is—are you ready to rise?
        </p>
        <p className="text-xl font-poppins leading-relaxed mb-4">
          At <span className="text-primary font-bold">Alcom Technologies</span>, we don’t just prepare you to adapt; 
          we empower you to <span className="font-semibold">lead, innovate, and dominate</span> in the AI-driven world.
        </p>
        <p className="text-xl font-poppins font-medium">
          <span className="italic">Join us—become the architect of tomorrow, ensuring that humanity not only coexists with AI but thrives alongside it.</span>
        </p>
      </div>
    </div>
  );
};

const ExperienceBanner = () => {
  return (
    <div className="text-center text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-poppins font-bold mb-4">Extensive IT Experience Since 2006</h2>
        <p className="text-xl font-poppins">
          With deep expertise across various industries and IT systems, we bring decades of hands-on experience, 
          including international exposure. From AI solutions to cybersecurity, IT governance, and data science—We do it all.
        </p>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (index: number) => {
    navigate(`/company/services?service=${index}`);
  };

  return (
    <div className="text-white">
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 uppercase text-neon-blue">
          Our AI & IT Services
        </h1>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl transition cursor-pointer"
              onClick={() => handleServiceClick(index)}
            >
              <div className="text-center">
                <service.icon className="text-5xl text-neon-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{service.text}</h3>
                <p className="text-sm text-gray-300">{service.paragraph}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div className="bg-gradient-to-r from-gray-100 to-gray-400">
        <AIRevolution />
      </div>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900">
        <ExperienceBanner />
      </div>
      <div className="bg-gray-900">
        <Services />
      </div>
    </div>
  );
};

export default HomePage;