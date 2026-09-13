import mongoose, { Schema, Document, Model } from 'mongoose';

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
    timeSpentSeconds: { type: Number, default: 0 },
    passed: { type: Boolean, required: true },
    xpEarned: { type: Number, default: 0 },
    certificateId: { type: String },
  },
  { timestamps: true }
);

export const TestResult: Model<ITestResult> =
  mongoose.models.TestResult || mongoose.model<ITestResult>('TestResult', TestResultSchema);
