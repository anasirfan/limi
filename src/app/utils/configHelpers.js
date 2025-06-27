// Utility functions for updating config and cables
export function updateCable(config, index, changes) {
  const cables = [...config.cables];
  cables[index] = { ...cables[index], ...changes };
  return { ...config, cables };
}

export function updateConfig(config, changes) {
  return { ...config, ...changes };
}

export function generateCables(lightType, lightAmount, designs = []) {
  // For wall: always 1 pendant, for floor: 3, for ceiling: lightAmount

  console.log("designscables", designs)
  const count = lightAmount;
  return Array.from({ length: count }, (_, i) => ({
    isSystem: false,
    design: designs[i].design || 'Ico',
    designId: designs[i].designId || 'product_2'
  }));
}
