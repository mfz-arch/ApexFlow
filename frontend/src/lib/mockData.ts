import { Task, Project, User, Activity, AnalyticsMetrics } from './types';

export const initialUsers: User[] = [
  {
    id: 'usr-me',
    name: 'You (Project Lead)',
    email: 'user@apexflow.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Project Manager',
    status: 'online',
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Core Workspace Project',
    key: 'APEX',
    description: 'Main product delivery stream and engineering roadmap.',
    color: 'from-indigo-600 to-blue-600',
    category: 'Engineering',
    memberCount: 1,
    taskCount: 0,
    completedTaskCount: 0,
    updatedAt: new Date().toISOString(),
  },
];

export const initialTasks: Task[] = [];

export const initialActivities: Activity[] = [];

export const initialAnalytics: AnalyticsMetrics = {
  totalTasks: 0,
  completedTasks: 0,
  inProgressTasks: 0,
  urgentTasks: 0,
  completionRate: 0,
  sprintVelocity: 0,
  hoursSpent: 0,
};
