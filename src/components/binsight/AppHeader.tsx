import { Waves } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function AppHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Waves className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-headline font-bold text-primary">
            ZeroTrace
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
