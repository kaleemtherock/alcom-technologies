export interface DashboardCourse extends Course {
  nextClass?: Date;
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
}