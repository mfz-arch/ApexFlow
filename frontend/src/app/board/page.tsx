'use client';

import React from 'react';
import KanbanBoard from '@/components/kanban/KanbanBoard';

export default function BoardPage() {
  return (
    <div className="h-[calc(100vh-6rem)]">
      <KanbanBoard />
    </div>
  );
}
