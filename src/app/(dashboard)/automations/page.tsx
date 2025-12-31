"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { automationTools } from '@/lib/data';
import { getToolSuggestions } from "./actions";
import { ArrowRight, Bot, Sparkles, Loader } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Suggest Tools
    </Button>
  );
}

export default function AutomationsPage() {
  const initialState = { message: null, suggestions: null, errors: {} };
  const [state, dispatch] = useFormState(getToolSuggestions, initialState);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">Automations Map</h1>
      <p className="text-muted-foreground">Find tools and manage your automation stack.</p>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <form action={dispatch}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot /> AI Tool Suggester
              </CardTitle>
              <CardDescription>Describe a task you want to automate, and AI will suggest the right tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="taskDescription"
                placeholder="e.g., 'When I get a new lead on LinkedIn, I want to add them to a Google Sheet and send a welcome email.'"
                rows={4}
              />
              {state.errors?.taskDescription && (
                <p className="text-sm font-medium text-destructive mt-2">{state.errors.taskDescription[0]}</p>
              )}
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Suggestion Results</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[170px]">
                {state.suggestions?.suggestedTools && state.suggestions.suggestedTools.length > 0 ? (
                    <ul className="space-y-2">
                    {state.suggestions.suggestedTools.map((tool, index) => (
                        <li key={index} className="flex items-center justify-between rounded-md border p-3">
                            <span className="font-medium">{tool.split('(')[0]}</span>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={tool.match(/\((.*?)\)/)?.[1] || '#'} target="_blank">
                                    Setup <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Your suggestions will appear here.</p>
                    </div>
                )}
                 {state.message && state.message !== 'success' && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                 )}
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Core Tool Stack</CardTitle>
            <CardDescription>Direct links to your essential platforms.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {automationTools.map((tool) => (
                <Link href={tool.link} key={tool.name} target="_blank" className="block">
                    <div className="border rounded-lg p-4 h-full hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                            <tool.icon className="h-6 w-6 text-primary" />
                            <h3 className="font-semibold">{tool.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{tool.category}</p>
                    </div>
                </Link>
            ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
