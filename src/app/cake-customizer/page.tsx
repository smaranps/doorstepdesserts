
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bot, Loader2 } from "lucide-react";
import type { CakeDesignerOutput } from '@/ai/flows/cake-designer-flow';
import { generateCake } from '@/ai/flows/cake-designer-flow';
import { Skeleton } from '@/components/ui/skeleton';

export default function CakeCustomizerPage() {
  const [eventDescription, setEventDescription] = useState('');
  const [cakeIdea, setCakeIdea] = useState<CakeDesignerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventDescription) return;

    setIsLoading(true);
    setCakeIdea(null);
    setError(null);
    try {
      const result = await generateCake({ description: eventDescription });
      setCakeIdea(result);
    } catch (error) {
      console.error("Failed to generate cake idea:", error);
      setError("Sorry, we couldn't design a cake right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Bot className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-headline">AI Cake Customizer</CardTitle>
          <CardDescription>
            Describe your event and theme, and our AI will design the perfect cake for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-description">Event Details</Label>
              <Textarea
                id="event-description"
                placeholder="e.g., 'A baby shower for a friend who loves travel.' or 'My son's 8th birthday. He is obsessed with space and rockets!'"
                rows={4}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
             <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin"/>
                  Designing your cake...
                </>
              ) : (
                <>
                  <Bot className="mr-2"/>
                  Generate Cake Ideas
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-headline text-center mb-4">Your Custom Cake</h3>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-16 w-full" />
              </div>
            )}
            {!isLoading && !cakeIdea && !error && (
               <div className="text-center text-muted-foreground">
                Your AI-generated cake description will appear here.
              </div>
            )}
            {error && (
              <div className="text-center text-destructive-foreground bg-destructive/90 p-4 rounded-md">
                {error}
              </div>
            )}
            {cakeIdea && (
              <div className="text-center space-y-4">
                 <h4 className="text-2xl font-headline text-primary">{cakeIdea.cakeName}</h4>
                 <p className="text-muted-foreground">{cakeIdea.cakeDescription}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
