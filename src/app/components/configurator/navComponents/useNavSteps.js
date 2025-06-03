import { 
  FaLightbulb, 
  FaLayerGroup, 
  FaRegLightbulb, 
  FaObjectGroup, 
  FaList, 
  FaCubes 
} from "react-icons/fa";

export const useNavSteps = (config) => {
  // Define navigation steps
  const steps = [
    { 
      id: 'lightType', 
      icon: <FaLightbulb />, 
      label: 'Light Type',
      tooltip: 'Select light type (wall, ceiling, floor)',
      isActive: true, // Always active
      isCompleted: Boolean(config.lightType)
    },
    { 
      id: 'baseType', 
      icon: <FaLayerGroup />, 
      label: 'Base Type',
      tooltip: 'Select base type (round, rectangular)',
      isActive: config.lightType === 'ceiling', // Only active for ceiling lights
      isCompleted: Boolean(config.baseType)
    },
    { 
      id: 'lightAmount', 
      icon: <FaRegLightbulb />, 
      label: 'Light Amount',
      tooltip: 'Select number of lights',
      isActive: true, // Always active
      isCompleted: Boolean(config.lightAmount)
    },
    

    { 
      id: 'pendantSelection', 
      icon: <FaList />, 
      label: config.configurationType === 'pendant' ? 'Select Pendants' : 'Select Systems',
      tooltip: config.configurationType === 'pendant' 
        ? 'Configure individual pendants' 
        : 'Configure system options',
      isActive: true, // Always active - fixed to allow switching back
      isCompleted: false
    }
  ];

  return { steps };
};
