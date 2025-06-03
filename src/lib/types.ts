export interface TrashEvent {
  id: string;
  timestamp: Date;
  type: 'organic' | 'inorganic';
  imageUrl: string;
  confidence: number;
  weight: number; // Estimated weight in kilograms
  dataAiHint: string; // For placeholder image search keywords
}
