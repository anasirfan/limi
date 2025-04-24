'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash, FaArrowLeft, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const cart = isClient ? cartData : { items: [], totalQuantity: 0, totalAmount: 0 };
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8 font-[Amenti]">Shopping Cart</h1>
        
        {isClient && cart.items.length === 0 ? (
          <div className="bg-[#2B2D2F] rounded-lg p-8 text-center">
            <div className="mb-6">
              <Image 
                src="/images/svgLogos/__Logo_Icon_Inverted.svg" 
                alt="LIMI Logo" 
                width={80} 
                height={80} 
                className="mx-auto opacity-30"
              />
            </div>
            <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              href="/product-catalog" 
              className="inline-flex items-center gap-2 bg-[#50C878] text-[#2B2D2F] px-6 py-3 rounded-md hover:bg-[#3da861] transition-colors"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-[#2B2D2F] rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 p-4 border-b border-[#3a3d42] text-gray-400 text-sm">
                  <div className="col-span-6 md:col-span-7">Product</div>
                  <div className="col-span-3 md:col-span-2 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
                
                {isClient && cart.items.map(item => (
                  <motion.div 
                    key={item.id} 
                    className="grid grid-cols-12 p-4 border-b border-[#3a3d42] last:border-b-0 items-center"
                    variants={itemVariants}
                  >
                    <div className="col-span-6 md:col-span-7">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-[#1e1e1e] rounded-md overflow-hidden relative flex-shrink-0">
                          {item.image && (
                            <Image 
                              src={item.image} 
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-[#50C878] text-sm">${typeof item.price === 'number' ? item.price.toFixed(2) : Number(item.price).toFixed(2) || '0.00'}</p>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex items-center gap-1 text-gray-400 hover:text-red-400 text-xs mt-2 transition-colors"
                          >
                            <FaTrash size={10} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-3 md:col-span-2 flex justify-center">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-[#1e1e1e] text-white rounded-l-md hover:bg-[#3a3d42] transition-colors"
                        >
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center bg-[#1e1e1e] text-white border-x border-[#3a3d42]">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-[#1e1e1e] text-white rounded-r-md hover:bg-[#3a3d42] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-3 text-right text-white font-medium">
                      ${typeof item.price === 'number' 
                        ? (item.price * item.quantity).toFixed(2) 
                        : (Number(item.price) * item.quantity).toFixed(2) || '0.00'}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <Link 
                  href="/product-catalog" 
                  className="inline-flex items-center gap-2 bg-[#2B2D2F] text-white px-6 py-3 rounded-md hover:bg-[#3a3d42] transition-colors"
                >
                  <FaArrowLeft />
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
            
            <div className="lg:col-span-1">
              <div className="bg-[#2B2D2F] rounded-lg p-6 sticky top-32">
                <h2 className="text-xl text-white font-bold mb-6 pb-4 border-b border-[#3a3d42]">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="text-white">${isClient ? cart.totalAmount.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span className="text-white">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#3a3d42]">
                  <div className="flex justify-between text-white mb-6">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">${isClient ? cart.totalAmount.toFixed(2) : '0.00'}</span>
                  </div>
                  
                  <Link 
                    href={isClient && cart.items.length > 0 ? "/checkout" : "#"}
                    className={`w-full py-3 rounded-md text-center font-medium flex items-center justify-center gap-2 ${
                      isClient && cart.items.length > 0 
                        ? "bg-[#50C878] text-[#2B2D2F] hover:bg-[#3da861]" 
                        : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    } transition-colors`}
                    onClick={(e) => {
                      if (!isClient || cart.items.length === 0) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <FaLock size={14} />
                    Proceed to Checkout
                  </Link>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <FaLock size={12} />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
