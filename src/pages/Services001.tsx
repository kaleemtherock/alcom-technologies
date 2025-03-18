import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import {
  FaBrain,
  FaChalkboardTeacher,
  FaCogs,
  FaMagic,
  FaServer,
  FaShieldAlt,
  FaDatabase,
  FaBalanceScale
} from "react-icons/fa";
import { getRecommendations } from '../utils/recommendationEngine';

const servicesData = [
  {
    text: "AI Transformation Consultancy",
    paragraph: "We help businesses integrate AI to optimize workflows and boost efficiency.",
    image: "/images/ai-consultancy.jpg",
    icon: FaBrain,
    details: [
      "AI Strategy Development - Comprehensive roadmap creation for AI integration aligned with business goals",
      "Process Optimization - Advanced workflow analysis and AI-driven efficiency improvements",
      "Workflow Integration - Seamless incorporation of AI solutions into existing business processes",
      "Performance Analysis - Data-driven evaluation of AI implementation impact and ROI metrics",
      "ROI Assessment - Detailed cost-benefit analysis and value proposition measurement",
      "Change Management - Strategic guidance for smooth organizational transition to AI systems"
    ]
  },
  {
    text: "AI/ML Training Programs",
    paragraph: "Empower your team with top-tier AI/ML training and hands-on learning.",
    image: "/images/ai-training.jpg",
    icon: FaChalkboardTeacher,
    details: [
      "Customized Learning Paths - Personalized training programs tailored to your team's expertise level",
      "Hands-on Workshops - Interactive sessions with real-world AI/ML tools and applications",
      "Real-world Projects - Practical implementation experience with industry-specific challenges",
      "Expert Mentorship - Direct guidance from seasoned AI/ML professionals",
      "Certification Programs - Industry-recognized AI/ML certifications and credentials",
      "Continuous Support - Ongoing technical assistance and learning resources"
    ]
  },
  {
    text: "Innovative AI Solutions",
    paragraph: "Custom AI solutions tailored to meet your business needs.",
    image: "/images/ai-solutions.jpg",
    icon: FaCogs,
    details: [
      "Custom AI Development - Tailored AI solutions designed for your specific business needs",
      "Machine Learning Solutions - Advanced algorithms for pattern recognition and prediction",
      "Neural Networks - Deep learning systems for complex problem-solving",
      "Deep Learning Systems - Sophisticated AI models for advanced data processing",
      "AI Integration - Seamless implementation with existing systems and workflows",
      "Performance Optimization - Continuous improvement of AI model accuracy and efficiency"
    ]
  },
  {
    text: "Secure AI-Enabled Cybersecurity",
    paragraph: "Advanced AI-driven cybersecurity to protect your data and systems.",
    image: "/images/ai-security.jpg",
    icon: FaShieldAlt,
    details: [
      "AI Threat Detection - Real-time identification of security threats using AI algorithms",
      "Predictive Security - Advanced threat prevention through pattern analysis",
      "Automated Response - Instant reaction to security incidents with AI-driven systems",
      "Security Analytics - Comprehensive security data analysis and reporting",
      "Risk Assessment - AI-powered evaluation of security vulnerabilities",
      "24/7 Monitoring - Continuous security surveillance with AI-enhanced tools"
    ]
  },
  {
    text: "Generative AI Solutions",
    paragraph: "Unlock the potential of Generative AI to create, innovate, and automate like never before.",
    image: "/images/generative-ai.jpg",
    icon: FaMagic,
    details: [
      "Content Generation - AI-powered creation of text, articles, and marketing materials",
      "Image Synthesis - Advanced AI algorithms for creating and editing visual content",
      "Text-to-Speech - Natural language processing for high-quality voice synthesis",
      "Code Generation - Automated code creation and optimization using AI",
      "Creative AI Tools - Innovative solutions for design and content creation",
      "Custom AI Models - Specialized generative models for unique business needs"
    ]
  },
  {
    text: "IT Infrastructure & Data Centers",
    paragraph: "Robust IT infrastructure solutions for Networks, Data centers, and Cloud computing.",
    image: "/images/it-infrastructure.jpg",
    icon: FaServer,
    details: [
      "Network Design - Custom architecture planning for optimal performance",
      "Data Center Management - Comprehensive oversight of data center operations",
      "Cloud Integration - Seamless migration and hybrid cloud solutions",
      "Infrastructure Security - Multi-layered protection for critical systems",
      "Performance Monitoring - Real-time tracking of system metrics and health",
      "Disaster Recovery - Robust backup and business continuity solutions"
    ]
  },
  {
    text: "Data Engineering & Data Science",
    paragraph: "Harness the power of data with expert engineering and AI-driven insights.",
    image: "/images/data-science.jpg",
    icon: FaDatabase,
    details: [
      "Data Pipeline Development - Efficient data processing and transformation workflows",
      "Big Data Processing - Advanced solutions for handling large-scale data sets",
      "Predictive Analytics - Forward-looking insights using statistical models",
      "Data Visualization - Interactive dashboards and meaningful data representations",
      "Machine Learning Models - Custom algorithms for business intelligence",
      "Real-time Analytics - Instant data processing and analysis capabilities"
    ]
  },
  {
    text: "IT Governance & Compliance",
    paragraph: "Ensure compliance and security with expert IT Governance, Audit, and Forensic Solutions.",
    image: "/images/it-governance.jpg",
    icon: FaBalanceScale,
    details: [
      "Compliance Assessment - Comprehensive evaluation of regulatory requirements",
      "Risk Management - Proactive identification and mitigation of IT risks",
      "Policy Development - Custom IT governance frameworks and guidelines",
      "Security Audits - Thorough examination of security controls and practices",
      "Forensic Analysis - Detailed investigation of security incidents",
      "Regulatory Reporting - Automated compliance reporting and documentation"
    ]
  }
];

// First, add a new state for tracking clicked tile
const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]); // Add this
  const detailsRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const serviceIndex = searchParams.get('service');
    if (serviceIndex !== null) {
      const index = parseInt(serviceIndex);
      setActiveIndex(index);
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [searchParams]);

  // Update the handleServiceClick function
  const handleServiceClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setRecommendations([]);
    } else {
      setActiveTile(null);
      setActiveIndex(index);
      setRecommendations(getRecommendations(servicesData[index].text));
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-50 text-gray-900 py-24">
      {/* Background for entire section */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
        style={{ backgroundImage: `url('/images/services-bg.jpg')` }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our AI & IT Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of services designed to transform your business
          </p>
        </div>

        {/* Service Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className={`p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                activeIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleServiceClick(index)}
            >
              <div className="flex flex-col items-center">
                {React.createElement(service.icon, {
                  className: "text-5xl text-blue-600 mb-6"
                })}
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                  {service.text}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.paragraph}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Details */}
        {activeIndex !== null && (
          <motion.div
            ref={detailsRef}
            key={`service-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-16 rounded-xl p-8 shadow-md relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url('/images/details-bg.jpg')` }}
            />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {servicesData[activeIndex].text}
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    {servicesData[activeIndex].paragraph}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src={servicesData[activeIndex].image}
                    alt={servicesData[activeIndex].text}
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesData[activeIndex].details.map((detail, slideIndex) => (
                  <motion.div
                    key={slideIndex}
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: 10,
                      rotateY: 10,
                      translateZ: 20
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300
                    }}
                    onClick={() => setActiveTile(activeTile === slideIndex ? null : slideIndex)}
                    className={`p-8 rounded-xl shadow-xl transition-all duration-500 cursor-pointer
                      backdrop-blur-lg h-[200px] flex items-center
                      ${activeTile === slideIndex 
                        ? slideIndex % 3 === 0 
                          ? 'bg-blue-500/30 border-blue-400/50' 
                          : slideIndex % 3 === 1 
                            ? 'bg-purple-500/30 border-purple-400/50' 
                            : 'bg-emerald-500/30 border-emerald-400/50'
                        : 'bg-white/10 border-white/20'
                      } 
                      border-2`}
                  >
                    <div className="flex items-start gap-4">
                      {React.createElement(servicesData[activeIndex].icon, {
                        className: `text-3xl ${
                          activeTile === slideIndex
                            ? slideIndex % 3 === 0 
                              ? 'text-blue-200' 
                              : slideIndex % 3 === 1 
                                ? 'text-purple-200' 
                                : 'text-emerald-200'
                            : 'text-gray-400'
                        }`
                      })}
                      <p className={`leading-relaxed font-medium ${
                        activeTile === slideIndex ? 'text-white' : 'text-gray-600'
                      }`}>
                        {detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add Recommendations Section */}
              {recommendations.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    AI Recommended Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((rec, index) => {
                      const serviceIndex = servicesData.findIndex(s => s.text === rec);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                          onClick={() => handleServiceClick(serviceIndex)}
                        >
                          <div className="flex items-center gap-4">
                            {React.createElement(servicesData[serviceIndex].icon, {
                              className: "text-3xl text-blue-600"
                            })}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{rec}</h4>
                              <p className="text-sm text-gray-600">
                                {servicesData[serviceIndex].paragraph}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;