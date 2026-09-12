import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  id: string; // Format: AF-2026-XXXXX
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  scorePercent: number;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    id: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    issueDate: { type: String, required: true },
    scorePercent: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
