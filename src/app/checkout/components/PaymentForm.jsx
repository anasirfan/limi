'use client';

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

export default function PaymentForm({ formData, onChange, onNext, onPrev }) {
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Only validate credit card fields if credit card payment method is selected
    if (formData.paymentMethod === 'credit') {
      // Required fields
      const requiredFields = ['cardName', 'cardNumber', 'expDate', 'cvv'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
      
      // Card number validation (simple)
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      // Expiration date validation (MM/YY format)
      if (formData.expDate && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expDate)) {
        newErrors.expDate = 'Please enter a valid expiration date (MM/YY)';
      }
      
      // CVV validation
      if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV code';
      }
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
      <h2 className="text-2xl text-white font-bold mb-6">Payment Method</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Payment method selection */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className={`block border ${formData.paymentMethod === 'credit' ? 'border-[#50C878]' : 'border-[#3a3d42]'} rounded-md p-4 cursor-pointer hover:border-[#87CEAB] transition-colors`}>
              <div className="flex flex-col items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <FaCreditCard size={24} className={formData.paymentMethod === 'credit' ? 'text-[#50C878]' : 'text-gray-400'} />
                <span className={`mt-2 text-sm ${formData.paymentMethod === 'credit' ? 'text-white' : 'text-gray-400'}`}>
                  Credit Card
                </span>
              </div>
            </label>
            
            <label className={`block border ${formData.paymentMethod === 'paypal' ? 'border-[#50C878]' : 'border-[#3a3d42]'} rounded-md p-4 cursor-pointer hover:border-[#87CEAB] transition-colors opacity-50`}>
              <div className="flex flex-col items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className="sr-only"
                  disabled
                />
                <FaPaypal size={24} className="text-gray-400" />
                <span className="mt-2 text-sm text-gray-400">
                  PayPal
                </span>
                <span className="text-xs text-gray-500 mt-1">(Coming Soon)</span>
              </div>
            </label>
            
            <label className={`block border ${formData.paymentMethod === 'apple' ? 'border-[#50C878]' : 'border-[#3a3d42]'} rounded-md p-4 cursor-pointer hover:border-[#87CEAB] transition-colors opacity-50`}>
              <div className="flex flex-col items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="apple"
                  checked={formData.paymentMethod === 'apple'}
                  onChange={handleChange}
                  className="sr-only"
                  disabled
                />
                <FaApplePay size={24} className="text-gray-400" />
                <span className="mt-2 text-sm text-gray-400">
                  Apple Pay
                </span>
                <span className="text-xs text-gray-500 mt-1">(Coming Soon)</span>
              </div>
            </label>
            
            <label className={`block border ${formData.paymentMethod === 'google' ? 'border-[#50C878]' : 'border-[#3a3d42]'} rounded-md p-4 cursor-pointer hover:border-[#87CEAB] transition-colors opacity-50`}>
              <div className="flex flex-col items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="google"
                  checked={formData.paymentMethod === 'google'}
                  onChange={handleChange}
                  className="sr-only"
                  disabled
                />
                <FaGooglePay size={24} className="text-gray-400" />
                <span className="mt-2 text-sm text-gray-400">
                  Google Pay
                </span>
                <span className="text-xs text-gray-500 mt-1">(Coming Soon)</span>
              </div>
            </label>
          </div>
        </div>
        
        {/* Credit Card Details */}
        {formData.paymentMethod === 'credit' && (
          <div className="space-y-6 mb-8">
            <div>
              <label htmlFor="cardName" className="block text-gray-300 mb-2">
                Name on Card *
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={`w-full bg-[#1e1e1e] border ${errors.cardName ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
                placeholder="John Doe"
              />
              {errors.cardName && (
                <p className="text-red-500 text-sm mt-1 error-message">{errors.cardName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block text-gray-300 mb-2">
                Card Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`w-full bg-[#1e1e1e] border ${errors.cardNumber ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors pl-11`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                <FaCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1 error-message">{errors.cardNumber}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="expDate" className="block text-gray-300 mb-2">
                  Expiration Date *
                </label>
                <input
                  type="text"
                  id="expDate"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleChange}
                  className={`w-full bg-[#1e1e1e] border ${errors.expDate ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expDate && (
                  <p className="text-red-500 text-sm mt-1 error-message">{errors.expDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-gray-300 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`w-full bg-[#1e1e1e] border ${errors.cvv ? 'border-red-500' : 'border-[#3a3d42]'} rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#50C878] transition-colors`}
                  placeholder="123"
                  maxLength="4"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1 error-message">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Billing address checkbox */}
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-3 accent-[#50C878]"
              checked
              readOnly
            />
            <span className="text-gray-300">Billing address same as shipping address</span>
          </label>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-2 bg-[#3a3d42] text-white px-6 py-3 rounded-md hover:bg-[#2B2D2F] transition-colors"
          >
            <FaArrowLeft />
            Back to Shipping
          </button>
          
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#50C878] text-[#2B2D2F] px-6 py-3 rounded-md hover:bg-[#3da861] transition-colors font-medium"
          >
            Review Order
            <FaArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
}
