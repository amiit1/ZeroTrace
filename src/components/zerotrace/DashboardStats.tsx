
import type { TrashEvent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Leaf, ListChecks } from 'lucide-react';

interface DashboardStatsProps {
  trashEvents: TrashEvent[];
}

export function DashboardStats({ trashEvents }: DashboardStatsProps) {
  const totalItems = trashEvents.length;
  const organicItems = trashEvents.filter(event => event.type === 'organic').length;
  const inorganicItems = trashEvents.filter(event => event.type === 'inorganic').length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-headline">Total Items</CardTitle>
          <ListChecks className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">items processed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-headline">Organic Waste</CardTitle>
          <Leaf className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{organicItems}</div>
          <p className="text-xs text-muted-foreground">organic items collected</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-headline">Inorganic Waste</CardTitle>
          <Package className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inorganicItems}</div>
          <p className="text-xs text-muted-foreground">inorganic items collected</p>
        </CardContent>
      </Card>
    </div>
  );
}
