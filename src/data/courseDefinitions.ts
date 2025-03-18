export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  chapters: Chapter[];
  prerequisites?: string[];
  skills?: string[];
}

export const aimlCourse: Course = {
  id: 'aiml-001',
  title: 'Foundations of Artificial Intelligence',
  description: 'Master fundamental concepts of AI including intelligent agents, problem-solving, and machine learning',
  level: 'Intermediate',
  duration: '12 weeks',
  price: 999,
  prerequisites: ['Basic Programming', 'Mathematics', 'Probability'],
  skills: ['Problem Solving', 'Algorithm Design', 'AI Implementation'],
  chapters: [
    {
      id: 'ch1',
      title: 'Introduction to AI',
      description: 'Understanding what AI is, its history, and foundations',
      duration: '1 week',
      topics: [
        'What is AI?',
        'Foundations of AI',
        'History of AI',
        'State of the Art',
        'Ethical Considerations'
      ]
    },
    {
      id: 'ch2',
      title: 'Intelligent Agents',
      description: 'Understanding agents and their environments',
      duration: '1 week',
      topics: [
        'Agents and Environments',
        'Types of Agents',
        'Agent Architecture',
        'Environment Types',
        'PEAS Framework'
      ]
    },
    {
      id: 'ch3',
      title: 'Problem-Solving and Search',
      description: 'Problem formulation and solving techniques',
      duration: '2 weeks',
      topics: [
        'Problem Types',
        'Search Strategies',
        'Uninformed Search',
        'Informed Search',
        'Heuristics',
        'A* Algorithm',
        'Local Search'
      ]
    },
    {
      id: 'ch4',
      title: 'Knowledge Representation',
      description: 'Representing knowledge and reasoning',
      duration: '2 weeks',
      topics: [
        'Propositional Logic',
        'First-Order Logic',
        'Ontological Engineering',
        'Semantic Networks',
        'Expert Systems'
      ]
    },
    {
      id: 'ch5',
      title: 'Machine Learning Fundamentals',
      description: 'Basic concepts of machine learning',
      duration: '2 weeks',
      topics: [
        'Types of Learning',
        'Supervised Learning',
        'Unsupervised Learning',
        'Reinforcement Learning',
        'Neural Networks Basics'
      ]
    },
    {
      id: 'ch6',
      title: 'Advanced AI Topics',
      description: 'Modern AI applications and techniques',
      duration: '2 weeks',
      topics: [
        'Natural Language Processing',
        'Computer Vision',
        'Robotics',
        'Deep Learning Introduction',
        'Future of AI'
      ]
    }
  ]
};

export const deepLearningCourse: Course = {
  id: 'dl-001',
  title: 'Advanced Deep Learning',
  description: 'Master deep learning architectures, techniques, and applications with hands-on projects',
  level: 'Advanced',
  duration: '10 weeks',
  price: 1299,
  prerequisites: ['Python', 'Linear Algebra', 'Machine Learning Basics'],
  skills: ['PyTorch', 'Neural Networks', 'Model Development'],
  chapters: [
    {
      id: 'dl-ch1',
      title: 'Neural Networks Foundations',
      description: 'Deep dive into neural network architecture and mathematics',
      duration: '2 weeks',
      topics: [
        'Neural Network Architecture',
        'Backpropagation',
        'Activation Functions',
        'Loss Functions',
        'Optimization Algorithms'
      ]
    },
    {
      id: 'dl-ch2',
      title: 'Convolutional Neural Networks',
      description: 'Understanding and implementing CNNs for computer vision',
      duration: '2 weeks',
      topics: [
        'CNN Architecture',
        'Convolution Operations',
        'Pooling Layers',
        'Transfer Learning',
        'Image Classification'
      ]
    },
    {
      id: 'dl-ch3',
      title: 'Recurrent Neural Networks',
      description: 'Sequential data processing with RNNs',
      duration: '2 weeks',
      topics: [
        'RNN Architecture',
        'LSTM and GRU',
        'Sequence Modeling',
        'Time Series Analysis',
        'Natural Language Processing'
      ]
    },
    {
      id: 'dl-ch4',
      title: 'Transformers',
      description: 'Modern attention-based architectures',
      duration: '2 weeks',
      topics: [
        'Attention Mechanism',
        'Transformer Architecture',
        'BERT and GPT Models',
        'Fine-tuning Pre-trained Models',
        'Applications in NLP'
      ]
    },
    {
      id: 'dl-ch5',
      title: 'Advanced Topics',
      description: 'Cutting-edge deep learning concepts',
      duration: '2 weeks',
      topics: [
        'Generative Models',
        'GANs and VAEs',
        'Reinforcement Learning',
        'Model Deployment',
        'Ethics in AI'
      ]
    }
  ]
};

export const dataEngineeringCourse: Course = {
  id: 'de-001',
  title: 'Data Engineering Fundamentals',
  description: 'Master data pipeline development, business intelligence, and modern data infrastructure',
  level: 'Intermediate',
  duration: '12 weeks',
  price: 1199,
  prerequisites: ['SQL', 'Python Basics', 'Database Concepts'],
  skills: ['ETL', 'Data Warehousing', 'Big Data', 'Power BI', 'Data Modeling'],
  chapters: [
    {
      id: 'de-ch1',
      title: 'Data Pipeline Fundamentals',
      description: 'Understanding data pipeline architecture and ETL processes',
      duration: '2 weeks',
      topics: [
        'ETL Processes',
        'Data Warehousing',
        'Data Lakes',
        'Pipeline Architecture',
        'Data Quality'
      ]
    },
    {
      id: 'de-ch2',
      title: 'Big Data Processing',
      description: 'Working with large-scale data processing frameworks',
      duration: '2 weeks',
      topics: [
        'Apache Spark',
        'Hadoop Ecosystem',
        'Distributed Computing',
        'Stream Processing',
        'Batch Processing'
      ]
    },
    {
      id: 'de-ch3',
      title: 'Business Intelligence',
      description: 'Creating powerful BI solutions with Power BI',
      duration: '3 weeks',
      topics: [
        'Power BI Fundamentals',
        'Data Modeling in Power BI',
        'DAX Formulas',
        'Interactive Dashboards',
        'Report Design',
        'Data Visualization Best Practices'
      ]
    },
    {
      id: 'de-ch4',
      title: 'Modern Data Stack',
      description: 'Working with modern data tools and platforms',
      duration: '3 weeks',
      topics: [
        'Cloud Data Platforms',
        'Data Build Tool (dbt)',
        'Airflow',
        'Data Governance',
        'Data Security'
      ]
    }
  ]
};

export const dataScienceCourse: Course = {
  id: 'ds-001',
  title: 'Data Science and Analytics',
  description: 'Learn end-to-end data science from statistical analysis to advanced machine learning',
  level: 'Intermediate',
  duration: '14 weeks',
  price: 1299,
  prerequisites: ['Statistics Basics', 'Python Programming', 'Mathematics'],
  skills: ['Data Analysis', 'Statistical Modeling', 'Machine Learning', 'Data Visualization', 'Predictive Analytics'],
  chapters: [
    {
      id: 'ds-ch1',
      title: 'Data Analysis Fundamentals',
      description: 'Essential tools and techniques for data analysis',
      duration: '3 weeks',
      topics: [
        'Python for Data Analysis',
        'Pandas & NumPy',
        'Exploratory Data Analysis',
        'Data Cleaning',
        'Statistical Analysis'
      ]
    },
    {
      id: 'ds-ch2',
      title: 'Statistical Methods',
      description: 'Statistical concepts and their applications',
      duration: '3 weeks',
      topics: [
        'Probability Theory',
        'Hypothesis Testing',
        'Regression Analysis',
        'Time Series Analysis',
        'Experimental Design'
      ]
    },
    {
      id: 'ds-ch3',
      title: 'Machine Learning for Data Science',
      description: 'Applied machine learning for data science',
      duration: '4 weeks',
      topics: [
        'Supervised Learning',
        'Unsupervised Learning',
        'Feature Engineering',
        'Model Selection',
        'Model Evaluation',
        'Ensemble Methods'
      ]
    },
    {
      id: 'ds-ch4',
      title: 'Advanced Analytics',
      description: 'Advanced techniques and real-world applications',
      duration: '4 weeks',
      topics: [
        'Deep Learning Applications',
        'Natural Language Processing',
        'Computer Vision',
        'Recommendation Systems',
        'A/B Testing',
        'Business Analytics'
      ]
    }
  ]
};

export const cyberSecurityCourse: Course = {
  id: 'cyber-001',
  title: 'Advanced Cybersecurity',
  description: 'Master modern cybersecurity techniques, threat detection, and defense strategies',
  level: 'Advanced',
  duration: '12 weeks',
  price: 1299,
  prerequisites: ['Networking Basics', 'Linux Administration', 'Programming Fundamentals'],
  skills: ['Threat Detection', 'Security Architecture', 'Incident Response', 'Risk Management'],
  chapters: [
    {
      id: 'cyber-ch1',
      title: 'Security Fundamentals',
      description: 'Core concepts of cybersecurity and threat landscape',
      duration: '2 weeks',
      topics: [
        'Security Principles',
        'Attack Vectors',
        'Defense in Depth',
        'Security Controls',
        'Risk Assessment'
      ]
    },
    {
      id: 'cyber-ch2',
      title: 'Network Security',
      description: 'Securing network infrastructure and communications',
      duration: '3 weeks',
      topics: [
        'Network Protocols',
        'Firewall Configuration',
        'IDS/IPS Systems',
        'VPN Technologies',
        'Network Monitoring'
      ]
    },
    {
      id: 'cyber-ch3',
      title: 'Application Security',
      description: 'Securing applications and web services',
      duration: '3 weeks',
      topics: [
        'Web Security',
        'Secure Coding Practices',
        'Authentication Systems',
        'API Security',
        'OWASP Top 10'
      ]
    },
    {
      id: 'cyber-ch4',
      title: 'Incident Response',
      description: 'Handling security incidents and threats',
      duration: '2 weeks',
      topics: [
        'Incident Management',
        'Digital Forensics',
        'Malware Analysis',
        'Threat Hunting',
        'Recovery Procedures'
      ]
    },
    {
      id: 'cyber-ch5',
      title: 'Security Management',
      description: 'Managing security operations and compliance',
      duration: '2 weeks',
      topics: [
        'Security Frameworks',
        'Compliance Standards',
        'Risk Management',
        'Security Auditing',
        'Security Policies'
      ]
    }
  ]
};

export const ethicalHackingCourse: Course = {
  id: 'eh-001',
  title: 'Ethical Hacking and Penetration Testing',
  description: 'Learn professional penetration testing techniques and ethical hacking methodologies',
  level: 'Advanced',
  duration: '10 weeks',
  price: 1499,
  prerequisites: ['Networking', 'Linux', 'Basic Programming', 'Security Fundamentals'],
  skills: ['Penetration Testing', 'Vulnerability Assessment', 'Exploit Development', 'Security Tools'],
  chapters: [
    {
      id: 'eh-ch1',
      title: 'Introduction to Ethical Hacking',
      description: 'Understanding ethical hacking methodology and legal aspects',
      duration: '2 weeks',
      topics: [
        'Ethical Hacking Methodology',
        'Legal Framework',
        'Information Gathering',
        'Reconnaissance Tools',
        'Social Engineering'
      ]
    },
    {
      id: 'eh-ch2',
      title: 'System Hacking',
      description: 'Advanced system exploitation techniques',
      duration: '2 weeks',
      topics: [
        'Password Cracking',
        'Privilege Escalation',
        'Maintaining Access',
        'Malware Analysis',
        'System Hardening'
      ]
    },
    {
      id: 'eh-ch3',
      title: 'Network Penetration Testing',
      description: 'Network security assessment and exploitation',
      duration: '3 weeks',
      topics: [
        'Network Scanning',
        'Vulnerability Assessment',
        'Wireless Network Testing',
        'Network Exploitation',
        'Post Exploitation'
      ]
    },
    {
      id: 'eh-ch4',
      title: 'Web Application Security',
      description: 'Web application vulnerability assessment and exploitation',
      duration: '3 weeks',
      topics: [
        'Web App Vulnerabilities',
        'SQL Injection',
        'XSS Attacks',
        'CSRF Attacks',
        'Security Headers'
      ]
    }
  ]
};

export const agenticAICourse: Course = {
  id: 'aai-001',
  title: 'Agentic AI Development',
  description: 'Build autonomous AI agents that can understand, plan, and execute complex tasks',
  level: 'Advanced',
  duration: '12 weeks',
  price: 1599,
  prerequisites: ['AI Fundamentals', 'Python Programming', 'Machine Learning'],
  skills: ['Agent Development', 'LLM Integration', 'Planning Systems', 'Multi-Agent Systems'],
  chapters: [
    {
      id: 'aai-ch1',
      title: 'Foundations of AI Agents',
      description: 'Understanding AI agents and their capabilities',
      duration: '2 weeks',
      topics: [
        'Agent Architecture',
        'Cognitive Systems',
        'Decision Making',
        'Goal-Oriented Behavior',
        'Agent Communication'
      ]
    },
    {
      id: 'aai-ch2',
      title: 'Language Models Integration',
      description: 'Integrating LLMs into agent systems',
      duration: '3 weeks',
      topics: [
        'LLM Fundamentals',
        'Prompt Engineering',
        'Context Windows',
        'API Integration',
        'Response Processing'
      ]
    },
    {
      id: 'aai-ch3',
      title: 'Planning and Execution',
      description: 'Implementing planning and execution systems',
      duration: '4 weeks',
      topics: [
        'Task Planning',
        'Action Selection',
        'Execution Monitoring',
        'Error Recovery',
        'Performance Optimization'
      ]
    },
    {
      id: 'aai-ch4',
      title: 'Multi-Agent Systems',
      description: 'Building systems with multiple interacting agents',
      duration: '3 weeks',
      topics: [
        'Agent Collaboration',
        'Resource Management',
        'Conflict Resolution',
        'Distributed Systems',
        'Scalability'
      ]
    }
  ]
};

export const quantumComputingCourse: Course = {
  id: 'qc-001',
  title: 'Quantum Computing Fundamentals',
  description: 'Learn quantum computing principles and quantum algorithm development',
  level: 'Advanced',
  duration: '14 weeks',
  price: 1799,
  prerequisites: ['Linear Algebra', 'Complex Analysis', 'Programming Basics'],
  skills: ['Quantum Circuits', 'Quantum Algorithms', 'Qiskit', 'Quantum Mathematics'],
  chapters: [
    {
      id: 'qc-ch1',
      title: 'Quantum Mechanics Basics',
      description: 'Essential quantum mechanics for computing',
      duration: '3 weeks',
      topics: [
        'Quantum States',
        'Superposition',
        'Entanglement',
        'Quantum Measurements',
        'Quantum Gates'
      ]
    },
    {
      id: 'qc-ch2',
      title: 'Quantum Computing Theory',
      description: 'Theoretical foundations of quantum computing',
      duration: '4 weeks',
      topics: [
        'Quantum Bits',
        'Quantum Circuits',
        'Universal Gates',
        'Quantum Algorithms',
        'Quantum Complexity'
      ]
    },
    {
      id: 'qc-ch3',
      title: 'Quantum Programming',
      description: 'Programming quantum computers with Qiskit',
      duration: '4 weeks',
      topics: [
        'Qiskit Basics',
        'Circuit Design',
        'Algorithm Implementation',
        'Error Correction',
        'Quantum Simulation'
      ]
    },
    {
      id: 'qc-ch4',
      title: 'Applications and Future',
      description: 'Real-world applications and future prospects',
      duration: '3 weeks',
      topics: [
        'Cryptography',
        'Optimization',
        'Machine Learning',
        'Industry Applications',
        'Future Developments'
      ]
    }
  ]
};

export const foundationsCourse: Course = {
  id: 'found-001',
  title: 'Technology Foundations',
  description: 'Master the essential foundations of computing, including mathematics, computer systems, programming basics, and operating systems',
  level: 'Beginner',
  duration: '16 weeks',
  price: 899,
  prerequisites: ['Basic English', 'High School Mathematics'],
  skills: ['Mathematical Thinking', 'Computer Literacy', 'Basic Programming', 'OS Management', 'Problem Solving'],
  chapters: [
    {
      id: 'found-ch1',
      title: 'Mathematical Foundations',
      description: 'Essential mathematics for computing and programming',
      duration: '4 weeks',
      topics: [
        'Number Systems and Binary',
        'Boolean Algebra and Logic',
        'Basic Algebra and Functions',
        'Matrices and Linear Systems',
        'Basic Statistics and Probability'
      ]
    },
    {
      id: 'found-ch2',
      title: 'Computer Hardware and Architecture',
      description: 'Understanding computer systems and components',
      duration: '4 weeks',
      topics: [
        'Computer Components',
        'CPU Architecture',
        'Memory Systems',
        'Storage Devices',
        'Input/Output Systems',
        'Computer Assembly and Maintenance'
      ]
    },
    {
      id: 'found-ch3',
      title: 'Programming Fundamentals',
      description: 'Introduction to programming concepts and logic',
      duration: '4 weeks',
      topics: [
        'Programming Concepts',
        'Variables and Data Types',
        'Control Structures',
        'Functions and Methods',
        'Basic Algorithms',
        'Problem-Solving Techniques'
      ]
    },
    {
      id: 'found-ch4',
      title: 'Operating Systems',
      description: 'Understanding operating systems and their management',
      duration: '4 weeks',
      topics: [
        'OS Concepts',
        'Windows Fundamentals',
        'Linux Basics',
        'File Systems',
        'Process Management',
        'System Administration Basics'
      ]
    }
  ]
};

export const linuxServerCourse: Course = {
  id: 'linux-001',
  title: 'Advanced Linux Server Administration',
  description: 'Master Linux server administration, including enterprise-level services, cloud integration, and open-source technologies',
  level: 'Advanced',
  duration: '16 weeks',
  price: 1399,
  prerequisites: ['Basic Linux Knowledge', 'Networking Fundamentals', 'Command Line Experience'],
  skills: ['Linux Administration', 'Server Management', 'Cloud Integration', 'Security Hardening', 'Service Configuration'],
  chapters: [
    {
      id: 'linux-ch1',
      title: 'Advanced Linux System Administration',
      description: 'Deep dive into Linux system administration and management',
      duration: '4 weeks',
      topics: [
        'System Architecture',
        'Advanced Package Management',
        'Kernel Management',
        'System Optimization',
        'Performance Tuning',
        'Automation with Shell Scripting'
      ]
    },
    {
      id: 'linux-ch2',
      title: 'Network Services',
      description: 'Setting up and managing network services',
      duration: '4 weeks',
      topics: [
        'Web Server (Apache/Nginx)',
        'Mail Server (Postfix)',
        'DNS Server Configuration',
        'FTP/SFTP Services',
        'Load Balancing',
        'SSL/TLS Management'
      ]
    },
    {
      id: 'linux-ch3',
      title: 'Cloud and Virtualization',
      description: 'Cloud integration and virtualization technologies',
      duration: '4 weeks',
      topics: [
        'Private Cloud Setup',
        'OpenStack Administration',
        'Container Management',
        'Kubernetes Deployment',
        'Cloud Security',
        'Resource Management'
      ]
    },
    {
      id: 'linux-ch4',
      title: 'Security and Monitoring',
      description: 'Server security and monitoring solutions',
      duration: '4 weeks',
      topics: [
        'Security Hardening',
        'Intrusion Detection',
        'Log Management',
        'Performance Monitoring',
        'Backup Solutions',
        'Disaster Recovery'
      ]
    }
  ]
};

export const itInfrastructureCourse: Course = {
  id: 'infra-001',
  title: 'Enterprise IT Infrastructure Design & Management',
  description: 'Master modern enterprise infrastructure design, including data centers, HCI, advanced networking, and infrastructure management',
  level: 'Advanced',
  duration: '16 weeks',
  price: 1699,
  prerequisites: ['Networking Fundamentals', 'System Administration', 'Basic Cloud Knowledge'],
  skills: ['Infrastructure Design', 'Data Center Management', 'Network Architecture', 'HCI Implementation', 'Disaster Recovery'],
  chapters: [
    {
      id: 'infra-ch1',
      title: 'Modern Data Center Design',
      description: 'Comprehensive data center architecture and management',
      duration: '4 weeks',
      topics: [
        'Data Center Tiers and Standards',
        'Power Distribution Systems',
        'Cooling Infrastructure',
        'Cable Management',
        'Physical Security',
        'Environmental Monitoring'
      ]
    },
    {
      id: 'infra-ch2',
      title: 'Advanced Enterprise Networking',
      description: 'Modern network architectures and implementations',
      duration: '4 weeks',
      topics: [
        'Spine-Leaf Architecture',
        'Software-Defined Networking',
        'Network Automation',
        'VXLAN Implementation',
        'BGP and EVPN',
        'Network Security Design'
      ]
    },
    {
      id: 'infra-ch3',
      title: 'Hyperconverged Infrastructure',
      description: 'HCI implementation and management',
      duration: '3 weeks',
      topics: [
        'HCI Architecture',
        'VMware vSAN',
        'Nutanix Implementation',
        'Storage Optimization',
        'Performance Tuning',
        'Scalability Planning'
      ]
    },
    {
      id: 'infra-ch4',
      title: 'Infrastructure Management',
      description: 'Enterprise infrastructure operations and maintenance',
      duration: '3 weeks',
      topics: [
        'Infrastructure Monitoring',
        'Capacity Planning',
        'Change Management',
        'Incident Response',
        'Asset Management',
        'Compliance and Auditing'
      ]
    },
    {
      id: 'infra-ch5',
      title: 'Business Continuity',
      description: 'Disaster recovery and business continuity planning',
      duration: '2 weeks',
      topics: [
        'DR Site Design',
        'Backup Strategies',
        'Failover Systems',
        'Recovery Testing',
        'SLA Management',
        'Crisis Response'
      ]
    }
  ]
};

// Update the courses array to include all courses in the correct order
export const courses: Course[] = [
  foundationsCourse,
  aimlCourse,
  deepLearningCourse,
  dataEngineeringCourse,
  dataScienceCourse,
  cyberSecurityCourse,
  ethicalHackingCourse,
  agenticAICourse,
  quantumComputingCourse,
  linuxServerCourse,
  itInfrastructureCourse
];

// Add this line at the end of the file to ensure proper exports
export type { Course, Chapter };
    