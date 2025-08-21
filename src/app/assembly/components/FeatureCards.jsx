import { motion } from 'framer-motion';
import { HiLightBulb } from 'react-icons/hi';
import { FaCog, FaEye } from 'react-icons/fa';

const features = [
  {
    title: 'Real-time Rendering',
    description: 'High-quality 3D visualization with dynamic lighting',
    icon: HiLightBulb
  },
  {
    title: 'Interactive Controls',
    description: 'Intuitive navigation and component exploration',
    icon: FaCog
  },
  {
    title: 'Technical Details',
    description: 'Detailed specifications and assembly instructions',
    icon: FaEye
  }
];

const FeatureCards = ({ isInView }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
    {features.map((feature, index) => {
      const Icon = feature.icon;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          className="p-6 bg-white/80 backdrop-blur-md rounded-xl border border-[#54bb74]/20 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-lg flex items-center justify-center mb-4 text-2xl">
            <Icon className="text-white text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-[#292929] mb-2">{feature.title}</h3>
          <p className="text-[#292929]/70">{feature.description}</p>
        </motion.div>
      );
    })}
  </div>
);

export default FeatureCards;
