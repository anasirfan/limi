import { motion } from 'framer-motion';

export const ProgressIndicator = ({ progress, emerald }) => {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-1 rounded-full bg-gray-700 -translate-y-[5%] translate-x-[20px] h-[110%]">
      <motion.div 
        className="absolute top-0 left-0 w-full rounded-full" 
        style={{ 
          backgroundColor: emerald,
          height: `${progress}%`,
          transition: 'height 0.3s ease-out'
        }}
      />
    </div>
  );
};
