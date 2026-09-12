'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Project, User, Activity, TaskStatus, TaskPriority, Comment } from '@/lib/types';
import { mockTasks, mockProjects, mockUsers, mockActivities } from '@/lib/mockData';

interface ProjectContextType {
  tasks: Task[];
  projects: Project[];
  users: User[];
  activities: Activity[];
  selectedProjectId: string;
  searchQuery: string;
  priorityFilter: TaskPriority | 'all';
  assigneeFilter: string | 'all';
  selectedTask: Task | null;
  isCreateTaskOpen: boolean;
  isCommandPaletteOpen: boolean;
  
  // Actions
  setSelectedProjectId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setPriorityFilter: (priority: TaskPriority | 'all') => void;
  setAssigneeFilter: (assigneeId: string | 'all') => void;
  setSelectedTask: (task: Task | null) => void;
  setIsCreateTaskOpen: (open: boolean) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  
  // Data Mutation
  addTask: (newTask: Omit<Task, 'id' | 'code' | 'createdAt' | 'subtasks' | 'comments' | 'timeLoggedHours'>) => void;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  updateTaskPriority: (taskId: string, newPriority: TaskPriority) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addComment: (taskId: string, content: string) => void;
  deleteTask: (taskId: string) => void;
  
  // Filtered views
  filteredTasks: Task[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects] = useState<Project[]>(mockProjects);
  const [users] = useState<User[]>(mockUsers);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string | 'all'>('all');
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tasks based on selected project, search, priority, and assignee
  const filteredTasks = tasks.filter((task) => {
    if (selectedProjectId !== 'all' && task.projectId !== selectedProjectId) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    if (assigneeFilter !== 'all' && task.assignee.id !== assigneeFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchCode = task.code.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      const matchTag = task.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCode && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  const addTask = (taskData: Omit<Task, 'id' | 'code' | 'createdAt' | 'subtasks' | 'comments' | 'timeLoggedHours'>) => {
    const newId = `tsk-${Date.now()}`;
    const nextNum = tasks.length + 109;
    const newTask: Task = {
      ...taskData,
      id: newId,
      code: `APEX-${nextNum}`,
      createdAt: new Date().toISOString().split('T')[0],
      subtasks: [],
      comments: [],
      timeLoggedHours: 0,
    };
    setTasks((prev) => [newTask, ...prev]);

    // Add activity entry
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      userId: users[0].id,
      userName: users[0].name,
      userAvatar: users[0].avatar,
      action: 'created task',
      target: `${newTask.code}: ${newTask.title}`,
      timestamp: 'Just now',
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, status: newStatus };
          if (selectedTask?.id === taskId) setSelectedTask(updated);
          return updated;
        }
        return t;
      })
    );
  };

  const updateTaskPriority = (taskId: string, newPriority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, priority: newPriority };
          if (selectedTask?.id === taskId) setSelectedTask(updated);
          return updated;
        }
        return t;
      })
    );
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          const updated = { ...t, subtasks: updatedSubtasks };
          if (selectedTask?.id === taskId) setSelectedTask(updated);
          return updated;
        }
        return t;
      })
    );
  };

  const addComment = (taskId: string, content: string) => {
    if (!content.trim()) return;
    const newComment: Comment = {
      id: `cm-${Date.now()}`,
      userId: users[0].id,
      userName: users[0].name,
      userAvatar: users[0].avatar,
      content,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, comments: [...t.comments, newComment] };
          if (selectedTask?.id === taskId) setSelectedTask(updated);
          return updated;
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (selectedTask?.id === taskId) setSelectedTask(null);
  };

  return (
    <ProjectContext.Provider
      value={{
        tasks,
        projects,
        users,
        activities,
        selectedProjectId,
        searchQuery,
        priorityFilter,
        assigneeFilter,
        selectedTask,
        isCreateTaskOpen,
        isCommandPaletteOpen,
        setSelectedProjectId,
        setSearchQuery,
        setPriorityFilter,
        setAssigneeFilter,
        setSelectedTask,
        setIsCreateTaskOpen,
        setIsCommandPaletteOpen,
        addTask,
        updateTaskStatus,
        updateTaskPriority,
        toggleSubtask,
        addComment,
        deleteTask,
        filteredTasks,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
