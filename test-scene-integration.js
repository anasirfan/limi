// Test file to verify scene data integration
import { getSceneData, getSceneDataSync } from './src/app/components/configurator/pendantSystemData.js';

// Test the scene data fetching
async function testSceneDataIntegration() {
  console.log('🧪 Testing Scene Data Integration...');
  
  try {
    // Test async scene data fetching
    console.log('📡 Fetching scene data from API...');
    const sceneData = await getSceneData();
    console.log('✅ Scene data fetched successfully:', {
      count: sceneData.length,
      scenes: sceneData.map(scene => ({
        id: scene.id,
        name: scene.sceneName,
        type: scene.sceneType,
        url: scene.sceneUrl,
        isShow: scene.isShow
      }))
    });
    
    // Test sync scene data (should be empty initially until first fetch)
    console.log('⚡ Testing synchronous scene data access...');
    const syncSceneData = getSceneDataSync();
    console.log('✅ Sync scene data:', {
      count: syncSceneData.length,
      scenes: syncSceneData.map(scene => scene.sceneName || scene.id)
    });
    
    console.log('🎉 Scene data integration test completed successfully!');
    
  } catch (error) {
    console.error('❌ Scene data integration test failed:', error);
  }
}

// Run the test
testSceneDataIntegration();
