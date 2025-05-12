'use client';

import React, { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaEye, FaTimes, FaFilter, FaChartLine, FaGlobe, FaClock, FaDesktop, FaTabletAlt, FaMobileAlt, FaUsers, FaBoxOpen, FaShoppingCart, FaBox, FaSlideshare } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import ProductManagement from './ProductManagement';
import SlideManagement from './SlideManagement';

export default function CustomerDashboard({ token }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterStaff, setFilterStaff] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [staffNames, setStaffNames] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [customerSessions, setCustomerSessions] = useState([]);
  const [visitorLogsLoading, setVisitorLogsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [consentFilter, setConsentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const [logSortField, setLogSortField] = useState('timestamp');
  const [logSortDirection, setLogSortDirection] = useState('desc'); // Default to descending (newest first)
  
  // Mobile traffic tab state
  const [mobileUsers, setMobileUsers] = useState([]);
  const [mobileUsersLoading, setMobileUsersLoading] = useState(false);
  const [emailFilter, setEmailFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('');
  const [mobileUserSortField, setMobileUserSortField] = useState('createdAt');
  const [mobileUserSortDirection, setMobileUserSortDirection] = useState('desc');
  const [mobileCurrentPage, setMobileCurrentPage] = useState(1);
  const [mobileUsersPerPage, setMobileUsersPerPage] = useState(10);

  // Format time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(2);
    return minutes + 'm ' + remainingSeconds + 's';
  };



  // Get device type from user agent
  const getDeviceType = (userAgent) => {
    if (!userAgent) return 'Unknown';
    
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      if (userAgent.match(/tablet|ipad|playbook|silk/i)) {
        return 'Tablet';
      }
      return 'Mobile';
    }
    return 'Desktop';
  };

  // Get device icon based on device type
  const getDeviceIcon = (userAgent) => {
    const deviceType = getDeviceType(userAgent);
    switch (deviceType) {
      case 'Mobile':
        return <FaMobileAlt className="text-blue-400" />;
      case 'Tablet':
        return <FaTabletAlt className="text-green-400" />;
      default:
        return <FaDesktop className="text-purple-400" />;
    }
  };

  // Fetch visitor logs
  const fetchVisitorLogs = async () => {
    try {
      setVisitorLogsLoading(true);
      
      // Prepare query parameters
      const params = new URLSearchParams();
      
      if (dateFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        params.append('startDate', today.toISOString());
      } else if (dateFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        params.append('startDate', weekAgo.toISOString());
      } else if (dateFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        params.append('startDate', monthAgo.toISOString());
      }
      
      if (userTypeFilter === 'known') {
        params.append('hasCustomerId', 'true');
      } else if (userTypeFilter === 'unknown') {
        params.append('hasCustomerId', 'false');
      }
      
      if (consentFilter !== 'all') {
        params.append('consent', consentFilter === 'consented' ? 'true' : 'false');
      }
      
      // Fetch visitor logs from API
      const response = await fetch(`/api/visitor-logs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch visitor logs');
      }
      
      const data = await response.json();
      
      // Check if data has the expected structure
      let visitorData = [];
      if (data && Array.isArray(data)) {
        visitorData = data;
      } else if (data && data.success && Array.isArray(data.data)) {
        visitorData = data.data;
      } else {
        console.warn('Unexpected data structure:', data);
        visitorData = [];
      }
      
      // Sort the data by createdAt (most recent first)
      const sortedData = visitorData.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Default sort by most recent
      });
      
      setVisitorLogs(sortedData);
      setVisitorLogsLoading(false);
    } catch (error) {
      console.error('Error fetching visitor logs:', error);
      setVisitorLogsLoading(false);
    }
  };

  // Fetch customer sessions when a customer is selected
  const fetchCustomerSessions = async (customerId) => {
    try {
      // Using the correct API endpoint for customer-specific tracking data
      const response = await fetch(`/api/visitor-logs?customerId=${customerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer sessions');
      }
      
      const data = await response.json();
      
      // Handle different possible response structures
      let sessionData = [];
      if (data && Array.isArray(data)) {
        sessionData = data;
      } else if (data && data.success && Array.isArray(data.data)) {
        sessionData = data.data;
      } else if (data && data.sessions && Array.isArray(data.sessions)) {
        sessionData = data.sessions;
      } else {
        console.warn('Unexpected session data structure:', data);
        sessionData = [];
      }
      
      // Sort sessions by createdAt (most recent first)
      const sortedSessions = sessionData.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      setCustomerSessions(sortedSessions);
    } catch (error) {
      console.error('Error fetching customer sessions:', error);
      setCustomerSessions([]);
    }
  };

  // Fetch mobile users data
  const fetchMobileUsers = async () => {
    try {
      setMobileUsersLoading(true);
      
      let mobileUserData = [];
      let useRealData = false;
      
      // Try to fetch from the actual API endpoint
      try {
        const response = await fetch('https://api.limitless-lighting.co.uk/client/get_user_capture', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data && data.success && Array.isArray(data.data)) {
            mobileUserData = data.data;
            useRealData = true;
          }
        }
      } catch (error) {
        console.error('Error fetching mobile users from API:', error);
        // Will fall back to mock data
      }
      
      // If API call failed or returned invalid data, use mock data
      if (!useRealData) {
        console.log('Using mock mobile user data');
        // Mock data that matches the expected structure
        mobileUserData = [
          {
            "_id": "67f1287a97b32049b7120482",
            "email": "s.ahmed@terralumen.co.uk",
            "ip": "5.133.46.139",
            "region": "Carlisle, GB",
            "otp": null,
            "otp_expire_at": null,
            "installer_expire_at": null,
            "roles": "user",
            "members": ["John Smith", "Sarah Wilson"],
            "createdAt": "2025-04-05T12:56:26.962Z",
            "updatedAt": "2025-04-08T05:02:12.814Z",
            "__v": 0,
            "username": "user_q4qlm6pi"
          },
          {
            "_id": "67f1287a97b32049b7120483",
            "email": "m.jones@designlight.com",
            "ip": "82.45.128.33",
            "region": "London, GB",
            "otp": null,
            "otp_expire_at": null,
            "installer_expire_at": "2025-05-08T00:00:00.000Z",
            "roles": "installer",
            "members": ["Mike Jones", "Emma Clark"],
            "createdAt": "2025-04-04T09:23:15.123Z",
            "updatedAt": "2025-04-07T14:35:22.456Z",
            "__v": 0,
            "username": "installer_m9k2l5"
          },
          {
            "_id": "67f1287a97b32049b7120484",
            "email": "p.zhang@lightingpro.com",
            "ip": "203.112.45.78",
            "region": "Shanghai, CN",
            "otp": null,
            "otp_expire_at": null,
            "installer_expire_at": null,
            "roles": "production",
            "members": ["Peter Zhang", "Li Wei", "Chen Min"],
            "createdAt": "2025-04-03T16:42:38.789Z",
            "updatedAt": "2025-04-06T11:18:45.321Z",
            "__v": 0,
            "username": "prod_p7z3x9"
          },
          {
            "_id": "67f1287a97b32049b7120485",
            "email": "a.mueller@lichtdesign.de",
            "ip": "91.45.123.67",
            "region": "Berlin, DE",
            "otp": null,
            "otp_expire_at": null,
            "installer_expire_at": null,
            "roles": "user",
            "members": ["Andreas Mueller"],
            "createdAt": "2025-04-02T08:15:42.654Z",
            "updatedAt": "2025-04-05T19:27:33.987Z",
            "__v": 0,
            "username": "user_a8m4d2"
          },
          {
            "_id": "67f1287a97b32049b7120486",
            "email": "r.patel@illumina.in",
            "ip": "103.78.45.132",
            "region": "Mumbai, IN",
            "otp": null,
            "otp_expire_at": null,
            "installer_expire_at": "2025-06-01T00:00:00.000Z",
            "roles": "installer",
            "members": ["Raj Patel", "Priya Singh", "Vikram Mehta"],
            "createdAt": "2025-04-01T11:34:56.789Z",
            "updatedAt": "2025-04-04T15:42:18.654Z",
            "__v": 0,
            "username": "installer_r5p9s3"
          }
        ];
      }
      
      // Set the mobile users data (either from API or mock data)
      setMobileUsers(mobileUserData);
      setMobileUsersLoading(false);
    } catch (error) {
      console.error('Error fetching mobile users:', error);
      setMobileUsersLoading(false);
    }
  };

  // Fetch visitor logs when tab changes or filters change
  useEffect(() => {
    if (activeTab === 'tracking') {
      fetchVisitorLogs();
    } else if (activeTab === 'mobile') {
      fetchMobileUsers();
    }
  }, [activeTab, dateFilter, userTypeFilter, consentFilter, roleFilter, emailFilter, usernameFilter, regionFilter]);

  // Fetch customers
  useEffect(() => {
    // Set default sort to descending order (newest first)
    setLogSortDirection('desc');
    setSortDirection('desc');
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        
        // Define mock data that matches the API structure
        const mockCustomers = [
          {
            _id: "67f18075ec8e21a0feb17b94",
            profileId: "jQ83O8nr",
            clientCompanyInfo: "Limi",
            staffName: "Asif",
            createdAt: "2025-04-05T19:11:49.786Z",
            updatedAt: "2025-04-05T19:11:49.786Z",
            itemCodes: ["Bala", "Front"],
            notes: "Ok great",
            profileUrl: "https://limilighting.co.uk/customer/jQ83O8nr",
            nfcData: "",
            images: {
              frontCardImage: {
                id: "limi-business-cards/uvmoodu3c8wkbvim4xm3",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880308/limi-business-cards/uvmoodu3c8wkbvim4xm3.jpg"
              },
              backCardImage: {
                id: "limi-business-cards/i6yj45phw6kx5d4onfcx",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880309/limi-business-cards/i6yj45phw6kx5d4onfcx.jpg"
              }
            }
          },
          {
            _id: "67f18075ec8e21a0feb17b95",
            profileId: "Kp92L7mq",
            clientCompanyInfo: "Modern Lighting Solutions",
            staffName: "Sarah",
            createdAt: "2025-04-04T14:22:31.786Z",
            updatedAt: "2025-04-04T14:22:31.786Z",
            itemCodes: ["LIMI-003", "LIMI-007"],
            notes: "Interested in residential solutions",
            profileUrl: "https://limilighting.co.uk/customer/Kp92L7mq",
            nfcData: "",
            images: {
              frontCardImage: {
                id: "limi-business-cards/front2",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880308/limi-business-cards/front2.jpg"
              },
              backCardImage: {
                id: "limi-business-cards/back2",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880309/limi-business-cards/back2.jpg"
              }
            }
          },
          {
            _id: "67f18075ec8e21a0feb17b96",
            profileId: "Rt45P9xs",
            clientCompanyInfo: "Hong Kong Interiors",
            staffName: "John",
            createdAt: "2025-04-03T09:45:12.786Z",
            updatedAt: "2025-04-03T09:45:12.786Z",
            itemCodes: ["LIMI-001", "LIMI-005", "LIMI-012"],
            notes: "Looking for commercial applications",
            profileUrl: "https://limilighting.co.uk/customer/Rt45P9xs",
            nfcData: "",
            images: {
              frontCardImage: {
                id: "limi-business-cards/front3",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880308/limi-business-cards/front1.jpg"
              },
              backCardImage: {
                id: "limi-business-cards/back3",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880309/limi-business-cards/back1.jpg"
              }
            }
          },
          {
            _id: "67f18075ec8e21a0feb17b97",
            profileId: "Zx67Y2ab",
            clientCompanyInfo: "Bright Spaces Design",
            staffName: "Asif",
            createdAt: "2025-04-02T16:33:27.786Z",
            updatedAt: "2025-04-02T16:33:27.786Z",
            itemCodes: ["LIMI-002", "LIMI-009"],
            notes: "Interested in modular lighting systems",
            profileUrl: "https://limilighting.co.uk/customer/Zx67Y2ab",
            nfcData: "",
            images: {
              frontCardImage: {
                id: "limi-business-cards/front4",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880308/limi-business-cards/front2.jpg"
              },
              backCardImage: {
                id: "limi-business-cards/back4",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880309/limi-business-cards/back2.jpg"
              }
            }
          },
          {
            _id: "67f18075ec8e21a0feb17b98",
            profileId: "Vb83C4nm",
            clientCompanyInfo: "Urban Design Co.",
            staffName: "Sarah",
            createdAt: "2025-04-01T11:18:42.786Z",
            updatedAt: "2025-04-01T11:18:42.786Z",
            itemCodes: ["LIMI-004", "LIMI-008", "LIMI-015"],
            notes: "Looking for smart lighting integration",
            profileUrl: "https://limilighting.co.uk/customer/Vb83C4nm",
            nfcData: "",
            images: {
              frontCardImage: {
                id: "limi-business-cards/front5",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880308/limi-business-cards/front1.jpg"
              },
              backCardImage: {
                id: "limi-business-cards/back5",
                url: "https://res.cloudinary.com/drwoekliw/image/upload/v1743880309/limi-business-cards/back1.jpg"
              }
            }
          }
        ];
        
        let useRealData = false;
        
        // Try to fetch from API first
        try {
          // In a real app, this would be an authenticated API call
          const response = await fetch('https://api.limitless-lighting.co.uk/client/get_customer_details/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // If API call is successful, use the real data
          if (response.ok) {
            const data = await response.json();
            
            if (data && data.success && Array.isArray(data.data)) {
              setCustomers(data.data);
              
              // Extract unique company names and staff names for filters
              const uniqueCompanies = [...new Set(data.data.map(customer => customer.clientCompanyInfo))].filter(Boolean);
              const uniqueStaffNames = [...new Set(data.data.map(customer => customer.staffName))].filter(Boolean);
              
              setCompanies(uniqueCompanies);
              setStaffNames(uniqueStaffNames);
              useRealData = true;
            }
          }
        } catch (error) {
          // console.log('Error fetching customer data:', error);
          // Will fall back to mock data
        }
        
        // If API call failed or returned invalid data, use mock data
        if (!useRealData) {
          // console.log('Using mock data instead.');
          setCustomers(mockCustomers);
          
          // Extract unique company names and staff names for filters
          const uniqueCompanies = [...new Set(mockCustomers.map(customer => customer.clientCompanyInfo))].filter(Boolean);
          const uniqueStaffNames = [...new Set(mockCustomers.map(customer => customer.staffName))].filter(Boolean);
          
          setCompanies(uniqueCompanies);
          setStaffNames(uniqueStaffNames);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to descending order for new sort field
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="ml-1 text-[#93cfa2]" /> : 
      <FaSortDown className="ml-1 text-[#93cfa2]" />;
  };
  
  // Handle sorting for mobile users
  const handleMobileUserSort = (field) => {
    if (mobileUserSortField === field) {
      setMobileUserSortDirection(mobileUserSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setMobileUserSortField(field);
      setMobileUserSortDirection('desc'); // Default to descending when changing fields
    }
  };
  
  // Filter mobile users based on search criteria
  const filteredMobileUsers = mobileUsers.filter(user => {
    // Apply email filter
    if (emailFilter && !user.email.toLowerCase().includes(emailFilter.toLowerCase())) {
      return false;
    }
    
    // Apply username filter
    if (usernameFilter && !user.username.toLowerCase().includes(usernameFilter.toLowerCase())) {
      return false;
    }
    
    // Apply role filter
    if (roleFilter !== 'all' && user.roles !== roleFilter) {
      return false;
    }
    
    // Apply region filter
    if (regionFilter && !user.region?.toLowerCase().includes(regionFilter.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort filtered mobile users
  const sortedMobileUsers = [...filteredMobileUsers].sort((a, b) => {
    let valueA = a[mobileUserSortField];
    let valueB = b[mobileUserSortField];
    
    // Handle special cases
    if (mobileUserSortField === 'createdAt' || mobileUserSortField === 'updatedAt') {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    } else if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    // Handle null/undefined values
    if (valueA === null || valueA === undefined) return 1;
    if (valueB === null || valueB === undefined) return -1;
    
    // Sort based on direction
    if (mobileUserSortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
  
  // Paginate mobile users
  const paginatedMobileUsers = sortedMobileUsers.slice(
    (mobileCurrentPage - 1) * mobileUsersPerPage,
    mobileCurrentPage * mobileUsersPerPage
  );

  // View customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    // Fetch customer sessions when viewing details
    if (customer && customer.profileId) {
      fetchCustomerSessions(customer.profileId);
    }
  };

  // Filter and sort customers
  const filteredAndSortedCustomers = customers
    .filter(customer => {
      // Apply search term filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (customer.clientCompanyInfo?.toLowerCase().includes(searchLower) || false) ||
        (customer.profileId?.toLowerCase().includes(searchLower) || false) ||
        (customer.staffName?.toLowerCase().includes(searchLower) || false) ||
        (customer.notes?.toLowerCase().includes(searchLower) || false) ||
        (customer.itemCodes?.some(code => code.toLowerCase().includes(searchLower)) || false);
      
      // Apply company filter
      const matchesCompany = !filterCompany || customer.clientCompanyInfo === filterCompany;
      
      // Apply staff filter
      const matchesStaff = !filterStaff || customer.staffName === filterStaff;
      
      return matchesSearch && matchesCompany && matchesStaff;
    })
    .sort((a, b) => {
      // Handle sorting based on field
      if (sortField === 'createdAt') {
        // Date sorting
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // Text sorting
        if (!a[sortField]) return 1;
        if (!b[sortField]) return -1;
        
        const comparison = String(a[sortField]).localeCompare(String(b[sortField]));
        return sortDirection === 'asc' ? comparison : -comparison;
      }
    });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterCompany('');
    setFilterStaff('');
  };

  // Calculate analytics metrics
  const calculateAnalytics = () => {
    if (!visitorLogs || visitorLogs.length === 0) return {};
    
    // Total visits
    const totalVisits = visitorLogs.length;
    
    // Unique customers
    const uniqueCustomerIds = new Set();
    visitorLogs.forEach(log => {
      if (log.customerId) {
        uniqueCustomerIds.add(log.customerId);
      }
    });
    const uniqueCustomers = uniqueCustomerIds.size;
    
    // Average session duration - improved calculation
    let totalDuration = 0;
    let validSessionsCount = 0;
    
    visitorLogs.forEach(log => {
      // Only count sessions with valid duration
      if (log.sessionDuration && log.sessionDuration > 0) {
        totalDuration += log.sessionDuration;
        validSessionsCount++;
      }
    });
    
    // Calculate average only from valid sessions
    const avgDuration = validSessionsCount > 0 ? 
      parseFloat((totalDuration / validSessionsCount).toFixed(2)) : 0;
    
    // Consent percentage
    const consentedLogs = visitorLogs.filter(log => log.consent);
    const consentPercentage = (consentedLogs.length / totalVisits) * 100;
    
    // Known vs unknown users
    const knownUsers = visitorLogs.filter(log => log.customerId).length;
    const unknownUsers = totalVisits - knownUsers;
    
    // Sessions over time (daily)
    const sessionsByDate = {};
    visitorLogs.forEach(log => {
      // Use createdAt if timestamp is not available or invalid
      const timestamp = log.timestamp || log.createdAt;
      
      // Ensure we have a valid date before proceeding
      if (timestamp) {
        try {
          // Format date as YYYY-MM-DD to ensure consistent parsing
          const dateObj = new Date(timestamp);
          if (!isNaN(dateObj.getTime())) {
            const dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
            if (!sessionsByDate[dateStr]) {
              sessionsByDate[dateStr] = 0;
            }
            sessionsByDate[dateStr]++;
          }
        } catch (e) {
          console.error('Error parsing date:', timestamp, e);
        }
      }
    });
    
    const sessionsOverTime = Object.keys(sessionsByDate).map(date => ({
      date,
      sessions: sessionsByDate[date]
    }));
    
    // Sort by date
    sessionsOverTime.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      totalVisits,
      uniqueCustomers,
      avgDuration,
      consentPercentage,
      knownUsers,
      unknownUsers,
      sessionsOverTime
    };
  };
  
  const analytics = calculateAnalytics();
  
  // Prepare data for pie chart
  const userTypePieData = [
    { name: 'Known Users', value: analytics.knownUsers || 0 },
    { name: 'Unknown Users', value: analytics.unknownUsers || 0 }
  ];
  
  const COLORS = ['#54bb74', '#8884d8'];

  return (
    <div>

      {/* Dashboard Navigation */}
      <div className="bg-[#292929] p-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'customers' ? 'bg-[#54BB74] text-[#1e1e1e] font-medium' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
        >
          <FaUsers className="mr-2" />
          Customers
        </button>
        
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'analytics' ? 'bg-[#54BB74] text-[#1e1e1e] font-medium' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
        >
          <FaChartLine className="mr-2" />
          Analytics
        </button>
        
        <button
          onClick={() => setActiveTab('tracking')}
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'tracking' ? 'bg-[#54BB74] text-[#1e1e1e] font-medium' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
        >
          <FaGlobe className="mr-2" />
          Visitor Tracking
        </button>
        
        <button
          onClick={() => setActiveTab('mobile')}
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'mobile' ? 'bg-[#54BB74] text-[#1e1e1e] font-medium' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
        >
          <FaMobileAlt className="mr-2" />
          Mobile Users
        </button>

        <button
          onClick={() => setActiveTab('productManagement')}
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'productManagement' ? 'bg-[#54BB74] text-[#1e1e1e] font-medium' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
        >
          <FaBox className="mr-2" />
          Product Management
        </button>

        <button
          onClick={() => setActiveTab('slideshow')}
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'slideshow' ? 'bg-[#54BB74] text-[#1e1e1e] font-medium' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
        >
          <FaSlideshare className="mr-2" />
          Slideshow
        </button>
      </div>

      {activeTab === 'tracking' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Date Range</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">User Type</label>
                <select
                  value={userTypeFilter}
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All Users</option>
                  <option value="known">Known Users</option>
                  <option value="unknown">Unknown Users</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Consent Status</label>
                <select
                  value={consentFilter}
                  onChange={(e) => setConsentFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All</option>
                  <option value="granted">Consent Granted</option>
                  <option value="denied">Consent Denied</option>
                </select>
              </div>
            </div>
          </div>
          
          {visitorLogsLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 border-t-4 border-[#54BB74] border-solid rounded-full animate-spin mb-6"></div>
              <p className="text-gray-300">Loading visitor data...</p>
            </div>
          ) : visitorLogs.length === 0 ? (
            <div className="bg-[#1e1e1e] p-6 rounded-lg text-center">
              <p className="text-gray-300">No visitor data found matching your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Visits Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#54BB74] text-lg font-semibold mb-2">Total Visits</h3>
                  <p className="text-white text-3xl font-bold">{analytics.totalVisits}</p>
                </div>
                
                {/* Unique Customers Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#54BB74] text-lg font-semibold mb-2">Unique Customers</h3>
                  <p className="text-white text-3xl font-bold">{analytics.uniqueCustomers}</p>
                </div>
                
                {/* Avg Session Duration Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#54BB74] text-lg font-semibold mb-2">Avg. Session Duration</h3>
                  <p className="text-white text-3xl font-bold">{formatTime(analytics.avgDuration || 0)}</p>
                </div>
                
                {/* Consent Percentage Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#54BB74] text-lg font-semibold mb-2">Consent Rate</h3>
                  <p className="text-white text-3xl font-bold">{analytics.consentPercentage?.toFixed(1)}%</p>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* User Type Pie Chart */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#54BB74] text-lg font-semibold mb-4">Known vs Unknown Users</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userTypePieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {userTypePieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Visitors']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Sessions Over Time Line Chart */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#54BB74] text-lg font-semibold mb-4">Sessions Over Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={analytics.sessionsOverTime}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sessions"
                          name="Sessions"
                          stroke="#54BB74"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Visitor Logs Table */}
              <div className="overflow-x-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <h3 className="text-[#54BB74] text-lg font-semibold">Recent Visitor Logs</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-gray-300 text-sm">Sort by:</label>
                      <select
                        value={logSortField}
                        onChange={(e) => {
                          setLogSortField(e.target.value);
                          // Sort the visitor logs
                          const field = e.target.value;
                          const sorted = [...visitorLogs].sort((a, b) => {
                            if (field === 'timestamp') {
                              const dateA = new Date(a.createdAt || 0);
                              const dateB = new Date(b.createdAt || 0);
                              return logSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
                            } else if (field === 'duration') {
                              const durationA = a.sessionDuration || 0;
                              const durationB = b.sessionDuration || 0;
                              return logSortDirection === 'asc' ? durationA - durationB : durationB - durationA;
                            } else if (field === 'pages') {
                              const pagesA = (a.pagesVisited || []).length;
                              const pagesB = (b.pagesVisited || []).length;
                              return logSortDirection === 'asc' ? pagesA - pagesB : pagesB - pagesA;
                            }
                            return 0;
                          });
                          setVisitorLogs(sorted);
                        }}
                        className="bg-[#292929] text-white px-2 py-1 rounded-md text-sm"
                      >
                        <option value="timestamp">Time</option>
                        <option value="duration">Duration</option>
                        <option value="pages">Pages</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <table className="w-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                  <thead className="bg-[#292929]">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-300">Timestamp</th>
                      <th className="px-4 py-3 text-left text-gray-300">Customer ID</th>
                      <th className="px-4 py-3 text-left text-gray-300">IP & Location</th>
                      <th className="px-4 py-3 text-left text-gray-300">Referrer</th>
                      <th className="px-4 py-3 text-left text-gray-300">Device</th>
                      <th className="px-4 py-3 text-left text-gray-300">Duration</th>
                      <th className="px-4 py-3 text-left text-gray-300">Pages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitorLogs.slice(0, 10).map((log, index) => (
                      <tr 
                        key={log._id || index} 
                        className={index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#292929]/50'}
                      >
                        <td className="px-4 py-3 text-gray-300">
                          {new Date(log.createdAt || log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          {log.customerId ? (
                            <span className="text-[#54BB74]">{log.customerId}</span>
                          ) : (
                            <span className="text-gray-500 italic">Anonymous</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          <div className="flex items-center gap-1">
                            <FaGlobe className="text-[#87CEAB] text-xs" />
                            <span>{log.ipAddress}</span>
                            {log.country && (
                              <>
                                <span className="text-gray-500">|</span>
                                <span>{log.country}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300 max-w-[150px] truncate">
                          {log.referrer || 'Direct'}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          <div className="flex items-center">
                            {getDeviceIcon(log.userAgent)}
                            <span className="ml-2">{getDeviceType(log.userAgent)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {formatTime(log.sessionDuration || 0)}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {log.pagesVisited && log.pagesVisited.length > 0 ? (
                            <span>
                              {log.pagesVisited.length} {log.pagesVisited.length === 1 ? 'page' : 'pages'}
                            </span>
                          ) : (
                            <span className="text-gray-500 italic">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
      
      {activeTab === 'mobile' && (
        <div className="space-y-6">
          {/* Mobile Traffic Filters */}
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Mobile User Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    placeholder="Filter by email..."
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={usernameFilter}
                    onChange={(e) => setUsernameFilter(e.target.value)}
                    placeholder="Filter by username..."
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="installer">Installer</option>
                  <option value="production">Production</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Region</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    placeholder="Filter by region..."
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {mobileUsersLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
              <p className="text-gray-300">Loading mobile user data...</p>
            </div>
          ) : mobileUsers.length === 0 ? (
            <div className="bg-[#1e1e1e] p-6 rounded-lg text-center">
              <p className="text-gray-300">No mobile users found matching your filters</p>
            </div>
          ) : (
            <>
              {/* Mobile Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Users Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Total Mobile Users</h3>
                  <p className="text-white text-3xl font-bold">{mobileUsers.length}</p>
                </div>
                
                {/* Users by Role Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Users by Role</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">User: <span className="text-white font-bold">{mobileUsers.filter(u => u.roles === 'user').length}</span></p>
                      <p className="text-gray-400 text-sm">Installer: <span className="text-white font-bold">{mobileUsers.filter(u => u.roles === 'installer').length}</span></p>
                      <p className="text-gray-400 text-sm">Production: <span className="text-white font-bold">{mobileUsers.filter(u => u.roles === 'production').length}</span></p>
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center">
                      <FaUsers className="text-[#93cfa2] text-3xl" />
                    </div>
                  </div>
                </div>
                
                {/* Regions Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Top Regions</h3>
                  <div>
                    {Array.from(new Set(mobileUsers.map(u => u.region?.split(',')[0]))).slice(0, 3).map((region, idx) => (
                      <p key={idx} className="text-gray-400 text-sm">{region}: <span className="text-white font-bold">{mobileUsers.filter(u => u.region?.includes(region)).length}</span></p>
                    ))}
                  </div>
                </div>
                
                {/* Last Registration Card */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Latest Registration</h3>
                  <p className="text-white text-lg font-bold">
                    {new Date(Math.max(...mobileUsers.map(u => new Date(u.createdAt).getTime()))).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(Math.max(...mobileUsers.map(u => new Date(u.createdAt).getTime()))).toLocaleTimeString('en-GB')}
                  </p>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* User Roles Pie Chart */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#93cfa2] text-lg font-semibold mb-4">User Roles Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'User', value: mobileUsers.filter(u => u.roles === 'user').length },
                            { name: 'Installer', value: mobileUsers.filter(u => u.roles === 'installer').length },
                            { name: 'Production', value: mobileUsers.filter(u => u.roles === 'production').length }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#54bb74" /> {/* User */}
                          <Cell fill="#5d8fdb" /> {/* Installer */}
                          <Cell fill="#e6a23c" /> {/* Production */}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Users']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Registrations Over Time */}
                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                  <h3 className="text-[#93cfa2] text-lg font-semibold mb-4">Registrations Over Time</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={mobileUsers
                          .map(user => ({ date: new Date(user.createdAt).toLocaleDateString('en-GB'), timestamp: new Date(user.createdAt).getTime() }))
                          .sort((a, b) => a.timestamp - b.timestamp)
                          .reduce((acc, curr) => {
                            const existingEntry = acc.find(item => item.date === curr.date);
                            if (existingEntry) {
                              existingEntry.count += 1;
                            } else {
                              acc.push({ date: curr.date, count: 1 });
                            }
                            return acc;
                          }, [])
                        }
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" name="Registrations" stroke="#54bb74" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Mobile Users Table */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#93cfa2] text-lg font-semibold">Mobile Users</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">
                      Showing {Math.min(mobileCurrentPage * mobileUsersPerPage, filteredMobileUsers.length)} of {filteredMobileUsers.length}
                    </span>
                  </div>
                </div>
                
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleMobileUserSort('email')}
                      >
                        Email
                        {mobileUserSortField === 'email' && (
                          mobileUserSortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleMobileUserSort('username')}
                      >
                        Username
                        {mobileUserSortField === 'username' && (
                          mobileUserSortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleMobileUserSort('roles')}
                      >
                        Role
                        {mobileUserSortField === 'roles' && (
                          mobileUserSortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleMobileUserSort('region')}
                      >
                        Region
                        {mobileUserSortField === 'region' && (
                          mobileUserSortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleMobileUserSort('ip')}
                      >
                        IP Address
                        {mobileUserSortField === 'ip' && (
                          mobileUserSortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                        )}
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleMobileUserSort('createdAt')}
                      >
                        Created At
                        {mobileUserSortField === 'createdAt' && (
                          mobileUserSortDirection === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
                        )}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Members
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#292929] divide-y divide-gray-700">
                    {paginatedMobileUsers.map((user, index) => (
                      <tr key={user._id} className={index % 2 === 0 ? 'bg-[#292929]' : 'bg-[#333333]'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.roles === 'user' ? 'bg-green-900 text-green-200' : 
                            user.roles === 'installer' ? 'bg-blue-900 text-blue-200' : 
                            'bg-yellow-900 text-yellow-200'
                          }`}>
                            {user.roles}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.region}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {user.members && user.members.length > 0 ? (
                            <div className="flex flex-col">
                              {user.members.map((member, idx) => (
                                <span key={idx} className="text-gray-300">{member}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No members</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                {filteredMobileUsers.length > mobileUsersPerPage && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setMobileCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={mobileCurrentPage === 1}
                      className={`px-4 py-2 rounded-md ${mobileCurrentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-[#333333] text-white hover:bg-[#444444]'}`}
                    >
                      Previous
                    </button>
                    
                    <span className="text-gray-400">
                      Page {mobileCurrentPage} of {Math.ceil(filteredMobileUsers.length / mobileUsersPerPage)}
                    </span>
                    
                    <button
                      onClick={() => setMobileCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredMobileUsers.length / mobileUsersPerPage)))}
                      disabled={mobileCurrentPage >= Math.ceil(filteredMobileUsers.length / mobileUsersPerPage)}
                      className={`px-4 py-2 rounded-md ${
                        mobileCurrentPage >= Math.ceil(filteredMobileUsers.length / mobileUsersPerPage) 
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                          : 'bg-[#333333] text-white hover:bg-[#444444]'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      
      {activeTab === 'products' && (
        <ProductManagement token={token} />
      )}
      
      {/* Slideshow Tab */}
      {activeTab === 'slideshow' && (
        <div className="mt-6">
          <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-[Amenti] text-[#93cfa2] mb-4">Customer Slideshow Management</h2>
            <p className="text-gray-300 mb-4">Select a customer to manage their slideshow presentation.</p>
            
            <div className="max-w-md">
              <label className="block text-gray-400 mb-2">Select Customer</label>
              <select
                className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                onChange={(e) => {
                  const selectedCustomer = customers.find(c => c.profileId === e.target.value);
                  setSelectedCustomer(selectedCustomer);
                }}
                value={selectedCustomer?.profileId || ''}
              >
                <option value="">-- Select a customer --</option>
                {customers.map(customer => (
                  <option key={customer.profileId} value={customer.profileId}>
                    {customer.clientCompanyInfo} ({customer.profileId})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {selectedCustomer ? (
            <SlideManagement customer={selectedCustomer} />
          ) : (
            <div className="bg-[#1e1e1e] p-6 rounded-lg text-center">
              <p className="text-gray-300">Please select a customer to manage their slideshow</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'customers' && (
        <>
        {/* Search and filters */}
        <div className="mb-6 bg-[#1e1e1e] p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="bg-[#292929] text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#292929] hover:bg-[#333333] text-white px-4 py-2 rounded-md transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
              {(filterCompany || filterStaff) && (
                <span className="bg-[#54bb74] text-[#292929] text-xs px-2 py-0.5 rounded-full">
                  {(filterCompany ? 1 : 0) + (filterStaff ? 1 : 0)}
                </span>
              )}
            </button>
            
            {(filterCompany || filterStaff || searchTerm) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors"
              >
                <FaTimes />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Advanced filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyFilter" className="block text-gray-400 mb-2">
                Filter by Company
              </label>
              <select
                id="companyFilter"
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
              >
                <option value="">All Companies</option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="staffFilter" className="block text-gray-400 mb-2">
                Filter by Staff
              </label>
              <select
                id="staffFilter"
                value={filterStaff}
                onChange={(e) => setFilterStaff(e.target.value)}
                className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
              >
                <option value="">All Staff</option>
                {staffNames.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Customer table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
          <p className="text-gray-300">Loading customer data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 p-6 rounded-lg text-center">
          <p className="text-red-400 mb-2">Error loading customer data</p>
          <p className="text-gray-300">{error}</p>
        </div>
      ) : filteredAndSortedCustomers.length === 0 ? (
        <div className="bg-[#1e1e1e] p-6 rounded-lg text-center">
          <p className="text-gray-300">No customers found matching your filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#1e1e1e] rounded-lg overflow-hidden">
            <thead className="bg-[#292929]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button 
                    onClick={() => handleSort('profileId')}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    ID {getSortIcon('profileId')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    onClick={() => handleSort('clientCompanyInfo')}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    Company {getSortIcon('clientCompanyInfo')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    onClick={() => handleSort('staffName')}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    Registered By {getSortIcon('staffName')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    Date {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCustomers.map((customer, index) => (
                <tr 
                  key={customer._id} 
                  className={`border-t border-[#333333] hover:bg-[#292929]/50 ${
                    index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#252525]'
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-sm text-gray-300">
                    {customer.profileId}
                  </td>
                  <td className="px-4 py-3 text-[#93cfa2]">
                    {customer.clientCompanyInfo}
                  </td>
                  <td className="px-4 py-3">
                    {customer.staffName}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => viewCustomerDetails(customer)}
                      className="bg-[#54bb74] hover:bg-[#93cfa2] text-[#292929] px-3 py-1 rounded-md inline-flex items-center space-x-1"
                    >
                      <FaEye />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer details modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center max-sm:mt-12 z-50 p-4 overflow-y-auto pt-16 md:pt-4">
          <div className="bg-[#1e1e1e] rounded-lg w-full max-w-3xl max-h-[85vh] overflow-y-auto mt-10 md:mt-0">
            <div className="sticky top-0 bg-[#1e1e1e] p-4 border-b border-[#333333] flex justify-between items-center">
              <h3 className="text-xl font-[Amenti] text-[#93cfa2]">
                Customer Details: {selectedCustomer.clientCompanyInfo}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Customer info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#93cfa2] mb-3">Customer Information</h4>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="text-gray-400">ID:</span> {selectedCustomer.profileId}</p>
                    <p><span className="text-gray-400">Company:</span> {selectedCustomer.clientCompanyInfo}</p>
                    <p><span className="text-gray-400">Registered by:</span> {selectedCustomer.staffName}</p>
                    <p><span className="text-gray-400">Date:</span> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
                    <p><span className="text-gray-400">Time:</span> {new Date(selectedCustomer.createdAt).toLocaleTimeString()}</p>
                    {selectedCustomer.itemCodes && selectedCustomer.itemCodes.length > 0 && (
                      <div>
                        <span className="text-gray-400">Products:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedCustomer.itemCodes.map((code, index) => (
                            <span key={index} className="bg-[#54bb74]/20 text-[#93cfa2] text-xs px-2 py-1 rounded-full">
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedCustomer.notes && (
                      <div className="mt-3 bg-[#292929]/50 p-2 rounded">
                        <p className="text-gray-300 text-sm italic"><span className="text-gray-400">Notes:</span> {selectedCustomer.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-[#93cfa2] mb-3">Customer URL</h4>
                  <div className="bg-[#292929] p-3 rounded-md mb-4">
                    <p className="text-gray-300 break-all font-mono text-sm">
                      {`${window.location.origin}/customer/${selectedCustomer.profileId}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/customer/${selectedCustomer.profileId}`);
                      alert('URL copied to clipboard!');
                    }}
                    className="bg-[#54bb74] hover:bg-[#93cfa2] text-[#292929] px-4 py-2 rounded-md"
                  >
                    Copy Customer URL
                  </button>
                </div>
              </div>
              
              {/* Customer Website Sessions */}
              <h4 className="text-lg font-semibold text-[#93cfa2] mb-3">Customer Website Sessions</h4>
              <div className="bg-[#292929]/50 p-4 rounded-lg mb-6">
                {customerSessions.length === 0 ? (
                  <p className="text-gray-400 italic">No website sessions recorded for this customer</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#333333]">
                          <th className="px-3 py-2 text-left text-gray-400 text-sm">Timestamp</th>
                          <th className="px-3 py-2 text-left text-gray-400 text-sm">Duration</th>
                          <th className="px-3 py-2 text-left text-gray-400 text-sm">IP & Country</th>
                          <th className="px-3 py-2 text-left text-gray-400 text-sm">Referrer</th>
                          <th className="px-3 py-2 text-left text-gray-400 text-sm">Device</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerSessions.map((session, index) => (
                          <tr key={session._id} className={`border-b border-[#333333]/50 ${index % 2 === 0 ? 'bg-[#292929]/30' : 'bg-[#292929]/10'}`}>
                            <td className="px-3 py-2 text-gray-300 text-sm">
                              {new Date(session.timestamp).toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-gray-300 text-sm">
                              {formatTime(session.sessionDuration)}
                            </td>
                            <td className="px-3 py-2 text-gray-300 text-sm">
                              <div className="flex items-center gap-1">
                                <FaGlobe className="text-blue-400 text-xs" />
                                <span>{session.ipAddress}</span>
                                <span className="text-gray-500">|</span>
                                <span>{session.country}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-gray-300 text-sm max-w-[150px] truncate">
                              {session.referrer || 'Direct'}
                            </td>
                            <td className="px-3 py-2 text-gray-300 text-sm">
                              <div className="flex items-center gap-1">
                                {getDeviceIcon(session.userAgent)}
                                <span>{getDeviceType(session.userAgent)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Business card images */}
              <h4 className="text-lg font-semibold text-[#93cfa2] mb-3">Attached Images</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Front of Business Card */}
                <div className="bg-[#292929]/50 p-4 rounded-lg">
                  {/* <h5 className="text-md font-semibold text-[#93cfa2] mb-3">Front</h5> */}
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-lg shadow-lg">
                    {selectedCustomer.images?.frontCardImage?.url ? (
                      <Image 
                        src={selectedCustomer.images.frontCardImage.url} 
                        alt="Business Card Front" 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
                        <span>No image available</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Back of Business Card */}
                <div className="bg-[#292929]/50 p-4 rounded-lg">
                  {/* <h5 className="text-md font-semibold text-[#93cfa2] mb-3">Back</h5> */}
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-lg shadow-lg">
                    {selectedCustomer.images?.backCardImage?.url ? (
                      <Image 
                        src={selectedCustomer.images.backCardImage.url} 
                        alt="Business Card Back" 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
                        <span>No image available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results count */}
      <div className="mt-4 text-gray-400 text-sm">
        Showing {filteredAndSortedCustomers.length} of {customers.length} customers
      </div>
      </>
      )}

      {activeTab === 'traffic' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Date Range</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">User Type</label>
                <select
                  value={userTypeFilter}
                  onChange={(e) => setUserTypeFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All Users</option>
                  <option value="known">Known Users</option>
                  <option value="unknown">Unknown Users</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Consent Status</label>
                <select
                  value={consentFilter}
                  onChange={(e) => setConsentFilter(e.target.value)}
                  className="bg-[#292929] text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54bb74]"
                >
                  <option value="all">All</option>
                  <option value="granted">Consent Granted</option>
                  <option value="denied">Consent Denied</option>
                </select>
              </div>
            </div>
          </div>
          
          {visitorLogsLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
              <p className="text-gray-300">Loading visitor data...</p>
            </div>
          ) : visitorLogs.length === 0 ? (
            <div className="bg-[#1e1e1e] p-6 rounded-lg text-center">
              <p className="text-gray-300">No visitor data found matching your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Total Visits Card */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Total Visits</h3>
                <p className="text-white text-3xl font-bold">{analytics.totalVisits}</p>
              </div>
              
              {/* Unique Customers Card */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Unique Customers</h3>
                <p className="text-white text-3xl font-bold">{analytics.uniqueCustomers}</p>
              </div>
              
              {/* Avg Session Duration Card */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Avg. Session Duration</h3>
                <p className="text-white text-3xl font-bold">{formatTime(analytics.avgDuration || 0)}</p>
              </div>
              
              {/* Consent Percentage Card */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                <h3 className="text-[#93cfa2] text-lg font-semibold mb-2">Consent Rate</h3>
                <p className="text-white text-3xl font-bold">{analytics.consentPercentage?.toFixed(1)}%</p>
              </div>
            </div>
          )}
          
          {/* Charts */}
          {!visitorLogsLoading && visitorLogs.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* User Type Pie Chart */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                <h3 className="text-[#93cfa2] text-lg font-semibold mb-4">Known vs Unknown Users</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypePieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userTypePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Visitors']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Sessions Over Time Line Chart */}
              <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
                <h3 className="text-[#93cfa2] text-lg font-semibold mb-4">Sessions Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analytics.sessionsOverTime}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sessions"
                        name="Sessions"
                        stroke="#54bb74"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          
          {/* Visitor Logs Table */}
          {!visitorLogsLoading && visitorLogs.length > 0 && (
            <div className="overflow-x-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h3 className="text-[#93cfa2] text-lg font-semibold">Recent Visitor Logs</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-300 text-sm">Sort by:</label>
                    <select
                      value={logSortField}
                      onChange={(e) => {
                        setLogSortField(e.target.value);
                        // Sort the visitor logs
                        const field = e.target.value;
                        const sorted = [...visitorLogs].sort((a, b) => {
                          if (field === 'timestamp') {
                            const dateA = new Date(a.createdAt || 0);
                            const dateB = new Date(b.createdAt || 0);
                            return logSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
                          } else if (field === 'duration') {
                            const durationA = a.sessionDuration || 0;
                            const durationB = b.sessionDuration || 0;
                            return logSortDirection === 'asc' ? durationA - durationB : durationB - durationA;
                          } else if (field === 'pages') {
                            const pagesA = (a.pagesVisited || []).length;
                            const pagesB = (b.pagesVisited || []).length;
                            return logSortDirection === 'asc' ? pagesA - pagesB : pagesB - pagesA;
                          }
                          return 0;
                        });
                        setVisitorLogs(sorted);
                      }}
                      className="bg-[#292929] text-white px-2 py-1 rounded-md text-sm"
                    >
                      <option value="timestamp">Time</option>
                      <option value="duration">Duration</option>
                      <option value="pages">Pages</option>
                    </select>
                    <button
                      onClick={() => {
                        const newDirection = logSortDirection === 'asc' ? 'desc' : 'asc';
                        setLogSortDirection(newDirection);
                        // Re-sort with new direction
                        const sorted = [...visitorLogs].sort((a, b) => {
                          if (logSortField === 'timestamp') {
                            const dateA = new Date(a.createdAt || 0);
                            const dateB = new Date(b.createdAt || 0);
                            return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
                          } else if (logSortField === 'duration') {
                            const durationA = a.sessionDuration || 0;
                            const durationB = b.sessionDuration || 0;
                            return newDirection === 'asc' ? durationA - durationB : durationB - durationA;
                          } else if (logSortField === 'pages') {
                            const pagesA = (a.pagesVisited || []).length;
                            const pagesB = (b.pagesVisited || []).length;
                            return newDirection === 'asc' ? pagesA - pagesB : pagesB - pagesA;
                          }
                          return 0;
                        });
                        setVisitorLogs(sorted);
                      }}
                      className="bg-[#292929] text-white px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      {logSortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-300 text-sm">Rows:</label>
                    <select 
                      value={logsPerPage}
                      onChange={(e) => setLogsPerPage(Number(e.target.value))}
                      className="bg-[#292929] text-white px-2 py-1 rounded-md text-sm"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </div>
              <table className="w-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                <thead className="bg-[#292929]">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => {
                          setLogSortField('timestamp');
                          setLogSortDirection(logSortDirection === 'asc' ? 'desc' : 'asc');
                          // Sort the visitor logs
                          const sorted = [...visitorLogs].sort((a, b) => {
                            const dateA = new Date(a.createdAt || 0);
                            const dateB = new Date(b.createdAt || 0);
                            return logSortDirection === 'asc' ? dateB - dateA : dateA - dateB;
                          });
                          setVisitorLogs(sorted);
                        }}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        Timestamp {logSortField === 'timestamp' ? (logSortDirection === 'asc' ? <FaSortUp className="ml-1 text-[#93cfa2]" /> : <FaSortDown className="ml-1 text-[#93cfa2]" />) : <FaSort className="ml-1 text-gray-400" />}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left text-gray-300">Customer ID</th>
                    <th className="px-4 py-3 text-left text-gray-300">IP & Location</th>
                    <th className="px-4 py-3 text-left text-gray-300">Organization</th>
                    <th className="px-4 py-3 text-left text-gray-300">Referrer</th>
                    <th className="px-4 py-3 text-left text-gray-300">Device</th>
                    <th className="px-4 py-3 text-left text-gray-300">Browser</th>
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => {
                          setLogSortField('duration');
                          setLogSortDirection(logSortDirection === 'asc' ? 'desc' : 'asc');
                          // Sort the visitor logs
                          const sorted = [...visitorLogs].sort((a, b) => {
                            const durationA = a.sessionDuration || 0;
                            const durationB = b.sessionDuration || 0;
                            return logSortDirection === 'asc' ? durationB - durationA : durationA - durationB;
                          });
                          setVisitorLogs(sorted);
                        }}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        Duration {logSortField === 'duration' ? (logSortDirection === 'asc' ? <FaSortUp className="ml-1 text-[#93cfa2]" /> : <FaSortDown className="ml-1 text-[#93cfa2]" />) : <FaSort className="ml-1 text-gray-400" />}
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button 
                        onClick={() => {
                          setLogSortField('pages');
                          setLogSortDirection(logSortDirection === 'asc' ? 'desc' : 'asc');
                          // Sort the visitor logs
                          const sorted = [...visitorLogs].sort((a, b) => {
                            const pagesA = (a.pagesVisited || []).length;
                            const pagesB = (b.pagesVisited || []).length;
                            return logSortDirection === 'asc' ? pagesB - pagesA : pagesA - pagesB;
                          });
                          setVisitorLogs(sorted);
                        }}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        Pages {logSortField === 'pages' ? (logSortDirection === 'asc' ? <FaSortUp className="ml-1 text-[#93cfa2]" /> : <FaSortDown className="ml-1 text-[#93cfa2]" />) : <FaSort className="ml-1 text-gray-400" />}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLogs
                    .slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)
                    .reverse() // Reverse the order to display from last to first
                    .map((log, index) => (
                      <tr
                        key={log._id || index}
                        className={`border-t border-[#333333] hover:bg-[#292929]/50 ${index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#252525]'}`}
                      >
                        <td className="px-4 py-3 text-gray-300">
                          <div>{new Date(log.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleTimeString()}</div>
                        </td>
                        <td className="px-4 py-3">
                          {log.customerId ? (
                            <span className="font-mono text-sm text-[#93cfa2]">{log.customerId}</span>
                          ) : (
                            <span className="text-gray-500 italic">Unknown</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          <div className="text-sm">{log.ipAddress || 'Unknown'}</div>
                          <div className="flex flex-col text-xs text-gray-400">
                            {log.country && <span>{log.country}</span>}
                            {log.city && <span>{log.city}</span>}
                            {log.region && <span>{log.region}</span>}
                            {log.postalCode && <span>Postal: {log.postalCode}</span>}
                            {log.timezone && <span>TZ: {log.timezone}</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          <div className="text-sm">{log.organization || 'Unknown'}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {log.referrer ? (
                            <div className="group relative">
                              <span className="text-xs underline decoration-dotted cursor-help">
                                {(() => {
                                  try {
                                    return new URL(log.referrer).hostname;
                                  } catch (e) {
                                    return log.referrer.substring(0, 20);
                                  }
                                })()}
                              </span>
                              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#1e1e1e] border border-[#333] p-2 rounded shadow-lg z-10 w-64">
                                <p className="text-xs break-all">{log.referrer}</p>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">Direct</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          <div className="flex items-center">
                            {getDeviceIcon(log.userAgent)}
                            <span className="ml-2">{getDeviceType(log.userAgent)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          <div className="group relative">
                            <span className="text-xs underline decoration-dotted cursor-help">
                              {(() => {
                                const ua = log.userAgent || '';
                                if (ua.includes('Chrome')) return 'Chrome';
                                if (ua.includes('Firefox')) return 'Firefox';
                                if (ua.includes('Safari')) return 'Safari';
                                if (ua.includes('Edge')) return 'Edge';
                                if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';
                                return 'Unknown';
                              })()}
                            </span>
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#1e1e1e] border border-[#333] p-2 rounded shadow-lg z-10 w-64">
                              <p className="text-xs break-all">{log.userAgent || 'Unknown'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {formatTime(log.sessionDuration || 0)}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {log.pagesVisited && log.pagesVisited.length > 0 ? (
                            <div className="group relative">
                              <span className="text-xs underline decoration-dotted cursor-help">
                                {log.pagesVisited.length} {log.pagesVisited.length === 1 ? 'page' : 'pages'}
                              </span>
                              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#1e1e1e] border border-[#333] p-2 rounded shadow-lg z-10 w-64">
                                <ul className="text-xs list-disc pl-4">
                                  {log.pagesVisited.map((page, i) => (
                                    <li key={i}>{page}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              {visitorLogs.length > logsPerPage && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-400">
                    Showing {Math.min((currentPage - 1) * logsPerPage + 1, visitorLogs.length)} to {Math.min(currentPage * logsPerPage, visitorLogs.length)} of {visitorLogs.length} entries
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-[#333] text-gray-500 cursor-not-allowed' : 'bg-[#292929] text-white hover:bg-[#54bb74] hover:text-[#292929]'}`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.ceil(visitorLogs.length / logsPerPage) }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first page, last page, current page, and pages around current
                        return page === 1 || 
                              page === Math.ceil(visitorLogs.length / logsPerPage) || 
                              (page >= currentPage - 1 && page <= currentPage + 1);
                      })
                      .map((page, index, array) => {
                        // Add ellipsis
                        const showEllipsisBefore = index > 0 && page > array[index - 1] + 1;
                        const showEllipsisAfter = index < array.length - 1 && page < array[index + 1] - 1;
                        
                        return (
                          <Fragment key={page}>
                            {showEllipsisBefore && <span className="px-3 py-1">...</span>}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-[#54bb74] text-[#292929]' : 'bg-[#292929] text-white hover:bg-[#54bb74] hover:text-[#292929]'}`}
                            >
                              {page}
                            </button>
                            {showEllipsisAfter && <span className="px-3 py-1">...</span>}
                          </Fragment>
                        );
                      })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(visitorLogs.length / logsPerPage)))}
                      disabled={currentPage === Math.ceil(visitorLogs.length / logsPerPage)}
                      className={`px-3 py-1 rounded ${currentPage === Math.ceil(visitorLogs.length / logsPerPage) ? 'bg-[#333] text-gray-500 cursor-not-allowed' : 'bg-[#292929] text-white hover:bg-[#54bb74] hover:text-[#292929]'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Product Management Tab */}
      {activeTab === 'products' && (
        <div className="mt-6">
          <ProductManagement />
        </div>
      )}


    </div>
  );
}
