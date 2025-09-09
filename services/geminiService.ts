import { GoogleGenAI, Chat, Content } from "@google/genai";
import { Feature, ChatMessage } from "../types";
import { FEATURES } from "../constants";

// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
// It's assumed to be pre-configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

let chat: Chat;

// The history needs to be mapped to the format expected by the Gemini API
const mapHistoryToGemini = (history: ChatMessage[]): Content[] => {
    return history.map(message => ({
        role: message.sender === 'user' ? 'user' : 'model',
        parts: [{ text: message.text }],
    }));
};


export const startChat = (feature: Feature, history: ChatMessage[] = []) => {
    const featureConfig = FEATURES[feature];
    const geminiHistory = mapHistoryToGemini(history);
    
    // Create a new chat session when a feature is selected, including past history
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: geminiHistory,
        config: {
            systemInstruction: featureConfig.systemInstruction,
        },
    });
};

export const sendMessageStream = async (message: string) => {
    if (!chat) {
        throw new Error("Chat not initialized. Call startChat first.");
    }
    // Send message and get a streaming response
    const result = await chat.sendMessageStream({ message });
    return result;
};