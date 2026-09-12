'use client';

import React from 'react';
import TaskTable from '@/components/list/TaskTable';

export default function ListPage() {
  return (
    <div className="space-y-4 pb-8">
      <TaskTable />
    </div>
  );
}
