import { GoogleGenAI } from "@google/genai";

// ================= JSON PARSER =================

function parseGeminiJSON(text) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("========== RAW GEMINI RESPONSE ==========");
  console.log(text);

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error("Gemini returned invalid JSON.");
  }
}

// ================= GENERATE STUDY MATERIAL =================

export async function generateStudyMaterial(notes) {
 

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an AI Study Assistant.

Generate BOTH flashcards and quiz from the given notes.

Return ONLY valid JSON.

The JSON MUST EXACTLY follow this format:

{
  "flashcards": [
    {
      "question": "...",
      "answer": "..."
    }
  ],

  "quiz": [
    {
      "question": "...",
      "options": [
        "...",
        "...",
        "...",
        "..."
      ],
      "correctAnswer": "..."
    }
  ]
}

Rules:

- Generate exactly 10 flashcards.
- Generate exactly 10 MCQs.
- Every MCQ must have exactly 4 options.
- Only one option should be correct.
- correctAnswer must exactly match one option.
- Do NOT include markdown.
- Do NOT include explanations.
- Return ONLY JSON.

Notes:

${notes}
`;

  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      });

      return parseGeminiJSON(response.text);

    } catch (error) {
      lastError = error;

      if (error.status !== 503) {
        throw error;
      }

      console.log(`Gemini busy. Retry ${attempt}/3...`);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw lastError;
}