
"use client";

import { useState, useEffect } from 'react';

import MetallicPaint from './MetallicPaint/MetallicPaint';

const Metalic = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    async function loadDefaultImage() {
      try {
        // Create a simple canvas-based fallback instead of loading the SVG
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Create a simple shape for the metallic effect
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(100, 100, 80, 0, 2 * Math.PI);
          ctx.fill();
          
          const imageData = ctx.getImageData(0, 0, 200, 200);
          setImageData(imageData);
        }
      } catch (err) {
        console.error("Error creating fallback image:", err);
      }
    }

    loadDefaultImage();
  }, [isClient]);

  // Don't render anything on server-side
  if (!isClient) {
    return <div style={{ width: '100%', height: '100vh' }} />;
  }

  // Don't render MetallicPaint until we have imageData
  if (!imageData) {
    return <div style={{ width: '100%', height: '100vh' }} />;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MetallicPaint 
        imageData={imageData} 
        params={{ edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07 }} 
      />
    </div>
  );
}

export default Metalic;