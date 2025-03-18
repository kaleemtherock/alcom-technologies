import { IconType } from 'react-icons';
import { 
  FaBrain,
  FaGraduationCap,
  FaCogs,
  FaShieldAlt,
  FaMagic,
  FaServer,
  FaDatabase,
  FaBalanceScale
} from 'react-icons/fa';

interface ServiceItem {
  paragraph: string;
  image: string;
  icon: IconType;
  text: string;
  description: string;
  details: string[];
}

// Add recommendation mapping
const serviceRecommendations: { [key: string]: string[] } = {
  'AI Transformation Consultancy': ['AI/ML Training Programs', 'Innovative AI Solutions'],
  'AI/ML Training Programs': ['Data Engineering & Data Science', 'Generative AI Solutions'],
  'Innovative AI Solutions': ['AI Transformation Consultancy', 'Generative AI Solutions'],
  'Secure AI-Enabled Cybersecurity': ['IT Infrastructure & Data Centers', 'IT Governance & Compliance'],
  'Generative AI Solutions': ['Innovative AI Solutions', 'Data Engineering & Data Science'],
  'IT Infrastructure & Data Centers': ['Secure AI-Enabled Cybersecurity', 'Data Engineering & Data Science'],
  'Data Engineering & Data Science': ['AI/ML Training Programs', 'Generative AI Solutions'],
  'IT Governance & Compliance': ['Secure AI-Enabled Cybersecurity', 'IT Infrastructure & Data Centers']
};

export const getRecommendations = (serviceText: string): string[] => {
  return serviceRecommendations[serviceText] || [];
};

export const servicesData: ServiceItem[] = [
  {
    icon: FaBrain,
    text: "AI Transformation Consultancy",
    paragraph: "We help businesses integrate AI to optimize workflows and boost efficiency.",
    image: "/images/ai-consultancy.jpg",
    description: "Strategic AI integration for business transformation",
    details: [
      "AI Readiness Assessment",
      "Digital Transformation Strategy",
      "Process Automation",
      "Workflow Optimization",
      "Implementation Planning",
      "Change Management"
    ]
  },
  {
    icon: FaGraduationCap,
    text: "AI/ML Training Programs",
    paragraph: "Empower your team with top-tier AI/ML training and hands-on learning.",
    image: "/images/ai-training.jpg",
    description: "Comprehensive AI/ML education solutions",
    details: [
      "Custom Training Programs",
      "Hands-on Workshops",
      "Real-world Projects",
      "Expert Mentorship",
      "Certification Paths",
      "Ongoing Support"
    ]
  },
  {
    icon: FaCogs,
    text: "Innovative AI Solutions",
    paragraph: "Custom AI solutions tailored to meet your business needs.",
    image: "/images/ai-solutions.jpg",
    description: "Advanced AI implementation services",
    details: [
      "Custom AI Development",
      "Machine Learning Solutions",
      "Neural Networks",
      "Deep Learning Systems",
      "AI Integration",
      "Performance Optimization"
    ]
  },
  {
    icon: FaShieldAlt,
    text: "Secure AI-Enabled Cybersecurity",
    paragraph: "Advanced AI-driven cybersecurity to protect your data and systems.",
    image: "/images/ai-security.jpg",
    description: "AI-powered security solutions",
    details: [
      "AI Threat Detection",
      "Predictive Security",
      "Automated Response",
      "Security Analytics",
      "Risk Assessment",
      "24/7 Monitoring"
    ]
  },
  {
    icon: FaMagic,
    text: "Generative AI Solutions",
    paragraph: "Unlock the potential of Generative AI to create, innovate, and automate like never before.",
    image: "/images/generative-ai.jpg",
    description: "Next-gen AI creation tools",
    details: [
      "Content Generation",
      "Image Synthesis",
      "Text-to-Speech",
      "Code Generation",
      "Creative AI Tools",
      "Custom AI Models"
    ]
  },
  {
    icon: FaServer,
    text: "IT Infrastructure & Data Centers",
    paragraph: "Robust IT infrastructure solutions for Networks, Data centers, and Cloud computing.",
    image: "/images/it-infrastructure.jpg",
    description: "Enterprise infrastructure solutions",
    details: [
      "Network Design",
      "Data Center Management",
      "Cloud Integration",
      "Infrastructure Security",
      "Performance Monitoring",
      "Disaster Recovery"
    ]
  },
  {
    icon: FaDatabase,
    text: "Data Engineering & Data Science",
    paragraph: "Harness the power of data with expert engineering and AI-driven insights.",
    image: "/images/data-science.jpg",
    description: "Comprehensive data solutions",
    details: [
      "Data Pipeline Development",
      "Big Data Processing",
      "Predictive Analytics",
      "Data Visualization",
      "Machine Learning Models",
      "Real-time Analytics"
    ]
  },
  {
    icon: FaBalanceScale,
    text: "IT Governance & Compliance",
    paragraph: "Ensure compliance and security with expert IT Governance, Audit, and Forensic Solutions.",
    image: "/images/it-governance.jpg",
    description: "Regulatory compliance solutions",
    details: [
      "Compliance Assessment",
      "Risk Management",
      "Policy Development",
      "Security Audits",
      "Forensic Analysis",
      "Regulatory Reporting"
    ]
  }
];