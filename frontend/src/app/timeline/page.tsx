'use client';

import React from 'react';
import TimelineGantt from '@/components/timeline/TimelineGantt';

export default function TimelinePage() {
  return (
    <div className="h-[calc(100vh-6rem)] pb-4">
      <TimelineGantt />
    </div>
  );
}
