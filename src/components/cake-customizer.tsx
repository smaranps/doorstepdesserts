"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  suggestCakeOptions,
  type SuggestCakeOptionsOutput,
} from "@/ai/flows/suggest-cake-options";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  celebrantGender: z.string().min(1, "Gender is required."),
  celebrantHobbies: z.string().min(3, "Please describe some hobbies."),
  eventDescription: z.string().min(3, "Please describe the event."),
});

type FormValues = z.infer<typeof formSchema>;

export function CakeCustomizer() {
  const [suggestion, setSuggestion] = useState<SuggestCakeOptionsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      celebrantGender: "",
      celebrantHobbies: "",
      eventDescription: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await suggestCakeOptions(values);
      setSuggestion(result);
    } catch (e) {
      setError("Sorry, we couldn't generate a suggestion. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline">Cake Details</CardTitle>
            <CardDescription>
              Tell us a bit about the event and the person of honor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="celebrantGender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celebrant's Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Female, Male, Non-binary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="celebrantHobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobbies & Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Loves gardening, hiking, and sci-fi movies"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A casual 30th birthday party" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full" variant="secondary">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Suggestion
            </Button>
          </CardFooter>
        </form>
      </Form>

      {isLoading && (
        <div className="p-6 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            Our AI is baking up some ideas...
          </p>
        </div>
      )}

      {error && (
        <div className="p-6 text-center text-destructive">{error}</div>
      )}

      {suggestion && (
        <div className="p-6 border-t">
          <h3 className="text-xl font-bold font-headline mb-4">Our Suggestion For You</h3>
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <p>{suggestion.cakeSuggestion}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
