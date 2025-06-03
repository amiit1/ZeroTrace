
'use client';

import { AppHeader } from '@/components/binsight/AppHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from 'next/image';

export default function WasteManagementGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-8 space-y-8">
        <h2 className="text-3xl font-bold font-headline text-primary mb-6 text-center md:text-left">
          Waste Management Guide
        </h2>
        <p className="text-lg text-muted-foreground mb-8 text-center md:text-left">
          Learn effective ways to manage your waste, protect the environment, and contribute to a sustainable future.
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="reduce" className="border rounded-lg shadow-sm overflow-hidden">
            <AccordionTrigger className="text-xl font-semibold p-4 md:p-6 hover:no-underline bg-card hover:bg-muted/50 transition-colors">
              Reduce: The First Step to Less Waste
            </AccordionTrigger>
            <AccordionContent className="p-4 md:p-6 space-y-4 bg-card border-t">
              <p>Reducing the amount of waste we generate is the most effective way to minimize our environmental impact. Think before you buy, opt for products with minimal packaging, and avoid single-use items whenever possible.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Choose reusable shopping bags, water bottles, and coffee cups.</li>
                <li>Buy in bulk to reduce packaging.</li>
                <li>Opt-out of physical junk mail and switch to paperless billing.</li>
                <li>Repair items instead of replacing them.</li>
              </ul>
              <div className="flex justify-center">
                <Image src="https://placehold.co/480x320.png" alt="Reducing waste" width={480} height={320} className="rounded-md shadow-md object-cover" data-ai-hint="reusable bags" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reuse" className="border rounded-lg shadow-sm overflow-hidden">
            <AccordionTrigger className="text-xl font-semibold p-4 md:p-6 hover:no-underline bg-card hover:bg-muted/50 transition-colors">
              Reuse: Give Items a Second Life
            </AccordionTrigger>
            <AccordionContent className="p-4 md:p-6 space-y-4 bg-card border-t">
              <p>Before throwing something away, consider if it can be reused. Many items can find a new purpose, saving resources and reducing landfill waste.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use glass jars and containers for storage.</li>
                <li>Donate unwanted clothes, furniture, and books to charity.</li>
                <li>Repurpose old items into new creations (e.g., old t-shirts into cleaning rags).</li>
                <li>Use both sides of paper for printing or writing.</li>
              </ul>
              <div className="flex justify-center">
                <Image src="https://placehold.co/480x320.png" alt="Reusing items" width={480} height={320} className="rounded-md shadow-md object-cover" data-ai-hint="repurposed items" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="recycle" className="border rounded-lg shadow-sm overflow-hidden">
            <AccordionTrigger className="text-xl font-semibold p-4 md:p-6 hover:no-underline bg-card hover:bg-muted/50 transition-colors">
              Recycle: Closing the Loop
            </AccordionTrigger>
            <AccordionContent className="p-4 md:p-6 space-y-4 bg-card border-t">
              <p>Recycling turns waste materials into new products. Familiarize yourself with local recycling guidelines to ensure you're recycling correctly.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Clean and sort your recyclables (paper, plastic, glass, metal).</li>
                <li>Check local guidelines for specific plastic types accepted.</li>
                <li>Flatten cardboard boxes to save space.</li>
                <li>Avoid putting non-recyclable items in the recycling bin (e.g., plastic bags, greasy pizza boxes in some areas).</li>
              </ul>
              <div className="flex justify-center">
                <Image src="https://placehold.co/480x320.png" alt="Recycling bins" width={480} height={320} className="rounded-md shadow-md object-cover" data-ai-hint="sorted recyclables" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="segregate" className="border rounded-lg shadow-sm overflow-hidden">
            <AccordionTrigger className="text-xl font-semibold p-4 md:p-6 hover:no-underline bg-card hover:bg-muted/50 transition-colors">
              Segregate Your Waste: Key to Efficiency
            </AccordionTrigger>
            <AccordionContent className="p-4 md:p-6 space-y-4 bg-card border-t">
              <p>Proper waste segregation at source is crucial for effective recycling and composting. It prevents contamination and makes waste processing more efficient.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Keep separate bins for organic (wet) waste, dry recyclables, and non-recyclable (landfill) waste.</li>
                <li>Ensure hazardous waste (batteries, electronics, chemicals) is disposed of separately and safely according to local regulations.</li>
                <li>Educate your household on correct segregation practices.</li>
              </ul>
              <div className="flex justify-center">
                 <Image src="https://placehold.co/480x320.png" alt="Waste segregation" width={480} height={320} className="rounded-md shadow-md object-cover" data-ai-hint="separate bins" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="compost" className="border rounded-lg shadow-sm overflow-hidden">
            <AccordionTrigger className="text-xl font-semibold p-4 md:p-6 hover:no-underline bg-card hover:bg-muted/50 transition-colors">
              Compost at Home: Create Nutrient-Rich Soil
            </AccordionTrigger>
            <AccordionContent className="p-4 md:p-6 space-y-4 bg-card border-t">
              <p>Composting organic waste like fruit and vegetable scraps, coffee grounds, and yard trimmings reduces landfill volume and creates valuable soil amendment for your garden.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Start a compost bin or pile in your yard or balcony (if permitted).</li>
                <li>Balance "green" materials (nitrogen-rich, like food scraps) with "brown" materials (carbon-rich, like dried leaves or cardboard).</li>
                <li>Avoid composting meat, dairy, oily foods, and diseased plants.</li>
                <li>Turn your compost regularly to aerate it and speed up decomposition.</li>
              </ul>
              <div className="flex justify-center">
                <Image src="https://placehold.co/480x320.png" alt="Compost bin" width={480} height={320} className="rounded-md shadow-md object-cover" data-ai-hint="garden compost" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
