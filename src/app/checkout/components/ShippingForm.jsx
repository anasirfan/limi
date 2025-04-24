'use client';

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function ShippingForm({ formData, onChange, onNext }) {
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (simple)
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Zip code validation (simple)
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="bg-[#2B2D2F] rounded-lg p-6 md:p-8">
      <h2 className="text-2xl text-white font-bold mb-6">Shipping Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-gray-300 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.firstName ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.firstName}</p>
            )}
          </div>
          
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-gray-300 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.lastName ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.lastName}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.email ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.email}</p>
            )}
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.phone ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.phone}</p>
            )}
          </div>
          
          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-gray-300 mb-2">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.address ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.address}</p>
            )}
          </div>
          
          {/* Apartment, suite, etc. */}
          <div className="md:col-span-2">
            <label htmlFor="apartment" className="block text-gray-300 mb-2">
              Apartment, suite, etc. (optional)
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="w-full bg-[#1e1e1e] border border-[#3a3d42] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors"
            />
          </div>
          
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-gray-300 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.city ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.city}</p>
            )}
          </div>
          
          {/* State */}
          <div>
            <label htmlFor="state" className="block text-gray-300 mb-2">
              State/Province *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.state ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.state}</p>
            )}
          </div>
          
          {/* Zip Code */}
          <div>
            <label htmlFor="zipCode" className="block text-gray-300 mb-2">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.zipCode ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.zipCode}</p>
            )}
          </div>
          
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-gray-300 mb-2">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full bg-[#1e1e1e] border ${errors.country ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1 error-message">{errors.country}</p>
            )}
          </div>
        </div>
        
        {/* Shipping Method */}
        <div className="mb-8">
          <h3 className="text-xl text-white font-bold mb-4">Shipping Method</h3>
          
          <div className="space-y-4">
            <label className={`block border ${formData.shippingMethod === 'standard' ? 'border-[#50C878]' : 'border-[#3a3d42]'} rounded-md p-4 cursor-pointer hover:border-[#87CEAB] transition-colors`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={formData.shippingMethod === 'standard'}
                  onChange={handleChange}
                  className="mr-3 accent-[#50C878]"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Standard Shipping</span>
                    <span className="text-[#50C878] font-medium">$10.00</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Delivery in 5-7 business days</p>
                </div>
              </div>
            </label>
            
            <label className={`block border ${formData.shippingMethod === 'express' ? 'border-[#50C878]' : 'border-[#3a3d42]'} rounded-md p-4 cursor-pointer hover:border-[#87CEAB] transition-colors`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={formData.shippingMethod === 'express'}
                  onChange={handleChange}
                  className="mr-3 accent-[#50C878]"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Express Shipping</span>
                    <span className="text-[#50C878] font-medium">$25.00</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Delivery in 2-3 business days</p>
                </div>
              </div>
            </label>
          </div>
        </div>
        
        {/* Continue button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#50C878] text-[#2B2D2F] px-6 py-3 rounded-md hover:bg-[#3da861] transition-colors font-medium"
          >
            Continue to Payment
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}
