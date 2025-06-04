export interface TrashEvent {
  id: string;
  timestamp: Date;
  type: 'organic' | 'inorganic';
  imageUrl: string;
  confidence?: number; // Made confidence optional
  weight: number; // Estimated weight in kilograms
  dataAiHint: string; // For placeholder image search keywords
}
