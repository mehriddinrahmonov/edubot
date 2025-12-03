import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockStudentData } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Rule-based fallback for demo mode
            const lowerMsg = message.toLowerCase();
            let responseText = "I can help you with your schedule and grades.";

            if (lowerMsg.includes("next class") || lowerMsg.includes("schedule")) {
                const nextClass = mockStudentData.classes.find(c => new Date(c.startTime) > new Date());
                if (nextClass) {
                    responseText = `Your next class is ${nextClass.courseName} at ${new Date(nextClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} in ${nextClass.location}.`;
                } else {
                    responseText = "You don't have any more classes today.";
                }
            } else if (lowerMsg.includes("grade") || lowerMsg.includes("score")) {
                if (lowerMsg.includes("calculus") || lowerMsg.includes("math")) {
                    const grade = mockStudentData.grades.find(g => g.courseName.includes("Calculus"));
                    responseText = grade ? `Your grade in Calculus is ${grade.score}/${grade.maxScore}.` : "I couldn't find a grade for Calculus.";
                } else if (lowerMsg.includes("cs") || lowerMsg.includes("computer")) {
                    const grade = mockStudentData.grades.find(g => g.courseName.includes("Computer"));
                    responseText = grade ? `Your grade in Computer Science is ${grade.score}/${grade.maxScore}.` : "I couldn't find a grade for Computer Science.";
                } else {
                    // Average
                    const total = mockStudentData.grades.reduce((acc, g) => acc + (g.score / g.maxScore), 0);
                    const avg = Math.round((total / mockStudentData.grades.length) * 100);
                    responseText = `Your overall average grade is ${avg}%.`;
                }
            } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
                responseText = `Hello ${mockStudentData.name}! How can I help you today?`;
            }

            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
            return NextResponse.json({ response: responseText });
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

