'use client';

import { useState, useEffect } from 'react';
import type { TrashEvent } from '@/lib/types';
import { AppHeader } from '@/components/binsight/AppHeader';
import { DashboardStats } from '@/components/binsight/DashboardStats';
import { WasteDistributionChart } from '@/components/binsight/WasteDistributionChart';
import { TrashLog } from '@/components/binsight/TrashLog';
import { AddTrashSimulator } from '@/components/binsight/AddTrashSimulator';

const initialEvents: TrashEvent[] = [
  { 
    id: '1', 
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    type: 'organic', 
    imageUrl: 'https://placehold.co/100x100/228B22/FFFFFF.png?text=AppleCore', 
    confidence: 0.92, 
    dataAiHint: 'apple core' 
  },
  { 
    id: '2', 
    timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    type: 'inorganic', 
    imageUrl: 'https://placehold.co/100x100/A9A9A9/FFFFFF.png?text=PlasticBottle', 
    confidence: 0.98, 
    dataAiHint: 'plastic bottle'
  },
];


export default function HomePage() {
  const [trashEvents, setTrashEvents] = useState<TrashEvent[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load initial/persisted data only on client-side
    // For now, using hardcoded initialEvents
    // In a real app, this could come from localStorage or an API
    setTrashEvents(initialEvents);
    setIsMounted(true);
  }, []);


  const handleAddTrash = (newEvent: TrashEvent) => {
    setTrashEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  if (!isMounted) {
    // You can render a loading skeleton here if needed
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AppHeader />
        <main className="flex-grow container mx-auto p-4 md:p-8 text-center">
          Loading dashboard...
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-8">
        <DashboardStats trashEvents={trashEvents} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2">
            <WasteDistributionChart trashEvents={trashEvents} />
          </div>
          <div className="lg:col-span-1">
            <AddTrashSimulator onAddTrash={handleAddTrash} />
          </div>
        </div>
        
        <TrashLog trashEvents={trashEvents} />
      </main>
    </div>
  );
}
