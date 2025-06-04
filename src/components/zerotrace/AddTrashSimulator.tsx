
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { classifyTrash } from '@/ai/flows/classify-trash';
import type { TrashEvent } from '@/lib/types';
import { imageToDataURI } from '@/lib/image-utils';
import { useToast } from "@/hooks/use-toast";
import { Loader2, PackagePlus } from 'lucide-react';

interface AddTrashSimulatorProps {
  onAddTrash: (event: TrashEvent) => void;
}

const sampleTrashItems = [
  { url: 'https://placehold.co/150x150/8FBC8F/FFFFFF.png?text=Peel', hint: 'fruit peel', dataAiHint: "fruit peel", weight: 0.1 },
  { url: 'https://placehold.co/150x150/D2B48C/FFFFFF.png?text=Cardboard', hint: 'cardboard box', dataAiHint: "cardboard box", weight: 0.25 },
  { url: 'https://placehold.co/150x150/ADD8E6/FFFFFF.png?text=Bottle', hint: 'plastic bottle', dataAiHint: "plastic bottle", weight: 0.05 },
  { url: 'https://placehold.co/150x150/A9A9A9/FFFFFF.png?text=Can', hint: 'metal can', dataAiHint: "metal can", weight: 0.03 },
  { url: 'https://placehold.co/150x150/F0E68C/000000.png?text=Paper', hint: 'crumpled paper', dataAiHint: "crumpled paper", weight: 0.02 },
];

export function AddTrashSimulator({ onAddTrash }: AddTrashSimulatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSimulate = async () => {
    setIsLoading(true);
    toast({
      title: "Processing...",
      description: "Simulating trash disposal and classifying...",
    });

    try {
      const randomItem = sampleTrashItems[Math.floor(Math.random() * sampleTrashItems.length)];
      const photoDataUri = await imageToDataURI(randomItem.url);
      
      const classificationResult = await classifyTrash({ photoDataUri });

      const newEvent: TrashEvent = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        type: classificationResult.trashType,
        confidence: classificationResult.confidence,
        weight: randomItem.weight,
        imageUrl: randomItem.url, // Use the original URL for display
        dataAiHint: randomItem.dataAiHint,
      };

      onAddTrash(newEvent);
      toast({
        title: "Success!",
        description: `Item classified as ${classificationResult.trashType} with ${ (classificationResult.confidence * 100).toFixed(0)}% confidence.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error simulating trash:", error);
      toast({
        title: "Error",
        description: "Could not classify trash. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Simulate Trash Input</CardTitle>
        <CardDescription>Click the button to simulate a new trash item being added to the bin and classified by AI.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full space-y-4 pb-8">
        <PackagePlus className="w-16 h-16 text-primary opacity-50" />
        <Button onClick={handleSimulate} disabled={isLoading} size="lg" className="w-full max-w-xs">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Simulate Adding Trash"
          )}
        </Button>
        {isLoading && <p className="text-sm text-muted-foreground">The AI is thinking... please wait.</p>}
      </CardContent>
    </Card>
  );
}
