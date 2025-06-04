
'use client';

import { useState, useEffect } from 'react';
import type { TrashEvent } from '@/lib/types';
import { AppHeader } from '@/components/zerotrace/AppHeader';
import { DashboardStats } from '@/components/zerotrace/DashboardStats';
import { WasteDistributionChart } from '@/components/zerotrace/WasteDistributionChart';
import { TrashLog } from '@/components/zerotrace/TrashLog';
import { AddTrashSimulator } from '@/components/zerotrace/AddTrashSimulator';
import { PiHealthCheck } from '@/components/zerotrace/PiHealthCheck';
import { mapSpecificTypeToDetails } from '@/lib/types';


const initialEventsData: Array<Omit<TrashEvent, 'id' | 'type' | 'category' | 'timestamp'> & { specificWasteType: TrashEvent['specificWasteType'], timestampOffsetHours?: number }> = [
  { 
    timestampOffsetHours: 2,
    specificWasteType: 'organic', 
    imageUrl: 'https://placehold.co/100x100/228B22/FFFFFF.png?text=AppleCore', 
    confidence: 0.92,
    weight: 0.15, 
    dataAiHint: 'apple core' 
  },
  { 
    timestampOffsetHours: 5,
    specificWasteType: 'plastic', 
    imageUrl: 'https://placehold.co/100x100/A9A9A9/FFFFFF.png?text=PlasticBottle', 
    confidence: 0.98,
    weight: 0.05, 
    dataAiHint: 'plastic bottle'
  },
  {
    timestampOffsetHours: 8,
    specificWasteType: 'battery',
    imageUrl: 'https://placehold.co/100x100/FFD700/000000.png?text=Battery',
    confidence: 0.99, // Pi might provide this
    weight: 0.02,
    dataAiHint: 'AA battery'
  },
  {
    timestampOffsetHours: 10,
    specificWasteType: 'paper',
    imageUrl: 'https://placehold.co/100x100/F0E68C/000000.png?text=Paper',
    weight: 0.1,
    dataAiHint: 'crumpled paper'
  }
];

const initialEvents: TrashEvent[] = initialEventsData.map((eventData, index) => {
  const { type, category } = mapSpecificTypeToDetails(eventData.specificWasteType);
  return {
    id: (index + 1).toString(),
    timestamp: new Date(Date.now() - 3600000 * (eventData.timestampOffsetHours || (index + 1) * 2)),
    specificWasteType: eventData.specificWasteType,
    type,
    category,
    imageUrl: eventData.imageUrl.includes("?text=") 
      ? eventData.imageUrl 
      : `https://placehold.co/100x100/cccccc/000000.png?text=${encodeURIComponent(eventData.specificWasteType)}`,
    confidence: eventData.confidence,
    weight: eventData.weight,
    dataAiHint: eventData.dataAiHint || eventData.specificWasteType,
  };
});


export default function HomePage() {
  const [trashEvents, setTrashEvents] = useState<TrashEvent[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTrashEvents(initialEvents);
    setIsMounted(true);
  }, []);

  // This handler is called by AddTrashSimulator.
  // In a real app with a DB, this would likely trigger a re-fetch or be updated by a real-time listener.
  const handleAddTrash = (newEvent: TrashEvent) => {
    setTrashEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  if (!isMounted) {
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
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Pass the API endpoint to the simulator if it were to POST */}
            {/* For now, it calls onAddTrash directly with a fully formed event */}
            <AddTrashSimulator onAddTrash={handleAddTrash} />
            <PiHealthCheck />
          </div>
        </div>
        
        <TrashLog trashEvents={trashEvents} />
      </main>
    </div>
  );
}
