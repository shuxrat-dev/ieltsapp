
import { GoogleGenAI, Type } from "@google/genai";
import { IELTSFeedback } from '../types';

const getGeminiService = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        overallBandScore: { type: Type.NUMBER, description: "An overall band score from 1.0 to 9.0, in 0.5 increments." },
        taskAchievement: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['score', 'feedback', 'suggestions']
        },
        coherenceAndCohesion: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['score', 'feedback', 'suggestions']
        },
        lexicalResource: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['score', 'feedback', 'suggestions']
        },
        grammaticalRangeAndAccuracy: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['score', 'feedback', 'suggestions']
        },
        modelAnswer: { type: Type.STRING, description: "A band 9 model answer for the given prompt." },
    },
    required: [
        'overallBandScore',
        'taskAchievement',
        'coherenceAndCohesion',
        'lexicalResource',
        'grammaticalRangeAndAccuracy',
        'modelAnswer',
    ]
};

export const getIELTSFeedback = async (prompt: string, essay: string): Promise<IELTSFeedback> => {
  try {
    const ai = getGeminiService();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `IELTS Writing Task Prompt: "${prompt}"\n\nStudent's Essay: "${essay}"`,
        config: {
            systemInstruction: "You are a world-class IELTS examiner. Evaluate the following essay based on the official IELTS band descriptors for Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Provide a score for each criterion and an overall band score. Give specific, actionable feedback and suggestions for improvement for each area. Finally, write a Band 9 model answer for the prompt. Respond in the requested JSON format.",
            responseMimeType: "application/json",
            responseSchema: feedbackSchema,
        },
    });

    const jsonText = response.text.trim();
    const feedbackData = JSON.parse(jsonText);

    // Basic validation to ensure the structure is correct
    if (!feedbackData.overallBandScore) {
        throw new Error("Invalid response format from AI.");
    }

    return feedbackData as IELTSFeedback;

  } catch (error) {
    console.error("Error fetching IELTS feedback:", error);
    throw new Error("Failed to get feedback from AI. Please check your API key and try again.");
  }
};
