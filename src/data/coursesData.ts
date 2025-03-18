import { Course } from '../types/course';

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of AI, including machine learning, neural networks, and natural language processing.',
    instructor: {
      name: 'Shaik Abdul Kaleem',
      expertise: 'AI and Machine Learning',
      avatar: '/images/instructors/shaik-abdul-kaleem.jpg'
    },
    duration: '8 weeks',
    totalLessons: 24,
    level: 'Beginner',
    rating: 4.8,
    enrolledStudents: 1245,
    price: 99.99,
    image: '/images/courses/ai-intro.jpg',
    category: 'Artificial Intelligence',
    sections: [
      {
        id: 'section-1',
        title: 'Introduction to AI',
        content: [
          {
            id: 'content-1',
            title: 'What is Artificial Intelligence?',
            type: 'video',
            duration: 45,
            isPreviewable: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into machine learning algorithms, feature engineering, and model optimization techniques.',
    instructor: 'Shaik Abdul Kaleem',
    duration: '10 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 876,
    price: 129.99,
    image: '/images/courses/machine-learning.jpg',
    category: 'Machine Learning'
  },
  {
    id: '3',
    title: 'Data Science for Business',
    description: 'Apply data science techniques to solve real-world business problems and drive decision-making.',
    instructor: 'Shaik Abdul Kaleem',
    duration: '6 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 1532,
    price: 89.99,
    image: '/images/courses/data-science.jpg',
    category: 'Data Science'
  },
  {
    id: '4',
    title: 'Deep Learning Specialization',
    description: 'Master deep learning techniques including CNNs, RNNs, and transformers for complex AI applications.',
    instructor: 'Shaik Abdul Kaleem',
    duration: '12 weeks',
    level: 'Advanced',
    rating: 4.9,
    students: 743,
    price: 149.99,
    image: '/images/courses/deep-learning.jpg',
    category: 'Deep Learning'
  },
  {
    id: '5',
    title: 'Natural Language Processing',
    description: 'Learn to process and analyze text data using modern NLP techniques and build language models.',
    instructor: 'Shaik Abdul Kaleem',
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.8,
    students: 921,
    price: 109.99,
    image: '/images/courses/nlp.jpg',
    category: 'NLP'
  },
  {
    id: '6',
    title: 'Computer Vision Applications',
    description: 'Build applications that can see and understand images using computer vision and deep learning.',
    instructor: 'Shaik Abdul Kaleem',
    duration: '9 weeks',
    level: 'Intermediate',
    rating: 4.7,
    students: 812,
    price: 119.99,
    image: '/images/courses/computer-vision.jpg',
    category: 'Computer Vision'
  }
];