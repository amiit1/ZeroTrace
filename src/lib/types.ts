
export type SpecificWasteType = 
  | "plastic"
  | "glass"
  | "metal"
  | "paper"
  | "cardboard"
  | "organic" // General organic like food scraps
  | "electronic"
  | "battery"
  | "textile"
  | "rubber"
  | "unknown"; // Fallback

export type WasteCategory = 'organic' | 'inorganic' | 'hazardous';
export type BroadWasteType = 'organic' | 'inorganic'; // For current stats/charts

export interface TrashEvent {
  id: string;
  timestamp: Date;
  specificWasteType: SpecificWasteType; // e.g., "plastic", "battery"
  type: BroadWasteType; // Derived: 'organic' or 'inorganic' for charts
  category: WasteCategory; // Derived: 'organic', 'inorganic', or 'hazardous' for detailed logging
  imageUrl: string;
  confidence?: number; // Optional: confidence from Pi or classification system
  weight: number; // Estimated weight in kilograms
  dataAiHint: string; // For placeholder image search/alt text, often same as specificWasteType
}

export function mapSpecificTypeToDetails(specificType: SpecificWasteType): { type: BroadWasteType; category: WasteCategory } {
  const lowerSpecificType = specificType.toLowerCase();
  switch (lowerSpecificType) {
    case 'plastic':
    case 'glass':
    case 'metal':
    case 'rubber':
      return { type: 'inorganic', category: 'inorganic' };
    case 'paper':
    case 'cardboard':
    case 'textile':
    case 'organic':
      return { type: 'organic', category: 'organic' };
    case 'electronic':
    case 'battery':
      return { type: 'inorganic', category: 'hazardous' };
    default:
      return { type: 'inorganic', category: 'inorganic' }; // Default for 'unknown' or unexpected
  }
}
