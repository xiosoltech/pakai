import { GoogleGenAI, Chat, Type, GenerateContentResponse } from "@google/genai";
import type { DiseasePrediction } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatInstance: Chat | null = null;

const getChatInstance = (): Chat => {
    if (!chatInstance) {
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a helpful and empathetic HealthBot. Your goal is to provide clear, concise, and safe health advice based on user-provided symptoms. You are not a doctor, and you must always advise the user to consult a healthcare professional for a real diagnosis. Start the conversation by introducing yourself.',
            },
        });
    }
    return chatInstance;
};

export const streamChatResponse = (message: string) => {
    const chat = getChatInstance();
    return chat.sendMessageStream({ message });
};


export const analyzeLabReport = async (base64Image: string, mimeType: string): Promise<GenerateContentResponse> => {
    const imagePart = {
        inlineData: {
            data: base64Image,
            mimeType: mimeType,
        },
    };
    const textPart = {
        text: 'Analyze this lab report. Extract key parameters, their values, and a brief assessment (e.g., normal, high, low). Provide a concise overall summary. Based on the findings, also predict potential symptoms a person might experience and suggest 2-3 actionable next steps. Frame suggestions as general advice (e.g., "Consult a doctor", "Consider lifestyle changes") and not as a direct medical prescription. Return the result in a structured JSON format.',
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: {
                        type: Type.STRING,
                        description: "A brief overall summary of the lab report findings."
                    },
                    keyFindings: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                parameter: { type: Type.STRING, description: "The name of the lab parameter (e.g., 'Hemoglobin')." },
                                value: { type: Type.STRING, description: "The measured value with units (e.g., '14.5 g/dL')." },
                                assessment: { type: Type.STRING, description: "An assessment of the value (e.g., 'Normal', 'High', 'Low')." },
                            }
                        }
                    },
                    predictedSymptoms: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of potential symptoms the user might experience based on the lab results."
                    },
                    suggestedNextSteps: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of actionable next steps or recommendations for the user."
                    }
                }
            }
        }
    });

    return response;
};

export const predictDiseaseRisks = async (healthData: object): Promise<DiseasePrediction[]> => {
    const prompt = `Based on the following patient health data snapshot, act as a predictive health AI. Identify potential long-term disease risks. For each potential risk, provide the disease name, a risk level (Low, Medium, High), a brief explanation for the assessment based on the data, and 2-3 actionable recommendations for prevention. Do not give medical advice, frame recommendations as lifestyle suggestions. Health Data: ${JSON.stringify(healthData)}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    predictions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                diseaseName: { type: Type.STRING },
                                // FIX: Removed invalid 'enum' property from schema, as it's not supported. The prompt is sufficient to guide the model's output.
                                riskLevel: { type: Type.STRING },
                                explanation: { type: Type.STRING },
                                recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    }
                }
            }
        }
    });

    // FIX: Correctly access the response text and parse JSON robustly.
    const jsonText = response.text.trim();
    if (!jsonText) {
        console.error("Received empty or invalid response from AI for disease prediction.");
        return [];
    }
    try {
        const parsedResponse = JSON.parse(jsonText);
        return parsedResponse.predictions || [];
    } catch (e) {
        console.error("Failed to parse JSON response for disease prediction:", e);
        return [];
    }
};