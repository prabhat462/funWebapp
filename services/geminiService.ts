import { GoogleGenAI, Type } from "@google/genai";
import { Prize } from "../types";
import { FALLBACK_PRIZE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLovePrize = async (
  winnerName: string,
  loserName: string,
  memory: string
): Promise<Prize> => {
  try {
    const prompt = `
      You are the announcer at a romantic bowling alley called "Cupid's Alley".
      "${winnerName}" just beat "${loserName}" in a bowling match (it was their first date activity).
      
      Generate a "Winner's Prize" description.
      Use this specific memory of them: "${memory}".
      
      Output a JSON object with:
      - title: A cute name for the prize (e.g., "The Queen of the Lanes Award").
      - description: A funny/sweet description of the prize.
      - note: A romantic short message connecting bowling to their relationship.
      - emoji: A single emoji representing the prize.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            note: { type: Type.STRING },
            emoji: { type: Type.STRING },
          },
          required: ["title", "description", "note", "emoji"],
        },
      },
    });

    const text = response.text;
    if (!text) return FALLBACK_PRIZE;

    return JSON.parse(text) as Prize;
  } catch (error) {
    console.error("Error generating prize:", error);
    return FALLBACK_PRIZE;
  }
};
