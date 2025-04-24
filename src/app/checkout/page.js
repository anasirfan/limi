'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaArrowLeft, FaArrowRight, FaCheck, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

// Checkout steps components
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderConfirmation from './components/OrderConfirmation';

export default function CheckoutPage() {
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      shippingMethod: 'standard'
    },
    payment: {
      cardName: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
      paymentMethod: 'credit'
    }
  });
  
  const router = useRouter();
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const cart = isClient ? cartData : { items: [], totalQuantity: 0, totalAmount: 0 };
  
  // Shipping cost calculation
  const shippingCost = formData.shipping.shippingMethod === 'express' ? 25 : 
                       formData.shipping.shippingMethod === 'standard' ? 10 : 0;
  
  // Tax calculation (simplified to 8%)
  const taxRate = 0.08;
  const taxAmount = cart.totalAmount * taxRate;
  
  // Order total
  const orderTotal = cart.totalAmount + shippingCost + taxAmount;
  
  useEffect(() => {
    setIsClient(true);
    
    // Redirect if cart is empty
    if (isClient && cart.items.length === 0 && !orderComplete) {
      router.push('/cart');
    }
  }, [isClient, cart.items.length, router, orderComplete]);
  
  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = () => {
    // Generate a random order ID
    const newOrderId = 'LIMI-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    
    // Clear cart
    dispatch(clearCart());
    
    // Set order as complete
    setOrderComplete(true);
    setCurrentStep(4);
    
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  const steps = [
    { number: 1, name: 'Shipping' },
    { number: 2, name: 'Payment' },
    { number: 3, name: 'Review' },
  ];
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Checkout header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white font-[Amenti]">
            {orderComplete ? 'Order Confirmation' : 'Checkout'}
          </h1>
          
          {!orderComplete && (
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaArrowLeft size={14} />
              <span>Back to Cart</span>
            </Link>
          )}
        </div>
        
        {/* Checkout progress */}
        {!orderComplete && (
          <div className="mb-12">
            <div className="flex justify-between items-center relative">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className="flex flex-col items-center relative z-10"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.number 
                        ? 'bg-[#50C878] border-[#50C878] text-[#2B2D2F]' 
                        : 'bg-[#2B2D2F] border-gray-600 text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? <FaCheck /> : step.number}
                  </div>
                  <span 
                    className={`mt-2 text-sm ${
                      currentStep >= step.number ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
              
              {/* Progress bar */}
              <div className="absolute top-5 left-0 h-0.5 bg-gray-600 w-full -z-0">
                <div 
                  className="h-full bg-[#50C878] transition-all duration-500"
                  style={{ width: `${(currentStep - 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main checkout content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                {currentStep === 1 && (
                  <ShippingForm 
                    formData={formData.shipping} 
                    onChange={(data) => handleFormChange('shipping', data)} 
                    onNext={handleNextStep}
                  />
                )}
                
                {currentStep === 2 && (
                  <PaymentForm 
                    formData={formData.payment}
                    onChange={(data) => handleFormChange('payment', data)}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}
                
                {currentStep === 3 && (
                  <OrderReview
                    formData={formData}
                    cart={cart}
                    shippingCost={shippingCost}
                    taxAmount={taxAmount}
                    orderTotal={orderTotal}
                    onPrev={handlePrevStep}
                    onPlaceOrder={handlePlaceOrder}
                  />
                )}
                
                {currentStep === 4 && (
                  <OrderConfirmation
                    orderId={orderId}
                    formData={formData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            {!orderComplete ? (
              <div className="bg-[#2B2D2F] rounded-lg p-6 sticky top-32">
                <h2 className="text-xl text-white font-bold mb-6 pb-4 border-b border-[#3a3d42]">Order Summary</h2>
                
                {/* Products list */}
                <div className="max-h-80 overflow-y-auto mb-6">
                  {isClient && cart.items.map(item => (
                    <div key={item.id} className="flex gap-3 mb-4">
                      <div className="w-16 h-16 bg-[#1e1e1e] rounded-md overflow-hidden relative flex-shrink-0">
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
                        <h3 className="text-white text-sm">{item.name}</h3>
                        <div className="flex justify-between text-sm">
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
                
                {/* Cost breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="text-white">${isClient ? cart.totalAmount.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-white">
                      {currentStep >= 1 && formData.shipping.shippingMethod
                        ? `$${shippingCost.toFixed(2)}`
                        : 'Calculated at next step'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span className="text-white">
                      ${isClient ? taxAmount.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="pt-4 border-t border-[#3a3d42]">
                  <div className="flex justify-between text-white mb-6">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">
                      ${isClient ? orderTotal.toFixed(2) : '0.00'}
                    </span>
                  </div>
                  
                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <FaCreditCard className="text-gray-400" size={24} />
                    <FaPaypal className="text-gray-400" size={24} />
                    <FaApplePay className="text-gray-400" size={24} />
                    <FaGooglePay className="text-gray-400" size={24} />
                  </div>
                  
                  {/* Secure checkout notice */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <FaLock size={12} />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#2B2D2F] rounded-lg p-6 sticky top-32">
                <h2 className="text-xl text-white font-bold mb-6 pb-4 border-b border-[#3a3d42]">Need Help?</h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about your order, please contact our customer support team.
                </p>
                <Link 
                  href="/contact-us" 
                  className="block w-full py-3 bg-[#3a3d42] text-white rounded-md text-center hover:bg-[#50C878] transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
