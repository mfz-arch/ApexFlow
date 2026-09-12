import mongoose, { Schema, Document } from 'mongoose';

export interface ITestResult extends Document {
  studentId: string;
  courseId: string;
  scorePercent: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  passed: boolean;
  xpEarned: number;
  certificateId?: string;
}

const TestResultSchema = new Schema<ITestResult>(
  {
    studentId: { type: String, required: true },
    courseId: { type: String, required: true },
    scorePercent: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    timeSpentSeconds: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    xpEarned: { type: Number, required: true },
    certificateId: { type: String },
  },
  { timestamps: true }
);

export const TestResult = mongoose.model<ITestResult>('TestResult', TestResultSchema);
