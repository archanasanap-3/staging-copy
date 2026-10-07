const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogos() {
  const logosDir = path.join(__dirname, '../public/logos');
  
  // Process main_logo.png (Dark text on light background)
  const mainLogoPath = path.join(logosDir, 'main_logo.png');
  const mainOutPath = path.join(logosDir, 'main_logo_cropped.png');
  
  // Process blackmain_logo.png (White text on dark/transparent background)
  const blackLogoPath = path.join(logosDir, 'blackmain_logo.png');
  const blackOutPath = path.join(logosDir, 'blackmain_logo_cropped.png');

  try {
    // Trim whitespace/background from main_logo
    // If it has white background, trim with threshold or make white transparent
    const mainImg = sharp(mainLogoPath);
    const mainMeta = await mainImg.metadata();
    console.log('main_logo metadata:', mainMeta.width, mainMeta.height, mainMeta.channels, mainMeta.hasAlpha);
    
    // Trim using sharp
    await sharp(mainLogoPath)
      .trim()
      .toFile(mainOutPath);
    console.log('Created main_logo_cropped.png');

    await sharp(blackLogoPath)
      .trim()
      .toFile(blackOutPath);
    console.log('Created blackmain_logo_cropped.png');

  } catch (err) {
    console.error('Error processing logos:', err);
  }
}

processLogos();
