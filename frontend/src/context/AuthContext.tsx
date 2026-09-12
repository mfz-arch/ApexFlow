'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  isLoggedIn: boolean;
  login: (email: string, name?: string, role?: UserRole) => void;
  register: (fullName: string, email: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  updateUserStats: (xpGained: number, completedLessonId?: string, completedCourseId?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_STUDENT: User = {
  id: 'usr-student-demo',
  name: 'Student User',
  email: 'student@apexflow.edu',
  role: 'student',
  xp: 0,
  level: 1,
  joinedDate: new Date().toISOString().split('T')[0],
  enrolledCourses: [],
  completedLessons: [],
  completedCourses: [],
};

const DEFAULT_ADMIN: User = {
  id: 'usr-admin-demo',
  name: 'Academy Administrator',
  email: 'admin@apexflow.edu',
  role: 'admin',
  xp: 500,
  level: 5,
  joinedDate: '2026-01-01',
  enrolledCourses: [],
  completedLessons: [],
  completedCourses: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<UserRole>('student');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('apexflow_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setRoleState(parsed.role || 'student');
      } else {
        // Default guest/student start
        setCurrentUser(DEFAULT_STUDENT);
      }
    } catch (e) {
      console.error('Failed to load user state from localStorage', e);
      setCurrentUser(DEFAULT_STUDENT);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist user on changes
  useEffect(() => {
    if (isLoaded && currentUser) {
      localStorage.setItem('apexflow_user', JSON.stringify(currentUser));
    }
  }, [currentUser, isLoaded]);

  const login = (email: string, name?: string, loginRole: UserRole = 'student') => {
    if (loginRole === 'admin') {
      const adminUser: User = { ...DEFAULT_ADMIN, role: 'admin' };
      setCurrentUser(adminUser);
      setRoleState('admin');
    } else {
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
      setRoleState('student');
    }
  };

  const register = (fullName: string, email: string) => {
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
    setRoleState('student');
  };

  const logout = () => {
    localStorage.removeItem('apexflow_user');
    setCurrentUser(null);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
    }
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
        role,
        isLoggedIn: !!currentUser,
        login,
        register,
        logout,
        setRole,
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
