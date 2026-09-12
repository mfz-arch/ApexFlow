import type { Metadata } from 'next';
import './globals.css';
import { ProjectProvider } from '@/context/ProjectContext';
import Sidebar from '@/components/layout/Sidebar';
import TopHeader from '@/components/layout/TopHeader';
import CommandPalette from '@/components/layout/CommandPalette';
import CreateTaskModal from '@/components/task/CreateTaskModal';
import TaskDetailModal from '@/components/task/TaskDetailModal';

export const metadata: Metadata = {
  title: 'ApexFlow | Modern Clean Project Management SaaS',
  description: 'Clean, high-performance project management platform for engineering teams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-slate-900 antialiased bg-mesh min-h-screen flex selection:bg-indigo-500/20 selection:text-indigo-900">
        <ProjectProvider>
          {/* Collapsible Left Sidebar */}
          <Sidebar />

          {/* Main App Content View Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
            <TopHeader />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>

          {/* Interactive Drawers & Overlays */}
          <CommandPalette />
          <CreateTaskModal />
          <TaskDetailModal />
        </ProjectProvider>
      </body>
    </html>
  );
}
