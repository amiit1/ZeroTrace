
import type { TrashEvent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Leaf, Package, Weight, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import { format } from 'date-fns';

interface TrashLogProps {
  trashEvents: TrashEvent[];
}

// Helper to capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function TrashLog({ trashEvents }: TrashLogProps) {
  const sortedEvents = [...trashEvents].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getCategoryStyleAndIcon = (category: TrashEvent['category']) => {
    switch (category) {
      case 'organic':
        return {
          icon: <Leaf className="h-3 w-3" />,
          className: 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300',
        };
      case 'inorganic':
        return {
          icon: <Package className="h-3 w-3" />,
          className: 'bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300',
        };
      case 'hazardous':
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          className: 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300',
        };
      default:
        return {
          icon: <Package className="h-3 w-3" />,
          className: 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300',
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Trash Log</CardTitle>
        <CardDescription>Detailed log of each trash item processed, classified by the Raspberry Pi.</CardDescription>
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
                <TableHead>Specific Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Est. Weight</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map((event) => {
                const { icon, className: badgeClassName } = getCategoryStyleAndIcon(event.category);
                const imageUrl = event.imageUrl.includes("?text=") 
                                 ? event.imageUrl // Assume it's already a placeholder with text
                                 : `https://placehold.co/48x48/cccccc/000000.png?text=${encodeURIComponent(event.specificWasteType)}`;

                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Image 
                        src={imageUrl} 
                        alt={event.dataAiHint || event.specificWasteType}
                        width={48} 
                        height={48} 
                        className="rounded-md object-cover"
                        data-ai-hint={event.dataAiHint || event.specificWasteType} 
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {capitalize(event.specificWasteType)}
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-2 capitalize px-2 py-1 rounded-full text-xs font-medium w-fit ${badgeClassName}`}>
                        {icon}
                        {event.category}
                      </span>
                    </TableCell>
                    <TableCell>{event.confidence ? (event.confidence * 100).toFixed(0) + '%' : 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Weight className="h-3.5 w-3.5 text-muted-foreground" />
                        {event.weight.toFixed(2)} kg
                      </div>
                    </TableCell>
                    <TableCell>{format(event.timestamp, 'PPpp')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
