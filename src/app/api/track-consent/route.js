import { NextResponse } from 'next/server';

/**
 * API route to handle tracking consent data
 * This endpoint receives visitor tracking data and stores it
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.userAgent || data.consent !== true) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would save to MongoDB
    // For now, we'll just log the data and return success
    // console.log('Received tracking data:', data);
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'Tracking data received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing tracking data:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Error processing tracking data' },
      { status: 500 }
    );
  }
}
