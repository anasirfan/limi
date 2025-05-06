"use client";
import { useSpring, animated } from '@react-spring/web';
import { FiPlus, FiMinus } from "react-icons/fi";

const InteractiveDropdown = ({ title, isOpen, onClick, children }) => {
  const dropdownAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    height: isOpen ? 'auto' : 0,
    config: { tension: 280, friction: 60 }
  });

  return (
    <div className="mb-8">
      <button 
        onClick={onClick}
        className="flex items-center justify-between w-full p-4 text-xl font-bold text-white bg-[#292929] rounded-lg hover:bg-[#3a3a3a] transition-colors duration-300"
      >
        <span>{title}</span>
        <span className="text-[#54BB74]">
          {isOpen ? <FiMinus size={24} /> : <FiPlus size={24} />}
        </span>
      </button>
      <animated.div style={dropdownAnimation} className="overflow-hidden">
        <div className="p-4 bg-[#1e1e1e] rounded-b-lg">
          {children}
        </div>
      </animated.div>
    </div>
  );
};

export default InteractiveDropdown;
