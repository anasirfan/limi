import { motion } from 'framer-motion';

const SectionHeader = ({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8 }}
    className="text-center mb-6"
  >
    <h2 className="text-5xl md:text-6xl font-black text-[#fafafa] mb-4">
      INTERACTIVE
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54bb74] to-[#93cfa2]">
        {' '}3D VIEWER
      </span>
    </h2>
    <p className="text-xl text-[#fafafa]/80 max-w-3xl mx-auto">
      Explore every component in detail. Rotate, zoom, and discover how our modular system works from the inside out.
    </p>
  </motion.div>
);

export default SectionHeader;
