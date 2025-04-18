'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaMobileAlt, 
  FaLock, 
  FaBell, 
  FaHome,
  FaCreditCard,
  FaCheck,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaShieldAlt
} from 'react-icons/fa';

export default function AccountSettings({ user }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email || 'sarah@example.com',
    phone: user.phone || '+1 (234) 567-8900',
    password: '••••••••••',
    notifications: {
      email: true,
      sms: false,
      app: true
    },
    addresses: [
      {
        id: 'addr-1',
        type: 'Home',
        default: true,
        name: 'Sarah Johnson',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      {
        id: 'addr-2',
        type: 'Work',
        default: false,
        name: 'Sarah Johnson',
        street: '456 Market St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94103',
        country: 'USA'
      }
    ],
    paymentMethods: [
      {
        id: 'card-1',
        type: 'Visa',
        default: true,
        last4: '4242',
        expiry: '05/26',
        name: 'Sarah Johnson'
      },
      {
        id: 'card-2',
        type: 'Mastercard',
        default: false,
        last4: '5555',
        expiry: '12/25',
        name: 'Sarah Johnson'
      }
    ]
  });
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    // In a real app, this would send the updated data to a backend
    console.log('Updated user data:', userData);
  };
  
  // Toggle notification settings
  const toggleNotification = (type) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };
  
  // Set default address
  const setDefaultAddress = (id) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        default: addr.id === id
      }))
    }));
  };
  
  // Set default payment method
  const setDefaultPaymentMethod = (id) => {
    setUserData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => ({
        ...method,
        default: method.id === id
      }))
    }));
  };
  
  // Render profile tab
  const renderProfileTab = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                {editMode ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {userData.name}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                {editMode ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {userData.email}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaMobileAlt className="text-gray-500" />
                </div>
                {editMode ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {userData.phone}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                {editMode ? (
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={userData.password}
                      onChange={(e) => setUserData({...userData, password: e.target.value})}
                      className="bg-[#292929] text-white w-full pl-10 pr-10 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {userData.password}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
        
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#292929]">
            <Image 
              src={user.avatar || `https://ui-avatars.com/api/?name=${userData.name}&background=54BB74&color=fff`}
              alt={userData.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex gap-3">
            <button className="bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors">
              Upload New
            </button>
            <button className="bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors">
              Remove
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#292929] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#54BB74]" />
              <div>
                <div className="text-white">Email Notifications</div>
                <div className="text-sm text-gray-400">Receive order updates and promotions via email</div>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={userData.notifications.email}
                onChange={() => toggleNotification('email')}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#54BB74]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between bg-[#292929] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FaMobileAlt className="text-[#54BB74]" />
              <div>
                <div className="text-white">SMS Notifications</div>
                <div className="text-sm text-gray-400">Receive order updates and promotions via SMS</div>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={userData.notifications.sms}
                onChange={() => toggleNotification('sms')}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#54BB74]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between bg-[#292929] p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FaBell className="text-[#54BB74]" />
              <div>
                <div className="text-white">App Notifications</div>
                <div className="text-sm text-gray-400">Receive notifications in the LIMI mobile app</div>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={userData.notifications.app}
                onChange={() => toggleNotification('app')}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#54BB74]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render addresses tab
  const renderAddressesTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Saved Addresses</h3>
        
        <button className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-3 py-2 rounded-md hover:bg-[#333] transition-colors">
          <FaPlus />
          <span>Add Address</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {userData.addresses.map(address => (
          <div key={address.id} className="bg-[#292929] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <FaHome className="text-[#54BB74]" />
                <div className="font-medium text-white">{address.type}</div>
                {address.default && (
                  <span className="bg-[#54BB74]/20 text-[#54BB74] text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-white">
                  <FaEdit />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <div className="text-gray-300 mb-4">
              <div>{address.name}</div>
              <div>{address.street}</div>
              <div>{address.city}, {address.state} {address.zip}</div>
              <div>{address.country}</div>
            </div>
            
            {!address.default && (
              <button 
                onClick={() => setDefaultAddress(address.id)}
                className="text-[#54BB74] text-sm hover:underline"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
  // Render payment methods tab
  const renderPaymentMethodsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
        
        <button className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-3 py-2 rounded-md hover:bg-[#333] transition-colors">
          <FaPlus />
          <span>Add Payment Method</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {userData.paymentMethods.map(method => (
          <div key={method.id} className="bg-[#292929] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-[#54BB74]" />
                <div className="font-medium text-white">{method.type} •••• {method.last4}</div>
                {method.default && (
                  <span className="bg-[#54BB74]/20 text-[#54BB74] text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-white">
                  <FaEdit />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <div className="text-gray-300 mb-4">
              <div>Expires: {method.expiry}</div>
              <div>{method.name}</div>
            </div>
            
            {!method.default && (
              <button 
                onClick={() => setDefaultPaymentMethod(method.id)}
                className="text-[#54BB74] text-sm hover:underline"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-[#1e1e1e] rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <FaShieldAlt className="text-[#54BB74]" />
          <div className="text-white font-medium">Secure Payment Processing</div>
        </div>
        <p className="text-sm text-gray-400">
          Your payment information is encrypted and securely stored. We never store your full card details on our servers.
        </p>
      </div>
    </div>
  );
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'addresses':
        return renderAddressesTab();
      case 'payment':
        return renderPaymentMethodsTab();
      default:
        return renderProfileTab();
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Account Settings</h2>
        <p className="text-gray-400 text-sm">
          Manage your profile, addresses, and payment methods
        </p>
      </div>
      
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 font-medium flex items-center gap-2 ${activeTab === 'profile' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <FaUser />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-3 font-medium flex items-center gap-2 ${activeTab === 'addresses' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <FaHome />
          Addresses
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-4 py-3 font-medium flex items-center gap-2 ${activeTab === 'payment' ? 'text-[#54BB74] border-b-2 border-[#54BB74]' : 'text-gray-400 hover:text-gray-300'}`}
        >
          <FaCreditCard />
          Payment Methods
        </button>
      </div>
      
      {renderTabContent()}
    </div>
  );
}
