import axios from 'axios';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  enrolled: number;
  thumbnail?: string;
  syllabus: {
    weeks: {
      title: string;
      topics: string[];
      assignments: string[];
    }[];
  };
  status: 'draft' | 'published' | 'archived';
}

class CourseService {
  private baseUrl = '/api/courses';

  async createCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
    const response = await axios.post(this.baseUrl, courseData);
    return response.data;
  }

  async getCourse(id: string): Promise<Course> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    const response = await axios.put(`${this.baseUrl}/${id}`, updates);
    return response.data;
  }

  async deleteCourse(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async listCourses(filters?: {
    instructor?: string;
    status?: Course['status'];
  }): Promise<Course[]> {
    const response = await axios.get(this.baseUrl, { params: filters });
    return response.data;
  }
}

export default CourseService;