'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaEye, FaTimes, FaFilter } from 'react-icons/fa';

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

  // Fetch customer data
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
          console.log('Error fetching customer data:', error);
          // Will fall back to mock data
        }
        
        // If API call failed or returned invalid data, use mock data
        if (!useRealData) {
          console.log('Using mock data instead.');
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
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="ml-1 text-[#93cfa2]" /> : 
      <FaSortDown className="ml-1 text-[#93cfa2]" />;
  };

  // View customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
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

  return (
    <div>
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
              
              {/* Business card images */}
              <h4 className="text-lg font-semibold text-[#93cfa2] mb-3">Business Card Images</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Front of Business Card */}
                <div className="bg-[#292929]/50 p-4 rounded-lg">
                  <h5 className="text-md font-semibold text-[#93cfa2] mb-3">Front</h5>
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
                  <h5 className="text-md font-semibold text-[#93cfa2] mb-3">Back</h5>
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
    </div>
  );
}
