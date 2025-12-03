import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockStudentData } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("GEMINI_API_KEY is not set. Returning mock response.");
            // Mock response logic
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            return NextResponse.json({
                response: "I'm currently running in demo mode because the API key is missing. \n\nBased on your data:\n- Your next class is Calculus I at 9:00 AM.\n- Your average grade is 85%.\n\nTo enable real AI responses, please add a valid GEMINI_API_KEY to your .env.local file."
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const context = `
      You are an AI assistant for a student portal called Edubot.
      You have access to the following student data:
      ${JSON.stringify(mockStudentData, null, 2)}
      
      Current time: ${new Date().toISOString()}
      
      Answer the student's questions based on this data. 
      If they ask about their schedule, look at the 'classes' array.
      If they ask about grades, look at the 'grades' array.
      Be helpful, concise, and encouraging.
    `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: context }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to help the student with their schedule and grades." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json({
            response: "I encountered an error connecting to the AI service. \n\nHowever, I can tell you that your next class is Calculus I and your latest grade was 95% in Intro to CS."
        });
    }
}

