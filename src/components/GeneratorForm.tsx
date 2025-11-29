"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneratorForm() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;

        setLoading(true);
        setResult("");

        try {
            // 1. Send the prompt to our Backend API
            const response = await fetch("/api/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt }),
            });
            const data = await response.json();

      // 2. Display the AI response
      if (data.result) {
        setResult(data.result);
      }
    } catch (error) {
        console.error("Error generating content:", error);
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    return (
        <div className="grid gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>What do you want to write about?</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Input
                placeholder="e.g., A blog post about Sri Lanka tourism..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate ✨"}
              </Button>
            </CardContent>
          </Card>
    
          {/* Result Section (Only shows if there is a result) */}
          {result && (
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle>AI Output Result 👇</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {result}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }