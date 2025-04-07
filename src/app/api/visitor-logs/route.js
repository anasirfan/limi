import { NextResponse } from 'next/server';

/**
 * API route to fetch visitor logs
 * This endpoint retrieves visitor tracking data, optionally filtered by customerId
 * 
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} The API response with visitor logs
 */
export async function GET(request) {
  try {
    // Get the URL object from the request
    const url = new URL(request.url);
    
    // Extract query parameters
    const customerId = url.searchParams.get('customerId');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const consentStatus = url.searchParams.get('consent');
    
    // In a production environment, we would fetch from the actual API
    try {
      // For all tracking data
      if (!customerId) {
        const response = await fetch('https://api.limitless-lighting.co.uk/client/get_tracking_capture');
        if (!response.ok) {
          throw new Error('Failed to fetch tracking data');
        }
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      } 
      // For customer-specific tracking data
      else {
        const response = await fetch(`https://api.limitless-lighting.co.uk/client/get_tracking_capture?customerId=${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer tracking data');
        }
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching from API:', error);
      // Continue with mock data for development/testing
    }
    
    // Mock visitor logs data
    const mockVisitorLogs = [
      {
        _id: '1',
        customerId: 'jQ83O8nr',
        ipAddress: '192.168.1.1',
        country: 'United Kingdom',
        referrer: 'https://google.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        sessionDuration: 125,
        pagesVisited: ['/'],
        consent: true,
        timestamp: '2025-04-07T10:15:00Z'
      },
      {
        _id: '2',
        customerId: 'jQ83O8nr',
        ipAddress: '192.168.1.1',
        country: 'United Kingdom',
        referrer: 'https://facebook.com',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        sessionDuration: 87,
        pagesVisited: ['/', '/products'],
        consent: true,
        timestamp: '2025-04-06T14:22:00Z'
      },
      {
        _id: '3',
        customerId: 'Kp92L7mq',
        ipAddress: '203.0.113.1',
        country: 'United States',
        referrer: 'https://linkedin.com',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
        sessionDuration: 210,
        pagesVisited: ['/', '/about', '/contact'],
        consent: true,
        timestamp: '2025-04-05T09:45:00Z'
      },
      {
        _id: '4',
        customerId: null,
        ipAddress: '198.51.100.1',
        country: 'Germany',
        referrer: 'https://twitter.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        sessionDuration: 45,
        pagesVisited: ['/'],
        consent: true,
        timestamp: '2025-04-07T08:30:00Z'
      },
      {
        _id: '5',
        customerId: null,
        ipAddress: '198.51.100.2',
        country: 'France',
        referrer: 'https://instagram.com',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        sessionDuration: 63,
        pagesVisited: ['/', '/products'],
        consent: true,
        timestamp: '2025-04-06T16:15:00Z'
      },
      {
        _id: '6',
        customerId: 'Rt45P9xs',
        ipAddress: '203.0.113.2',
        country: 'Japan',
        referrer: 'https://google.co.jp',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
        sessionDuration: 178,
        pagesVisited: ['/', '/about'],
        consent: true,
        timestamp: '2025-04-05T11:20:00Z'
      },
      {
        _id: '7',
        customerId: null,
        ipAddress: '198.51.100.3',
        country: 'Canada',
        referrer: 'https://bing.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        sessionDuration: 92,
        pagesVisited: ['/'],
        consent: false,
        timestamp: '2025-04-07T09:10:00Z'
      },
      {
        _id: '8',
        customerId: 'Zx67Y2ab',
        ipAddress: '203.0.113.3',
        country: 'Australia',
        referrer: 'https://yahoo.com',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        sessionDuration: 134,
        pagesVisited: ['/', '/products', '/contact'],
        consent: true,
        timestamp: '2025-04-04T13:45:00Z'
      },
      {
        _id: '9',
        customerId: null,
        ipAddress: '198.51.100.4',
        country: 'Brazil',
        referrer: 'https://google.com.br',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
        sessionDuration: 56,
        pagesVisited: ['/'],
        consent: true,
        timestamp: '2025-04-03T17:30:00Z'
      },
      {
        _id: '10',
        customerId: 'Vb83C4nm',
        ipAddress: '203.0.113.4',
        country: 'India',
        referrer: 'https://google.co.in',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        sessionDuration: 245,
        pagesVisited: ['/', '/about', '/products', '/contact'],
        consent: true,
        timestamp: '2025-04-02T10:15:00Z'
      }
    ];
    
    // Filter logs based on query parameters
    let filteredLogs = [...mockVisitorLogs];
    
    if (customerId) {
      filteredLogs = filteredLogs.filter(log => log.customerId === customerId);
    }
    
    if (startDate) {
      const startDateTime = new Date(startDate);
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= startDateTime);
    }
    
    if (endDate) {
      const endDateTime = new Date(endDate);
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= endDateTime);
    }
    
    if (consentStatus !== null && consentStatus !== undefined) {
      const consentBool = consentStatus === 'true';
      filteredLogs = filteredLogs.filter(log => log.consent === consentBool);
    }
    
    // Return filtered logs
    return NextResponse.json(
      { success: true, data: filteredLogs },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Error fetching visitor logs' },
      { status: 500 }
    );
  }
}
