// Model configurations for easy updates and customization
export const modelConfigs = {
  cube: {
    path: '/models/cube.glb',
    scale: 1.5,
    position: [0, 0, -2],
    materialProps: {
      roughness: 0.3,
      metalness: 0.9,
      envMapIntensity: 1,
    }
  },
  cubeUpdate: {
    path: '/models/cubeupdate.glb',
    scale: 1,
    position: [0, 0, -4],
    materialProps: {
      roughness: 0.3,
      metalness: 0.9,
      envMapIntensity: 1,
    }
  },
  hub: {
    path: '/models/hub.glb',
    scale: 1,
    position: [0, 0, -4],
    materialProps: {
      roughness: 0.3,
      metalness: 0.9,
      envMapIntensity: 1,
    }
  },
  pendant: {
    path: '/models/pandent.glb',
    scale: 2.5,
    position: [-.5, -1.5, -4],
    materialProps: {
      roughness: 0.3,
      metalness: 0.9,
      envMapIntensity: 1,
    }
  }
};
