import { NextResponse } from 'next/server';

/**
 * API route to proxy IP information requests to avoid CORS issues
 * This endpoint fetches IP and country information from a public API
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response with IP information
 */
export async function GET() {
  try {
    // Try to fetch from ipapi.co
    try {
      const response = await fetch('https://ipapi.co/json', { 
        cache: 'no-store',
        headers: {
          'User-Agent': 'LIMI-Lighting-App/1.0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch (error) {
      console.error('Primary IP API failed:', error);
    }
    
    // Fallback to ipify API if the first one fails
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        
        // Return basic IP info without country
        return NextResponse.json({
          ip: ipData.ip,
          country_name: 'Unknown',
          city: 'Unknown',
          region: 'Unknown'
        }, { status: 200 });
      }
    } catch (error) {
      console.error('Fallback IP API failed:', error);
    }
    
    // If all APIs fail, return fallback data
    return NextResponse.json({
      ip: '127.0.0.1',
      country_name: 'Unknown',
      city: 'Unknown',
      region: 'Unknown'
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error in IP info proxy:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      ip: '127.0.0.1',
      country_name: 'Unknown',
      city: 'Unknown',
      region: 'Unknown'
    }, { status: 200 });
  }
}
