import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const BaseColorPanel = ({ onBaseColorChange, currentBaseColor }) => {
  const [selectedColor, setSelectedColor] = useState(currentBaseColor || 'black');

  useEffect(() => {
    if (currentBaseColor) {
      setSelectedColor(currentBaseColor);
    }
  }, [currentBaseColor]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onBaseColorChange(color);
  };

  const baseColors = [
    { id: 'black', name: 'Black', hexColor: '#000000' },
    // { id: 'gold', name: 'Gold', hexColor: '#D4AF37' },
    { id: 'silver', name: 'Silver', hexColor: '#C0C0C0' },
    // { id: 'midnight-blue', name: 'Midnight Blue', hexColor: '#191970' }
  ];

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      color: 'white',
      width: '100%'
    },
    title: {
      fontSize: '18px',
      marginBottom: '15px',
      fontWeight: '500'
    },
    colorPalette: {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginBottom: '10px'
    },
    colorOption: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid transparent'
    },
    selectedColor: {
      border: '2px solid white'
    },
    colorLabels: {
      display: 'flex',
      justifyContent: 'space-evenly',
      fontSize: '12px',
      padding: '0px 7px'
    },
    colorLabel: {
      textAlign: 'center',
      width: '60px'
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Base Color</h3>
      <div style={styles.colorPalette}>
        {baseColors.map((color) => (
          <motion.div
            key={color.id}
            style={{
              ...styles.colorOption,
              backgroundColor: color.hexColor,
              ...(selectedColor === color.id ? styles.selectedColor : {})
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColorSelect(color.id)}
          >
            {selectedColor === color.id && (
              <FaCheck color={color.id === 'black' ? 'white' : 'black'} />
            )}
          </motion.div>
        ))}
      </div>
      <div style={styles.colorLabels}>
        {baseColors.map((color) => (
          <div key={color.id} style={styles.colorLabel}>
            {color.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseColorPanel;
