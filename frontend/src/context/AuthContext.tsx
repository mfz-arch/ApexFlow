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

  // Initialize active user from LocalStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('apexflow_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      console.error('Failed to load user state from localStorage', e);
      setCurrentUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync active user to LocalStorage & User DB
  useEffect(() => {
    if (isLoaded) {
      if (currentUser) {
        localStorage.setItem('apexflow_user', JSON.stringify(currentUser));
        
        // Save to user DB index
        try {
          const dbStr = localStorage.getItem('apexflow_users_db');
          const usersDb: Record<string, User> = dbStr ? JSON.parse(dbStr) : {};
          usersDb[currentUser.email.toLowerCase()] = currentUser;
          localStorage.setItem('apexflow_users_db', JSON.stringify(usersDb));
        } catch (e) {
          console.error('Failed to update user database index', e);
        }
      } else {
        localStorage.removeItem('apexflow_user');
      }
    }
  }, [currentUser, isLoaded]);

  const loginStudent = async (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if user exists in LocalStorage DB
    let existingUser: User | null = null;
    try {
      const dbStr = localStorage.getItem('apexflow_users_db');
      if (dbStr) {
        const usersDb: Record<string, User> = JSON.parse(dbStr);
        if (usersDb[cleanEmail]) {
          existingUser = usersDb[cleanEmail];
        }
      }
    } catch (e) {
      console.error('Failed to read users database', e);
    }

    const targetUser: User = existingUser || {
      id: `usr-${Date.now()}`,
      name: name || (cleanEmail ? cleanEmail.split('@')[0] : 'Student User'),
      email: cleanEmail || 'student@apexflow.edu',
      role: 'student',
      xp: 0,
      level: 1,
      joinedDate: new Date().toISOString().split('T')[0],
      enrolledCourses: [],
      completedLessons: [],
      completedCourses: [],
    };

    setCurrentUser(targetUser);

    // Save to users DB index
    try {
      const dbStr = localStorage.getItem('apexflow_users_db');
      const usersDb: Record<string, User> = dbStr ? JSON.parse(dbStr) : {};
      usersDb[cleanEmail] = targetUser;
      localStorage.setItem('apexflow_users_db', JSON.stringify(usersDb));
    } catch (e) {
      console.error('Failed to update users database index', e);
    }

    // Try backend sync
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('apexflow_token', data.token);
          localStorage.setItem('token', data.token);
        }
      }
    } catch (err) {
      console.warn('Backend login sync warning:', err);
    }
  };

  const loginAdmin = (email: string, name?: string): boolean => {
    const cleanEmail = email ? email.trim().toLowerCase() : 'aimfizahmed7@gmail.com';
    const adminUser: User = {
      id: 'usr-admin-master',
      name: name?.trim() || "AIM'FIZ AHMED IBRAHIM",
      email: cleanEmail,
      role: 'admin',
      xp: 1000,
      level: 10,
      joinedDate: '2026-01-01',
      enrolledCourses: [],
      completedLessons: [],
      completedCourses: [],
    };
    setCurrentUser(adminUser);

    // Try backend admin login
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, isAdmin: true }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem('apexflow_token', data.token);
          localStorage.setItem('token', data.token);
        }
      })
      .catch((err) => console.warn('Backend admin login sync warning:', err));

    return true;
  };

  const registerStudent = async (fullName: string, email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    // Check if user already exists
    let existingUser: User | null = null;
    try {
      const dbStr = localStorage.getItem('apexflow_users_db');
      if (dbStr) {
        const usersDb: Record<string, User> = JSON.parse(dbStr);
        if (usersDb[cleanEmail]) {
          existingUser = usersDb[cleanEmail];
        }
      }
    } catch (e) {
      console.error(e);
    }

    const targetUser: User = existingUser || {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: 'student',
      xp: 0,
      level: 1,
      joinedDate: new Date().toISOString().split('T')[0],
      enrolledCourses: [],
      completedLessons: [],
      completedCourses: [],
    };

    setCurrentUser(targetUser);

    // Save to users DB index immediately
    try {
      const dbStr = localStorage.getItem('apexflow_users_db');
      const usersDb: Record<string, User> = dbStr ? JSON.parse(dbStr) : {};
      usersDb[cleanEmail] = targetUser;
      localStorage.setItem('apexflow_users_db', JSON.stringify(usersDb));
    } catch (e) {
      console.error('Failed to save to apexflow_users_db:', e);
    }

    // Try backend registration sync
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('apexflow_token', data.token);
          localStorage.setItem('token', data.token);
        }
      }
    } catch (err) {
      console.warn('Backend register sync warning:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('apexflow_user');
    localStorage.removeItem('apexflow_token');
    localStorage.removeItem('token');
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

