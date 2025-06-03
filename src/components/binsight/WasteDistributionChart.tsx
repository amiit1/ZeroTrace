'use client';
import type { TrashEvent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useMemo } from 'react';

interface WasteDistributionChartProps {
  trashEvents: TrashEvent[];
}

const chartConfig = {
  organic: {
    label: 'Organic',
    color: 'hsl(var(--chart-2))', // Greenish
  },
  inorganic: {
    label: 'Inorganic',
    color: 'hsl(var(--chart-4))', // Bluish/Greyish
  },
};

export function WasteDistributionChart({ trashEvents }: WasteDistributionChartProps) {
  const organicCount = trashEvents.filter(event => event.type === 'organic').length;
  const inorganicCount = trashEvents.filter(event => event.type === 'inorganic').length;

  const data = useMemo(() => [
    { name: 'Organic', value: organicCount, fill: chartConfig.organic.color },
    { name: 'Inorganic', value: inorganicCount, fill: chartConfig.inorganic.color },
  ], [organicCount, inorganicCount]);

  const totalItems = organicCount + inorganicCount;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Waste Distribution</CardTitle>
        <CardDescription>Breakdown of organic vs. inorganic waste.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center pb-8">
        {totalItems > 0 ? (
          <ChartContainer config={chartConfig} className="aspect-square max-h-[300px] w-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                strokeWidth={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        ) : (
          <p className="text-muted-foreground">No data yet. Add some trash to see the chart.</p>
        )}
      </CardContent>
    </Card>
  );
}
