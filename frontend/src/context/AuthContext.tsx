'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  loginStudent: (email: string, name?: string) => void;
  loginAdmin: (email: string, password?: string) => boolean;
  registerStudent: (fullName: string, email: string) => void;
  logout: () => void;
  updateUserStats: (xpGained: number, completedLessonId?: string, completedCourseId?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('apexflow_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        setCurrentUser(null); // Unauthenticated guest by default
      }
    } catch (e) {
      console.error('Failed to load user state from localStorage', e);
      setCurrentUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist user on changes
  useEffect(() => {
    if (isLoaded) {
      if (currentUser) {
        localStorage.setItem('apexflow_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('apexflow_user');
      }
    }
  }, [currentUser, isLoaded]);

  const loginStudent = (email: string, name?: string) => {
    const studentUser: User = {
      id: `usr-${Date.now()}`,
      name: name || (email ? email.split('@')[0] : 'Student User'),
      email: email || 'student@apexflow.edu',
      role: 'student',
      xp: currentUser?.xp || 0,
      level: currentUser?.level || 1,
      joinedDate: currentUser?.joinedDate || new Date().toISOString().split('T')[0],
      enrolledCourses: currentUser?.enrolledCourses || [],
      completedLessons: currentUser?.completedLessons || [],
      completedCourses: currentUser?.completedCourses || [],
    };
    setCurrentUser(studentUser);
  };

  const loginAdmin = (email: string): boolean => {
    const adminUser: User = {
      id: 'usr-admin-master',
      name: 'Academy Administrator',
      email: email || 'admin@apexflow.edu',
      role: 'admin',
      xp: 1000,
      level: 10,
      joinedDate: '2026-01-01',
      enrolledCourses: [],
      completedLessons: [],
      completedCourses: [],
    };
    setCurrentUser(adminUser);
    return true;
  };

  const registerStudent = (fullName: string, email: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim(),
      role: 'student',
      xp: 0,
      level: 1,
      joinedDate: new Date().toISOString().split('T')[0],
      enrolledCourses: [],
      completedLessons: [],
      completedCourses: [],
    };
    setCurrentUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('apexflow_user');
    setCurrentUser(null);
  };

  const updateUserStats = (xpGained: number, completedLessonId?: string, completedCourseId?: string) => {
    if (!currentUser) return;

    setCurrentUser((prev) => {
      if (!prev) return prev;
      const newXp = prev.xp + xpGained;
      const newLevel = Math.floor(newXp / 100) + 1;

      const newLessons = completedLessonId && !prev.completedLessons.includes(completedLessonId)
        ? [...prev.completedLessons, completedLessonId]
        : prev.completedLessons;

      const newCourses = completedCourseId && !prev.completedCourses.includes(completedCourseId)
        ? [...prev.completedCourses, completedCourseId]
        : prev.completedCourses;

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessons: newLessons,
        completedCourses: newCourses,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser ? currentUser.role : null,
        isLoggedIn: !!currentUser,
        loginStudent,
        loginAdmin,
        registerStudent,
        logout,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
