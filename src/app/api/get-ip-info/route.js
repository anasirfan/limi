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
        console.log('Primary API (ipapi.co) response:', data);
        return NextResponse.json(data, { status: 200 });
      }
    } catch (error) {
      console.error('Primary IP API failed:', error);
    }
    
    // Fallback to ipify + ipinfo.io if the first API fails
    try {
      // First get the IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        
        // Then use the IP to get geolocation data from ipinfo.io
        try {
          const geoResponse = await fetch(`https://ipinfo.io/${ip}/json`, { 
            cache: 'no-store',
            headers: {
              'User-Agent': 'LIMI-Lighting-App/1.0'
            }
          });
          
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            console.log('Geolocation API (ipinfo.io) response:', geoData);
            
            // Prepare the response data
            const responseData = {
              ip: ip,
              country_name: geoData.country || 'Unknown',
              city: geoData.city || 'Unknown',
              region: geoData.region || 'Unknown',
              org: geoData.org || 'Unknown',
              postal: geoData.postal || 'Unknown',
              timezone: geoData.timezone || 'Unknown'
            };
            
            console.log('Sending to client:', responseData);
            return NextResponse.json(responseData, { status: 200 });
          }
        } catch (geoError) {
          console.error('Geolocation API failed:', geoError);
        }
        
        // If geolocation fails, return just the IP
        const fallbackData = {
          ip: ip,
          country_name: 'Unknown',
          city: 'Unknown',
          region: 'Unknown'
        };
        console.log('Geolocation failed, sending fallback data:', fallbackData);
        return NextResponse.json(fallbackData, { status: 200 });
      }
    } catch (error) {
      console.error('Fallback IP API failed:', error);
    }
    
    // If all APIs fail, return fallback data
    const ultimateFallbackData = {
      ip: '127.0.0.1',
      country_name: 'Unknown',
      city: 'Unknown',
      region: 'Unknown'
    };
    console.log('All IP APIs failed, sending ultimate fallback data:', ultimateFallbackData);
    return NextResponse.json(ultimateFallbackData, { status: 200 });
    
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
