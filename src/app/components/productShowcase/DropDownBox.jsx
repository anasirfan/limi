"use client";
import { useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiX } from "react-icons/fi";
import { FaInfoCircle, FaRegLightbulb, FaRegImages, FaVideo } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const DropDownBox = ({ product, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
    { id: 'features', label: 'Features', icon: <FaRegLightbulb /> },
    { id: 'gallery', label: 'Gallery', icon: <FaRegImages /> },
    { id: 'video', label: 'Demo', icon: <FaVideo /> }
  ];

  return (
    <div className="relative p-6 bg-[#292929] rounded-lg shadow-2xl">
      <div className="absolute top-4 right-4">
        <button 
          onClick={onClose}
          className="p-2 text-white bg-[#3a3a3a] rounded-full hover:bg-[#54BB74] transition-colors duration-300"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="flex mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center mr-4 p-2 rounded-lg transition-colors duration-300 ${activeTab === tab.id ? 'bg-[#54BB74] text-white' : 'bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]'}`}
          >
            <span className="mr-2">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
              <p className="text-gray-300 mb-4">{product.detailedDescription}</p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-[#54BB74] mb-2">Specifications</h4>
                <ul className="space-y-2">
                  {product.specs.slice(0, 3).map((spec, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{spec.name}</span>
                      <span className="text-white">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden">
              {product.lottieAnimation && (
                <Lottie 
                  animationData={require(`../../../../../public${product.lottieAnimation.replace('/', '')}`)} 
                  loop={true} 
                  autoplay={true} 
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-[#54BB74] mb-4">Key Features</h4>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#54BB74] mr-2">•</span>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#54BB74] mb-4">Benefits</h4>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#54BB74] mr-2">•</span>
                    <span className="text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="h-[300px]">
            <Swiper
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              className="h-full rounded-lg overflow-hidden"
            >
              {product.galleryImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image 
                      src={image} 
                      alt={`${product.name} - image ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="relative h-[300px] rounded-lg overflow-hidden bg-black">
            <video 
              src={product.video} 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownBox;
