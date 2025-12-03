export interface ClassSession {
  id: string;
  courseId: string;
  courseName: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  location: string;
}

export interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  assignmentName: string;
  score: number;
  maxScore: number;
  date: string; // ISO string
}

export interface StudentData {
  name: string;
  classes: ClassSession[];
  grades: Grade[];
}
