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
    const { name, email, password } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    let existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email, role: existingUser.role },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      return NextResponse.json({
        user: {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          xp: existingUser.xp,
          level: existingUser.level,
          joinedDate: existingUser.joinedDate,
          enrolledCourses: existingUser.enrolledCourses,
          completedLessons: existingUser.completedLessons,
          completedCourses: existingUser.completedCourses,
        },
        token,
      });
    }

    const hashedPassword = await bcrypt.hash(password || 'ApexFlowStudent2026!', 10);
    const newUser = new User({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: 'student',
      xp: 0,
      level: 1,
      joinedDate: new Date().toISOString().split('T')[0],
      enrolledCourses: [],
      completedLessons: [],
      completedCourses: [],
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json(
      {
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          xp: newUser.xp,
          level: newUser.level,
          joinedDate: newUser.joinedDate,
          enrolledCourses: newUser.enrolledCourses,
          completedLessons: newUser.completedLessons,
          completedCourses: newUser.completedCourses,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'Server error during registration' }, { status: 500 });
  }
}
