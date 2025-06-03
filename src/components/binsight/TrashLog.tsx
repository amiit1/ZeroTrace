import type { TrashEvent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Leaf, Package } from 'lucide-react';
import { format } from 'date-fns';

interface TrashLogProps {
  trashEvents: TrashEvent[];
}

export function TrashLog({ trashEvents }: TrashLogProps) {
  const sortedEvents = [...trashEvents].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Trash Log</CardTitle>
        <CardDescription>Detailed log of each trash item processed.</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedEvents.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No trash events logged yet.</p>
        ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Timestamp</TableHead>
                 <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Image 
                      src={event.imageUrl} 
                      alt={event.type} 
                      width={48} 
                      height={48} 
                      className="rounded-md object-cover"
                      data-ai-hint={event.dataAiHint} 
                    />
                  </TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-2 capitalize px-2 py-1 rounded-full text-xs font-medium w-fit ${
                      event.type === 'organic' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.type === 'organic' 
                        ? <Leaf className="h-3 w-3" /> 
                        : <Package className="h-3 w-3" />}
                      {event.type}
                    </span>
                  </TableCell>
                  <TableCell>{(event.confidence * 100).toFixed(0)}%</TableCell>
                  <TableCell>{format(event.timestamp, 'PPpp')}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{event.dataAiHint}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
