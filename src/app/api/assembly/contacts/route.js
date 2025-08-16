import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read contacts from file
const readContacts = () => {
  try {
    ensureDataDirectory();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
};

// Write contacts to file
const writeContacts = (contacts) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error writing contacts:', error);
  }
};

// GET - Fetch all contacts
export async function GET() {
  try {
    const contacts = readContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST - Create new contact
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const contacts = readContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      company: company || '',
      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);
    writeContacts(contacts);

    return NextResponse.json(
      { message: 'Contact created successfully', contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
