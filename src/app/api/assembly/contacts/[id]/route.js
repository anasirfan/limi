import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Read contacts from file
const readContacts = () => {
  try {
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
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error writing contacts:', error);
  }
};

// DELETE - Delete a specific contact
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const contacts = readContacts();
    
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    contacts.splice(contactIndex, 1);
    writeContacts(contacts);

    return NextResponse.json(
      { message: 'Contact deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
