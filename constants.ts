
import { AITask } from './types';

export const testimonialsData = [
  {
    quote: "“AgriGuru helped me pick the best crop for my land and the right market to sell. The AI is incredibly accurate.”",
    author: "Ramesh Kumar",
    location: "Tamil Nadu",
  },
  {
    quote: "“Their disease detector saved my tomato field from blight! I uploaded a photo and got treatment advice in minutes. A lifesaver!”",
    author: "Lakshmi Patel",
    location: "Kerala",
  },
  {
    quote: "“The market insights feature is a game-changer for my profits. I know exactly when to sell for the best price.”",
    author: "Gurpreet Singh",
    location: "Punjab",
  },
];

export const aiTasks = {
  [AITask.DISEASE_DETECTION]: {
    title: 'Crop Disease Detector',
    description: 'Upload a photo of your crop to get instant disease analysis and advice.',
    prompt: "You are an expert agricultural botanist. Analyze this image of a plant. Identify any diseases or pests. Describe the symptoms, suggest potential causes, and recommend organic and chemical treatment options. Format your response in clear, easy-to-read markdown with headings for 'Diagnosis', 'Symptoms', 'Potential Causes', and 'Treatment Recommendations'. If the plant appears healthy, state that clearly and congratulate the user.",
  },
  [AITask.AGE_FINDER]: {
    title: 'Fruit & Veggie Ripeness Finder',
    description: 'Upload an image of a fruit or vegetable (like a coconut) to find its age or ripeness stage.',
    prompt: "You are an expert in horticulture. Analyze this image of a fruit or vegetable. First, identify the item. Then, estimate its stage of ripeness (e.g., underripe, perfectly ripe, overripe). Provide visual cues from the image that support your analysis and suggest the best time for harvest or consumption. Format the response in markdown.",
  },
  [AITask.CROP_DETAILS]: {
    title: 'Crop Identifier',
    description: 'Not sure what crop it is? Upload a photo to get detailed information.',
    prompt: "You are an agricultural expert. Identify the crop in this image. Provide a detailed overview in markdown format, including its common name, scientific name, ideal growing conditions (soil, climate, watering), common uses, and typical time from planting to harvest.",
  },
  [AITask.SOIL_ANALYSIS]: {
    title: 'Soil Health Analyzer',
    description: 'Upload a clear photo of a soil sample for a basic analysis.',
    prompt: "You are a soil scientist. Analyze the provided image of a soil sample. Based on visual cues like color, texture, and structure, provide a basic analysis. Identify the likely soil type (e.g., sandy, clay, loam, silt). Describe its potential characteristics regarding drainage and fertility. Suggest what types of crops might grow well in this soil and recommend simple, organic ways to improve its health. Format your response in markdown.",
  },
};
