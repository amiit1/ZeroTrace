
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { TrashEvent, SpecificWasteType } from '@/lib/types';
import { mapSpecificTypeToDetails } from '@/lib/types';

// Define the expected request body structure from the Raspberry Pi
interface LogTrashEventRequestBody {
  specificWasteType: SpecificWasteType;
  imageUrl: string; // Should be a URL to an image, or a data URI if Pi sends one
  weight: number;
  dataAiHint?: string; // Optional, can be derived from specificWasteType
  timestamp?: string; // Optional: ISO 8601 date string
  confidence?: number; // Optional: confidence from Pi's classification
}

const VALID_SPECIFIC_WASTE_TYPES: SpecificWasteType[] = [
  "plastic", "glass", "metal", "paper", "cardboard", 
  "organic", "electronic", "battery", "textile", "rubber"
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LogTrashEventRequestBody;

    // Basic validation
    if (!body.specificWasteType || !body.imageUrl || body.weight === undefined) {
      return NextResponse.json({ error: 'Missing required fields: specificWasteType, imageUrl, weight' }, { status: 400 });
    }
    if (!VALID_SPECIFIC_WASTE_TYPES.includes(body.specificWasteType.toLowerCase() as SpecificWasteType)) {
       console.warn(`Received potentially invalid specificWasteType: ${body.specificWasteType}. Proceeding but this might indicate an issue.`);
       // Allow it for now but log, ideally client sends valid types.
       // Or return error: return NextResponse.json({ error: `Invalid specificWasteType. Must be one of ${VALID_SPECIFIC_WASTE_TYPES.join(', ')}` }, { status: 400 });
    }

    if (typeof body.weight !== 'number' || body.weight < 0) {
      return NextResponse.json({ error: 'Invalid weight. Must be a non-negative number.' }, { status: 400 });
    }
    if (body.confidence !== undefined && (typeof body.confidence !== 'number' || body.confidence < 0 || body.confidence > 1)) {
      return NextResponse.json({ error: 'Invalid confidence. Must be a number between 0 and 1.' }, { status: 400 });
    }

    const eventTimestamp = body.timestamp ? new Date(body.timestamp) : new Date();
    const { type: derivedType, category: derivedCategory } = mapSpecificTypeToDetails(body.specificWasteType.toLowerCase() as SpecificWasteType);
    
    const newEventId = crypto.randomUUID();

    const newTrashData: TrashEvent = {
      id: newEventId,
      timestamp: eventTimestamp,
      specificWasteType: body.specificWasteType.toLowerCase() as SpecificWasteType,
      type: derivedType,
      category: derivedCategory,
      imageUrl: body.imageUrl, // Pi should send a full URL or data URI
      weight: body.weight,
      confidence: body.confidence, // Use confidence from Pi if provided
      dataAiHint: body.dataAiHint || body.specificWasteType, // Use provided hint or default to specific type
    };

    console.log('Received trash event from Raspberry Pi:', newTrashData);

    // --- IMPORTANT ---
    // In a real application, you would save `newTrashData` to a persistent database here.
    // For example, using Firebase Firestore, Supabase, Prisma, etc.
    // This would allow the dashboard to fetch and display these events.
    // -----------------

    // For now, we just return a success response.
    // The dashboard will need a separate mechanism to be updated with this new data
    // if it's not relying on local state updates from a simulator.
    return NextResponse.json({ success: true, message: 'Trash event logged', eventId: newEventId, event: newTrashData }, { status: 201 });

  } catch (error) {
    console.error('Error processing /api/log-trash-event:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
