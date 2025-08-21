import { motion } from 'framer-motion';
import { useState } from 'react';

const SensorOptionsPanel = ({ showSensorOptions, sendMessageToPlayCanvas, trackAssemblyEvent }) => {
  const [sensorStates, setSensorStates] = useState({
    'sensor:1': false,
    'sensor:2': false,
    'sensor:3': false,
  });

  const handleSensorClick = (sensor) => {
    setSensorStates((prev) => {
      const isCurrentlySelected = prev[sensor];
      let newStates;
      if (isCurrentlySelected) {
        // Deselect all if clicking the already selected sensor
        newStates = {
          'sensor:1': false,
          'sensor:2': false,
          'sensor:3': false,
        };
        sendMessageToPlayCanvas(`${sensor}-off`);
        trackAssemblyEvent('Sensor Selected', `${sensor}-off`);
      } else {
        // Select only the clicked sensor, deselect others
        newStates = {
          'sensor:1': false,
          'sensor:2': false,
          'sensor:3': false,
          [sensor]: true,
        };
        sendMessageToPlayCanvas(`${sensor}`);
        trackAssemblyEvent('Sensor Selected', sensor);
      }
      return newStates;
    });
  };

  // Handler for deselecting all sensors
  const handleDeselectAll = () => {
    setSensorStates({
      'sensor:1': false,
      'sensor:2': false,
      'sensor:3': false,
    });
    ['sensor:1', 'sensor:2', 'sensor:3'].forEach(sensor => {
      sendMessageToPlayCanvas(`${sensor}-off`);
      trackAssemblyEvent('Sensor Deselected', `${sensor}-off`);
    });
  };

  return (
    showSensorOptions && (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-2 left-[39%] transform -translate-x-1/2 bg-black/80 backdrop-blur-md border-t border-[#54bb74]/30 px-10 py-4 rounded-2xl shadow-2xl"
        style={{ minWidth: 'auto', width: 'auto', maxWidth: '100vw'}}
      >
        {/* Cross button top right */}
        <button
          aria-label="Deselect all sensors"
          onClick={handleDeselectAll}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-red-500 text-white transition-colors duration-200 shadow-lg z-10"
          style={{ lineHeight: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="5" x2="15" y2="15" strokeLinecap="round" />
            <line x1="15" y1="5" x2="5" y2="15" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex justify-center space-x-6">
          {['sensor:1', 'sensor:2', 'sensor:3'].map((sensor, index) => (
            <motion.button
              key={sensor}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-16 h-16 ${sensorStates[sensor] ? 'bg-[#54bb74]' : 'bg-gray-500'} text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg hover:bg-[#54bb74]/80 transition-colors duration-300`}
              onClick={() => handleSensorClick(sensor)}
            >
              <span className="relative flex items-center justify-center w-full h-full">
                S{index + 1}
                {sensorStates[sensor] && (
                  <span className="absolute top-1 right-1">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    )
  );
};

export default SensorOptionsPanel;
