import { NextResponse } from 'next/server';

/**
 * API route to handle tracking session updates
 * This endpoint receives visitor tracking data updates and forwards them to the backend
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.sessionId || !data.userAgent) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Forward the update to the backend API
    try {
      const response = await fetch('https://api.limitless-lighting.co.uk/client/tracking_update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const result = await response.json();
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error('Error forwarding tracking update to backend:', error);
      
      // Return error response
      return NextResponse.json(
        { success: false, message: 'Error updating tracking data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing tracking update:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Error processing tracking data' },
      { status: 500 }
    );
  }
}
