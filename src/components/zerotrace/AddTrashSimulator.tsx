
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { TrashEvent, SpecificWasteType } from '@/lib/types';
import { mapSpecificTypeToDetails } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Loader2, PackagePlus } from 'lucide-react';

interface AddTrashSimulatorProps {
  onAddTrash: (event: TrashEvent) => void;
}

interface SampleTrashItem {
  specificWasteType: SpecificWasteType;
  defaultHint: string;
  weight: number; // kg
  baseImageUrl?: string; // e.g. https://placehold.co/150x150/COLOR/TEXT_COLOR.png
  imageColor?: string; // for placeholder
  imageTextColor?: string; // for placeholder
}

const sampleTrashItems: SampleTrashItem[] = [
  { specificWasteType: 'organic', defaultHint: 'banana peel', weight: 0.1, imageColor: '8FBC8F', imageTextColor: 'FFFFFF' },
  { specificWasteType: 'cardboard', defaultHint: 'small box', weight: 0.25, imageColor: 'D2B48C', imageTextColor: '000000' },
  { specificWasteType: 'plastic', defaultHint: 'water bottle', weight: 0.05, imageColor: 'ADD8E6', imageTextColor: '000000' },
  { specificWasteType: 'metal', defaultHint: 'soda can', weight: 0.03, imageColor: 'A9A9A9', imageTextColor: 'FFFFFF' },
  { specificWasteType: 'paper', defaultHint: 'newspaper', weight: 0.02, imageColor: 'F0E68C', imageTextColor: '000000' },
  { specificWasteType: 'glass', defaultHint: 'jar', weight: 0.3, imageColor: 'B0E0E6', imageTextColor: '000000' },
  { specificWasteType: 'electronic', defaultHint: 'old mouse', weight: 0.15, imageColor: 'D3D3D3', imageTextColor: '000000' },
  { specificWasteType: 'battery', defaultHint: 'AA battery', weight: 0.02, imageColor: 'FFD700', imageTextColor: '000000' },
  { specificWasteType: 'textile', defaultHint: 'old sock', weight: 0.05, imageColor: 'FFC0CB', imageTextColor: '000000' },
  { specificWasteType: 'rubber', defaultHint: 'rubber band', weight: 0.01, imageColor: '808080', imageTextColor: 'FFFFFF' },
];

export function AddTrashSimulator({ onAddTrash }: AddTrashSimulatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSimulate = async () => {
    setIsLoading(true);
    toast({
      title: "Simulating Pi Input...",
      description: "Generating a random trash event...",
    });

    try {
      const randomItemData = sampleTrashItems[Math.floor(Math.random() * sampleTrashItems.length)];
      const { type: derivedType, category: derivedCategory } = mapSpecificTypeToDetails(randomItemData.specificWasteType);
      
      const imageUrl = randomItemData.baseImageUrl 
        ? randomItemData.baseImageUrl // If a full URL is provided
        : `https://placehold.co/150x150/${randomItemData.imageColor || 'cccccc'}/${randomItemData.imageTextColor || '000000'}.png?text=${encodeURIComponent(randomItemData.specificWasteType)}`;

      const newEvent: TrashEvent = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        specificWasteType: randomItemData.specificWasteType,
        type: derivedType,
        category: derivedCategory,
        weight: randomItemData.weight,
        imageUrl: imageUrl,
        dataAiHint: randomItemData.defaultHint || randomItemData.specificWasteType,
        confidence: Math.random() * (0.99 - 0.75) + 0.75, // Simulate some confidence
      };

      // Simulate a short delay as if an API call was made
      await new Promise(resolve => setTimeout(resolve, 500));

      onAddTrash(newEvent); // Directly update local state via prop
      
      toast({
        title: "Simulation Success!",
        description: `Item logged as ${randomItemData.specificWasteType} (${derivedCategory}).`,
        variant: "default",
      });

    } catch (error) {
      console.error("Error simulating trash:", error);
      toast({
        title: "Simulation Error",
        description: "Could not simulate trash event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Simulate Pi Trash Input</CardTitle>
        <CardDescription>
          Click to simulate the Raspberry Pi sending a classified trash item to the dashboard.
          The classification (e.g., plastic, paper) is assumed to be done by the Pi.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full space-y-4 pb-8">
        <PackagePlus className="w-16 h-16 text-primary opacity-50" />
        <Button onClick={handleSimulate} disabled={isLoading} size="lg" className="w-full max-w-xs">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Simulating...
            </>
          ) : (
            "Simulate Adding Trash"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
