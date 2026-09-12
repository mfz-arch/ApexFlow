export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  code: string; // e.g. APEX-101
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User;
  tags: string[];
  dueDate: string;
  subtasks: Subtask[];
  comments: Comment[];
  timeLoggedHours: number;
  estimatedHours: number;
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  color: string;
  category: string;
  memberCount: number;
  taskCount: number;
  completedTaskCount: number;
  updatedAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AnalyticsMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  urgentTasks: number;
  completionRate: number;
  sprintVelocity: number;
  hoursSpent: number;
}
