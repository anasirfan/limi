import { NextResponse } from 'next/server';

/**
 * API route to handle tracking consent data
 * This endpoint receives visitor tracking data and stores it
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response
 */
export async function POST(request) {
  return handleTrackingData(request, 'POST');
}

/**
 * API route to handle tracking consent data updates
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response
 */
export async function PATCH(request) {
  return handleTrackingData(request, 'PATCH');
}

/**
 * Handle tracking data for both new entries and updates
 * 
 * @param {Request} request - The incoming request object
 * @param {string} method - The HTTP method (POST or PATCH)
 * @returns {NextResponse} The API response
 */
async function handleTrackingData(request, method) {
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
    // console.log(`${method === 'PATCH' ? 'Updated' : 'Received'} tracking data:`, data);
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: method === 'PATCH' ? 'Tracking data updated' : 'Tracking data received' 
      },
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
