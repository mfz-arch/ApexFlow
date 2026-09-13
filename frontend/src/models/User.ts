import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'student' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  xp: number;
  level: number;
  joinedDate: string;
  enrolledCourses: string[];
  completedLessons: string[];
  completedCourses: string[];
  avatarUrl?: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    enrolledCourses: [{ type: String }],
    completedLessons: [{ type: String }],
    completedCourses: [{ type: String }],
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
