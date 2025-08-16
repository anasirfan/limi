import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'brochures.json');

// Read brochure requests from file
const readBrochureRequests = () => {
  try {
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
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
  } catch (error) {
    console.error('Error writing brochure requests:', error);
  }
};

// DELETE - Delete a specific brochure request
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const requests = readBrochureRequests();
    
    const requestIndex = requests.findIndex(req => req.id === id);
    
    if (requestIndex === -1) {
      return NextResponse.json(
        { error: 'Brochure request not found' },
        { status: 404 }
      );
    }

    requests.splice(requestIndex, 1);
    writeBrochureRequests(requests);

    return NextResponse.json(
      { message: 'Brochure request deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting brochure request:', error);
    return NextResponse.json(
      { error: 'Failed to delete brochure request' },
      { status: 500 }
    );
  }
}
