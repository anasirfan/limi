// This is a utility script to download placeholder images from Unsplash
const fs = require('fs');
const https = require('https');
const path = require('path');

// Design images
const designImages = [
  {
    name: 'bumble.jpg',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500&auto=format&fit=crop'
  },
  {
    name: 'radial.jpg',
    url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=500&auto=format&fit=crop'
  },
  {
    name: 'fina.jpg',
    url: 'https://images.unsplash.com/photo-1507503750119-75bee9c2a173?q=80&w=500&auto=format&fit=crop'
  },
  {
    name: 'ico.jpg',
    url: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=500&auto=format&fit=crop'
  },
  {
    name: 'ripple.jpg',
    url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=500&auto=format&fit=crop'
  }
];

// Icon images
const iconImages = [
  {
    name: 'wall-light.jpg',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'ceiling-light.jpg',
    url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'floor-light.jpg',
    url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=300&auto=format&fit=crop'
  }
];

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
        
        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there was an error
          console.error(`Error writing file: ${filepath}`, err);
          reject(err);
        });
      } else {
        console.error(`Failed to download ${url}, status code: ${response.statusCode}`);
        reject(new Error(`HTTP status code ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  const designsDir = path.join(process.cwd(), 'public', 'images', 'designs');
  const iconsDir = path.join(process.cwd(), 'public', 'images', 'icons');
  
  // Ensure directories exist
  if (!fs.existsSync(designsDir)) {
    fs.mkdirSync(designsDir, { recursive: true });
  }
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  // Download design images
  for (const img of designImages) {
    const filepath = path.join(designsDir, img.name);
    await downloadImage(img.url, filepath);
  }
  
  // Download icon images
  for (const img of iconImages) {
    const filepath = path.join(iconsDir, img.name);
    await downloadImage(img.url, filepath);
  }
  
  console.log('All images downloaded successfully!');
}

downloadAllImages().catch(err => {
  console.error('Error downloading images:', err);
});
