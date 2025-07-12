
export enum AITask {
  DISEASE_DETECTION = 'DISEASE_DETECTION',
  AGE_FINDER = 'AGE_FINDER',
  CROP_DETAILS = 'CROP_DETAILS',
  SOIL_ANALYSIS = 'SOIL_ANALYSIS',
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface MarketPriceResult {
  priceInfo: string;
  sources: GroundingSource[];
}
