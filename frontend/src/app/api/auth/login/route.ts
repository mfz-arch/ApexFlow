import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'apexflow_jwt_secret_super_key_2026_secure';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { email, password, isAdmin } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: cleanEmail });

    const isAdminLogin = cleanEmail.includes('admin') || isAdmin === true;

    if (!user) {
      const defaultPassword = await bcrypt.hash(password || 'ApexFlow2026!', 10);
      user = new User({
        name: isAdminLogin ? "AIM'FIZ AHMED IBRAHIM" : cleanEmail.split('@')[0],
        email: cleanEmail,
        password: defaultPassword,
        role: isAdminLogin ? 'admin' : 'student',
        xp: isAdminLogin ? 1000 : 0,
        level: isAdminLogin ? 10 : 1,
        joinedDate: new Date().toISOString().split('T')[0],
        enrolledCourses: [],
        completedLessons: [],
        completedCourses: [],
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
        joinedDate: user.joinedDate,
        enrolledCourses: user.enrolledCourses,
        completedLessons: user.completedLessons,
        completedCourses: user.completedCourses,
      },
      token,
    });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
