import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { TrashEvent } from '@/lib/types';

// Define the expected request body structure from the Raspberry Pi
interface LogTrashEventRequestBody {
  type: 'organic' | 'inorganic';
  imageUrl: string;
  weight: number;
  dataAiHint: string;
  timestamp?: string; // Optional: ISO 8601 date string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LogTrashEventRequestBody;

    // Basic validation
    if (!body.type || !body.imageUrl || body.weight === undefined || !body.dataAiHint) {
      return NextResponse.json({ error: 'Missing required fields: type, imageUrl, weight, dataAiHint' }, { status: 400 });
    }
    if (body.type !== 'organic' && body.type !== 'inorganic') {
      return NextResponse.json({ error: 'Invalid trash type. Must be "organic" or "inorganic".' }, { status: 400 });
    }
    if (typeof body.weight !== 'number' || body.weight < 0) {
      return NextResponse.json({ error: 'Invalid weight. Must be a non-negative number.' }, { status: 400 });
    }

    const newEventId = crypto.randomUUID();
    const eventTimestamp = body.timestamp ? new Date(body.timestamp) : new Date();

    // Constructing an object similar to TrashEvent for logging/potential DB storage
    // Note: 'confidence' is not expected from the Pi in this setup
    const newTrashData = {
      id: newEventId,
      timestamp: eventTimestamp,
      type: body.type,
      imageUrl: body.imageUrl,
      weight: body.weight,
      dataAiHint: body.dataAiHint,
      // confidence is omitted as it's not provided by the Pi's custom classification
    };

    // --- IMPORTANT ---
    // In a real application, you would save `newTrashData` to a persistent database here.
    // For example, using Firebase Firestore, Supabase, Prisma, etc.
    // This would allow the dashboard to fetch and display these events.
    // -----------------
    console.log('Received trash event from Raspberry Pi:', newTrashData);

    // For now, we just return a success response.
    // The dashboard will need a separate mechanism to be updated with this new data.
    return NextResponse.json({ success: true, message: 'Trash event logged', eventId: newEventId, event: newTrashData }, { status: 201 });

  } catch (error) {
    console.error('Error processing /api/log-trash-event:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
