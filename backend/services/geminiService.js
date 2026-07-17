import { GoogleGenAI } from "@google/genai";

export async function generateFlashcards(notes) {

  console.log("SERVICE KEY:", process.env.GEMINI_API_KEY);

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a study assistant.

Generate exactly 10 flashcards.

Return ONLY valid JSON.

Format:
[
  {
    "question": "...",
    "answer": "..."
  }
]

Notes:
${notes}
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text;
}