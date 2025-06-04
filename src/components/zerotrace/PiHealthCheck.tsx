
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wifi, WifiOff, Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';

export function PiHealthCheck() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const PI_HEALTH_ENDPOINT = 'http://192.168.1.109:5000/health';

  const checkPiHealth = async () => {
    setIsLoading(true);
    setHealthStatus(null);
    toast({ title: "Checking Pi Health...", description: `Pinging ${PI_HEALTH_ENDPOINT}` });

    try {
      const response = await fetch(PI_HEALTH_ENDPOINT, {
        method: 'GET',
        mode: 'cors', 
      });

      if (response.ok) {
        setHealthStatus('Healthy');
        toast({
          title: "Pi is Healthy!",
          description: `Successfully connected to ${PI_HEALTH_ENDPOINT}.`,
          variant: 'default',
        });
      } else {
        setHealthStatus(`Unhealthy (Status: ${response.status})`);
        toast({
          title: "Pi Health Issue",
          description: `Could not connect or received an error from ${PI_HEALTH_ENDPOINT}. Status: ${response.status}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error checking Pi health:', error);
      setHealthStatus('Not Reachable');
      toast({
        title: "Pi Not Reachable",
        description: `Failed to connect to ${PI_HEALTH_ENDPOINT}. Check network, Pi status, and CORS configuration on the Pi.`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />;
    if (healthStatus === 'Healthy') return <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />;
    if (healthStatus && healthStatus.startsWith('Unhealthy')) return <ShieldAlert className="mr-2 h-5 w-5 text-yellow-500" />;
    if (healthStatus === 'Not Reachable') return <WifiOff className="mr-2 h-5 w-5 text-red-500" />;
    return <Wifi className="mr-2 h-5 w-5 text-muted-foreground" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center">
          {getStatusIcon()}
          Raspberry Pi Status
        </CardTitle>
        <CardDescription>Check the connection status of the Raspberry Pi service.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4 pt-2 pb-6">
        {healthStatus && !isLoading && (
          <p className={`text-md font-semibold ${
            healthStatus === 'Healthy' ? 'text-green-600 dark:text-green-400' :
            healthStatus === 'Not Reachable' ? 'text-red-600 dark:text-red-400' :
            'text-yellow-600 dark:text-yellow-400'
          }`}>
            Status: {healthStatus}
          </p>
        )}
        <Button onClick={checkPiHealth} disabled={isLoading} className="w-full max-w-xs">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
             "Check Pi Health"
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center px-2">
          Attempts to connect to <code>{PI_HEALTH_ENDPOINT}</code> from your browser.
        </p>
      </CardContent>
    </Card>
  );
}
