import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Getting prompt from the frontend to the backend then send it to google, and send the response back to the frontend 
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

   
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`Write a creative blog post about: ${prompt}`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}