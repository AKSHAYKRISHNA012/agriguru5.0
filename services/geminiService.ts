import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MarketPriceResult } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash';

// Helper to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeImage = async (prompt: string, image: File): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(image);
    const textPart = { text: prompt };
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: [textPart, imagePart] },
      config: {
        temperature: 0.2,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "Sorry, I couldn't analyze the image. The AI service may be temporarily unavailable. Please try again later.";
  }
};


let chat: Chat | null = null;

const initializeChat = () => {
    chat = ai.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are AgriGuru, a friendly and helpful AI assistant for farmers. Answer questions related to farming, crops, weather, and market prices. Keep your answers concise and easy to understand. Use markdown for formatting when it improves readability (e.g., lists, bold text, headings). If you do not know an answer, say you are still learning about that topic.',
        },
    });
}

export const getChatbotResponse = async (newMessage: string): Promise<string> => {
    if (!chat) {
        initializeChat();
    }
    
    try {
        if (!chat) throw new Error("Chat not initialized");

        const response = await chat.sendMessage({ message: newMessage });
        return response.text || "I'm not sure how to respond to that. Could you ask in another way?";
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        initializeChat(); // Re-initialize on error
        return "I'm having a little trouble thinking right now. Please try asking your question again in a moment.";
    }
};

export const getMarketPrice = async (crop: string): Promise<MarketPriceResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What are the current market prices for ${crop} in India? Provide a brief summary and then list key markets with their price ranges. Use Markdown for formatting: use a heading for the summary, and a bulleted list for the markets.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources = groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter(Boolean) || [];

    return {
      priceInfo: response.text,
      sources,
    };
  } catch (error) {
    console.error("Error fetching market price:", error);
    return {
      priceInfo: "Sorry, I couldn't fetch the market prices at the moment. The service may be unavailable. Please try again later.",
      sources: [],
    };
  }
};