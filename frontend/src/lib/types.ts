export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  xp: number;
  level: number;
  joinedDate: string;
  enrolledCourses: string[]; // course IDs
  completedLessons: string[]; // lesson IDs
  completedCourses: string[]; // course IDs
}

export type QuestionType = 'multiple_choice' | 'true_false';

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options: string[]; // For true_false, options will be ["True", "False"]
  correctAnswer: number; // 0-indexed position in options array
  explanation?: string;
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  summary: string;
  explanation: string;
  keyPoints: string[];
  exampleCode?: string;
  practiceQuestion?: PracticeQuestion;
  xpReward: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  lessons: Lesson[];
  questions: Question[];
  passingScorePercent: number;
}

export interface Certificate {
  id: string; // Format: AF-2026-XXXXX
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  scorePercent: number;
  status: 'pending' | 'verified' | 'rejected';
}

export interface TestResult {
  courseId: string;
  scorePercent: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  passed: boolean;
  xpEarned: number;
  certificateId?: string;
}
