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

// Update courses array to include the new course
export const courses: Course[] = [
  aimlCourse,
  deepLearningCourse,
  dataEngineeringCourse,
  dataScienceCourse,
  mlCourse // removed duplicate aimlCourse and undefined courses
];