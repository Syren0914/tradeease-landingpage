const fs = require('fs');
const path = require('path');

// Simple GLB header and structure for basic 3D models
const createSimpleGLB = (geometryType) => {
  // This is a simplified GLB structure
  // In a real implementation, you'd use a proper 3D library like Three.js
  const glbHeader = new Uint8Array([
    0x67, 0x6C, 0x54, 0x46, // "glTF"
    0x02, 0x00, 0x00, 0x00, // Version 2
    0x00, 0x00, 0x00, 0x00, // Length (placeholder)
    0x00, 0x00, 0x00, 0x00, // Content length (placeholder)
    0x00, 0x00, 0x00, 0x00  // Content type (placeholder)
  ]);

  return glbHeader;
};

// Create the 3D models directory if it doesn't exist
const modelsDir = path.join(__dirname, '../public/assets/3d');
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Create simple GLB files for each model
const models = ['lens', 'cube', 'bar'];

models.forEach(model => {
  const glbData = createSimpleGLB(model);
  const filePath = path.join(modelsDir, `${model}.glb`);
  fs.writeFileSync(filePath, glbData);
  console.log(`Created ${model}.glb`);
});

console.log('GLB files created successfully!'); 