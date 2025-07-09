'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { 
  updatePersonalInfo, 
  updateNotificationPreferences, 
  addAddress, 
  updateAddress, 
  removeAddress, 
  setDefaultAddress,
  addPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod
} from '../../../redux/slices/userSlice';

export default function AccountSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state for editing (to avoid direct Redux updates until form submission)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '••••••••••'
  });
  
  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    type: 'Home',
    name: user?.name || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [editingAddressId, setEditingAddressId] = useState(null);
  
  // Payment method form state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    type: 'Credit Card',
    name: user?.name || '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePersonalInfo({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
      // Password would typically be handled separately with proper validation
    }));
    setEditMode(false);
  };
  
  // Toggle notification settings
  const toggleNotification = (type) => {
    dispatch(updateNotificationPreferences({
      [type]: !user.notifications[type]
    }));
  };
  
  // Handle address functions
  const handleAddAddress = (newAddress) => {
    dispatch(addAddress(newAddress));
  };
  
  const handleUpdateAddress = (id, addressData) => {
    dispatch(updateAddress({ id, ...addressData }));
  };
  
  const handleRemoveAddress = (id) => {
    dispatch(removeAddress(id));
  };
  
  const handleSetDefaultAddress = (id) => {
    dispatch(setDefaultAddress(id));
  };
  
  // Handle payment method functions
  const handleAddPaymentMethod = (newPaymentMethod) => {
    dispatch(addPaymentMethod(newPaymentMethod));
  };
  
  const handleUpdatePaymentMethod = (id, paymentData) => {
    dispatch(updatePaymentMethod({ id, ...paymentData }));
  };
  
  const handleRemovePaymentMethod = (id) => {
    dispatch(removePaymentMethod(id));
  };
  
  const handleSetDefaultPaymentMethod = (id) => {
    dispatch(setDefaultPaymentMethod(id));
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
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {user?.name || 'Not set'}
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
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {user?.email || 'Not set'}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-3 rounded-md">
                    {user?.phone || 'Not set'}
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
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-[#292929] text-white w-full pl-10 pr-10 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
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
                    {formData.password}
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
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=54BB74&color=fff`}
              alt={user?.name || 'User'}
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
                checked={user?.notifications?.email || false}
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
                checked={user?.notifications?.sms || false}
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
                checked={user?.notifications?.app || false}
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
  const renderAddressesTab = () => {
    
    const handleAddressSubmit = (e) => {
      e.preventDefault();
      if (editingAddressId) {
        handleUpdateAddress(editingAddressId, addressFormData);
      } else {
        handleAddAddress(addressFormData);
      }
      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressFormData({
        type: 'Home',
        name: user?.name || '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      });
    };
    
    const startEditAddress = (address) => {
      setAddressFormData({
        type: address.type,
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country
      });
      setEditingAddressId(address.id);
      setShowAddressForm(true);
    };
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Addresses</h3>
          
          <div className="space-y-4">
            {user?.addresses?.map(address => (
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
                    <button 
                      onClick={() => startEditAddress(address)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleRemoveAddress(address.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
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
                    onClick={() => handleSetDefaultAddress(address.id)}
                    className="text-[#54BB74] text-sm hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
            
            {(!user?.addresses || user.addresses.length === 0) && (
              <div className="text-gray-400 text-center py-6">
                No addresses yet. Add your first address below.
              </div>
            )}
          </div>
          
          <div className="mt-6">
            {showAddressForm ? (
              <form onSubmit={handleAddressSubmit} className="bg-[#292929] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-4">
                  {editingAddressId ? 'Edit Address' : 'Add New Address'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Address Type</label>
                    <select
                      value={addressFormData.type}
                      onChange={(e) => setAddressFormData({...addressFormData, type: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={addressFormData.name}
                      onChange={(e) => setAddressFormData({...addressFormData, name: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={addressFormData.street}
                      onChange={(e) => setAddressFormData({...addressFormData, street: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">City</label>
                    <input
                      type="text"
                      value={addressFormData.city}
                      onChange={(e) => setAddressFormData({...addressFormData, city: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">State/Province</label>
                    <input
                      type="text"
                      value={addressFormData.state}
                      onChange={(e) => setAddressFormData({...addressFormData, state: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">ZIP/Postal Code</label>
                    <input
                      type="text"
                      value={addressFormData.zip}
                      onChange={(e) => setAddressFormData({...addressFormData, zip: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Country</label>
                    <input
                      type="text"
                      value={addressFormData.country}
                      onChange={(e) => setAddressFormData({...addressFormData, country: e.target.value})}
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddressId(null);
                    }}
                    className="bg-[#1e1e1e] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
                  >
                    {editingAddressId ? 'Update Address' : 'Add Address'}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                <FaPlus />
                <span>Add New Address</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Render payment methods tab
  const renderPaymentMethodsTab = () => {
    
    const handlePaymentSubmit = (e) => {
      e.preventDefault();
      const last4 = paymentFormData.cardNumber.slice(-4);
      const paymentMethod = {
        ...paymentFormData,
        last4,
        cardNumber: undefined // Don't store full card number
      };
      
      if (editingPaymentId) {
        handleUpdatePaymentMethod(editingPaymentId, paymentMethod);
      } else {
        handleAddPaymentMethod(paymentMethod);
      }
      
      setShowPaymentForm(false);
      setEditingPaymentId(null);
      setPaymentFormData({
        type: 'Credit Card',
        name: user?.name || '',
        cardNumber: '',
        expiry: '',
        cvv: ''
      });
    };
    
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
          
          <div className="space-y-4">
            {user?.paymentMethods?.map(method => (
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
                onClick={() => handleSetDefaultPaymentMethod(method.id)}
                className="text-[#54BB74] text-sm hover:underline"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
            {(!user?.paymentMethods || user.paymentMethods.length === 0) && (
              <div className="text-gray-400 text-center py-6">
                No payment methods yet. Add your first payment method below.
              </div>
            )}
          </div>
        </div>
      
        <div className="mt-6">
        {showPaymentForm ? (
          <form onSubmit={handlePaymentSubmit} className="bg-[#292929] p-4 rounded-lg">
            <h4 className="text-white font-medium mb-4">
              {editingPaymentId ? 'Edit Payment Method' : 'Add New Payment Method'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2">Card Type</label>
                <select
                  value={paymentFormData.type}
                  onChange={(e) => setPaymentFormData({...paymentFormData, type: e.target.value})}
                  className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentFormData.name}
                  onChange={(e) => setPaymentFormData({...paymentFormData, name: e.target.value})}
                  className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  value={paymentFormData.cardNumber}
                  onChange={(e) => setPaymentFormData({...paymentFormData, cardNumber: e.target.value})}
                  placeholder="•••• •••• •••• ••••"
                  className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={paymentFormData.expiry}
                  onChange={(e) => setPaymentFormData({...paymentFormData, expiry: e.target.value})}
                  placeholder="MM/YY"
                  className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">CVV</label>
                <input
                  type="text"
                  value={paymentFormData.cvv}
                  onChange={(e) => setPaymentFormData({...paymentFormData, cvv: e.target.value})}
                  placeholder="•••"
                  className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowPaymentForm(false);
                  setEditingPaymentId(null);
                }}
                className="bg-[#1e1e1e] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
              >
                {editingPaymentId ? 'Update Payment Method' : 'Add Payment Method'}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowPaymentForm(true)}
            className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
          >
            <FaPlus />
            <span>Add Payment Method</span>
          </button>
        )}
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
  };
  
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
    