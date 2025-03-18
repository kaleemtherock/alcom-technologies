export interface Course {
  [x: string]: string;
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    expertise: string;
    avatar: string;
  };
  duration: string;
  totalLessons: number;
  level: string;
  rating: number;
  enrolledStudents: number;
  price: number;
  enrolled?: boolean;
  progress?: {
    completedLessons: number;
    totalLessons: number;
    lastAccessedLesson: string;
    timeSpent: number;
    nextLesson: {
      id: string;
      title: string;
      duration: number;
    };
  };
  sections: {
    id: string;
    title: string;
    content: {
      id: string;
      title: string;
      type: 'video' | 'document' | 'quiz';
      duration?: number;
      isPreviewable: boolean;
    }[];
  }[];
  syllabus: {
    weeks: {
      title: string;
      topics: string[];
    }[];
  };
}