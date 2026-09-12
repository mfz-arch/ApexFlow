import mongoose, { Schema, Document } from 'mongoose';

export interface IPracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ILesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  summary: string;
  explanation: string;
  keyPoints: string[];
  exampleCode?: string;
  practiceQuestion?: IPracticeQuestion;
  xpReward: number;
}

export interface IQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false';
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ICourse extends Document {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  lessons: ILesson[];
  questions: IQuestion[];
  passingScorePercent: number;
}

const PracticeQuestionSchema = new Schema<IPracticeQuestion>({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String, required: true },
});

const LessonSchema = new Schema<ILesson>({
  id: { type: String, required: true },
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, required: true },
  summary: { type: String, required: true },
  explanation: { type: String, required: true },
  keyPoints: [{ type: String }],
  exampleCode: { type: String },
  practiceQuestion: PracticeQuestionSchema,
  xpReward: { type: Number, default: 50 },
});

const QuestionSchema = new Schema<IQuestion>({
  id: { type: String, required: true },
  type: { type: String, enum: ['multiple_choice', 'true_false'], default: 'multiple_choice' },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
});

const CourseSchema = new Schema<ICourse>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    estimatedHours: { type: String, required: true },
    lessons: [LessonSchema],
    questions: [QuestionSchema],
    passingScorePercent: { type: Number, default: 70 },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', CourseSchema);
