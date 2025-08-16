import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'brochures.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read brochure requests from file
const readBrochureRequests = () => {
  try {
    ensureDataDirectory();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading brochure requests:', error);
    return [];
  }
};

// Write brochure requests to file
const writeBrochureRequests = (requests) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
  } catch (error) {
    console.error('Error writing brochure requests:', error);
  }
};

// GET - Fetch all brochure requests
export async function GET() {
  try {
    const requests = readBrochureRequests();
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching brochure requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brochure requests' },
      { status: 500 }
    );
  }
}

// POST - Create new brochure request
export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const requests = readBrochureRequests();
    const newRequest = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
    };

    requests.push(newRequest);
    writeBrochureRequests(requests);

    return NextResponse.json(
      { message: 'Brochure request created successfully', request: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating brochure request:', error);
    return NextResponse.json(
      { error: 'Failed to create brochure request' },
      { status: 500 }
    );
  }
}
