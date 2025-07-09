import { NextResponse } from 'next/server';

/**
 * API route to proxy IP information requests to avoid CORS issues
 * This endpoint fetches IP and country information from multiple public APIs
 * and combines the results for better accuracy
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response with IP information
 */
export async function GET(request) {
  try {
    // Get client IP from request headers if available
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'Unknown';
    

    
    // Create an object to store combined data from multiple sources
    let combinedData = {
      ip: clientIp,
      sources: []
    };
    
    // Try to fetch from ipapi.co using the client's IP address
    try {
      // Use the client's IP address when making the request to ipapi.co
      const response = await fetch(`https://ipapi.co/${clientIp}/json`, { 
        cache: 'no-store',
        headers: {
          'User-Agent': 'LIMI-Lighting-App/1.0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        combinedData = { ...combinedData, ...data, sources: [...combinedData.sources, 'ipapi.co'] };
      }
    } catch (error) {
    }
    
    // Also try ipinfo.io for validation
    try {
      const response = await fetch(`https://ipinfo.io/${clientIp}/json`, {
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();        
        // If we don't have data from the primary source, use this data
        if (combinedData.sources.length === 0) {
          combinedData = { 
            ...combinedData, 
            ...data,
            // Map ipinfo.io fields to match our expected format
            country_name: data.country,
            region: data.region,
            city: data.city,
            postal: data.postal,
            timezone: data.timezone,
            org: data.org,
            sources: [...combinedData.sources, 'ipinfo.io']
          };
        } else {
          // Otherwise just add the source
          combinedData.sources.push('ipinfo.io');
          // Add validation info
          combinedData.validation = {
            ipinfo_country: data.country,
            ipinfo_region: data.region,
            ipinfo_city: data.city
          };
        }
      }
    } catch (error) {
      console.error('Secondary IP API failed:', error);
    }
    
    // Add a validation URL for manual checking
    combinedData.validationUrls = {
      ipapi: `https://ipapi.co/${clientIp}/json/`,
      ipinfo: `https://ipinfo.io/${clientIp}/json`,
      iplocation: `https://iplocation.com/ip/${clientIp}`
    };
    
    return NextResponse.json(combinedData, { status: 200 });
    
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
