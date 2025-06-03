export interface TrashEvent {
  id: string;
  timestamp: Date;
  type: 'organic' | 'inorganic';
  imageUrl: string;
  confidence: number;
  dataAiHint: string; // For placeholder image search keywords
}
