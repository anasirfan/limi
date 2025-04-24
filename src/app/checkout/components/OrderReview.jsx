'use client';

import Image from 'next/image';
import { FaArrowLeft, FaLock } from 'react-icons/fa';

export default function OrderReview({ formData, cart, shippingCost, taxAmount, orderTotal, onPrev, onPlaceOrder }) {
  const { shipping, payment } = formData;
  
  return (
    <div className="bg-[#2B2D2F] rounded-lg p-6 md:p-8">
      <h2 className="text-2xl text-white font-bold mb-6">Review Your Order</h2>
      
      <div className="space-y-8 mb-8">
        {/* Shipping Information */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-white">Shipping Information</h3>
            <button 
              onClick={onPrev}
              className="text-[#50C878] text-sm hover:underline"
            >
              Edit
            </button>
          </div>
          
          <div className="bg-[#1e1e1e] rounded-md p-4">
            <p className="text-white">
              {shipping.firstName} {shipping.lastName}
            </p>
            <p className="text-gray-300 mt-1">{shipping.email}</p>
            <p className="text-gray-300">{shipping.phone}</p>
            <div className="mt-3 text-gray-300">
              <p>{shipping.address}</p>
              {shipping.apartment && <p>{shipping.apartment}</p>}
              <p>{shipping.city}, {shipping.state} {shipping.zipCode}</p>
              <p>{shipping.country}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#3a3d42]">
              <p className="text-white font-medium">
                {shipping.shippingMethod === 'express' ? 'Express Shipping' : 'Standard Shipping'}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {shipping.shippingMethod === 'express' 
                  ? 'Delivery in 2-3 business days' 
                  : 'Delivery in 5-7 business days'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Payment Information */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl text-white">Payment Information</h3>
            <button 
              onClick={onPrev}
              className="text-[#50C878] text-sm hover:underline"
            >
              Edit
            </button>
          </div>
          
          <div className="bg-[#1e1e1e] rounded-md p-4">
            {payment.paymentMethod === 'credit' ? (
              <div>
                <p className="text-white">{payment.cardName}</p>
                <p className="text-gray-300 mt-1">
                  •••• •••• •••• {payment.cardNumber?.slice(-4)}
                </p>
                <p className="text-gray-300">Expires {payment.expDate}</p>
              </div>
            ) : (
              <p className="text-white">
                {payment.paymentMethod === 'paypal' ? 'PayPal' : 
                 payment.paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}
              </p>
            )}
          </div>
        </div>
        
        {/* Order Items */}
        <div>
          <h3 className="text-xl text-white mb-4">Order Items</h3>
          
          <div className="bg-[#1e1e1e] rounded-md p-4">
            <div className="space-y-4 mb-6">
              {cart.items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-[#2B2D2F] rounded-md overflow-hidden relative flex-shrink-0">
                    {item.image && (
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white">{item.name}</h4>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Qty: {item.quantity}</span>
                      <span className="text-[#50C878]">
                        ${typeof item.price === 'number' 
                          ? (item.price * item.quantity).toFixed(2) 
                          : (Number(item.price) * item.quantity).toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-[#3a3d42] space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="text-white">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-white">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span className="text-white">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-2 border-t border-[#3a3d42] mt-2">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Place Order button */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 bg-[#3a3d42] text-white px-6 py-3 rounded-md hover:bg-[#2B2D2F] transition-colors"
        >
          <FaArrowLeft />
          Back to Payment
        </button>
        
        <button
          type="button"
          onClick={onPlaceOrder}
          className="flex items-center gap-2 bg-[#50C878] text-[#2B2D2F] px-8 py-3 rounded-md hover:bg-[#3da861] transition-colors font-medium"
        >
          <FaLock size={14} />
          Place Order
        </button>
      </div>
      
      {/* Terms and conditions */}
      <p className="text-gray-400 text-sm text-center mt-8">
        By placing your order, you agree to LIMI's Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
