"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import createBlogAction from "@/app/actions/blogActions";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      if (data.result) {
        setResult(data.result);

        const saveStatus = await createBlogAction(prompt, data.result);

        if (saveStatus.success) {
          console.log("Blog saved successfully to DB!");

          router.refresh();
        } else {
          console.error("Database error:", saveStatus.error);
          alert("AI generate but not save db yet!");
        }
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
            {loading ? "Generating & Saving..." : "Generate ✨"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle>AI Output Result 👇</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-serif">
              {result}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
