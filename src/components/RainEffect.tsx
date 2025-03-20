
import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  length: number;
  sway: number;
  swayDirection: number;
  swaySpeed: number;
  color: string; // Add color property
  rotation: number; // Add rotation for more dynamic movement
  pulsating: boolean; // Some droplets will pulsate
  pulseSpeed: number; // How fast it pulsates
  pulseDirection: number; // Pulse growing or shrinking
}

const RainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const droplets = useRef<Droplet[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Funky color palette
  const funkyColors = [
    '#9b87f5', // Purple
    '#D946EF', // Magenta
    '#F97316', // Orange
    '#0EA5E9', // Blue
    '#8B5CF6', // Violet
    '#06b6d4', // Cyan
    '#22d3ee', // Light Cyan
    '#fb7185', // Pink
    '#fcd34d', // Yellow
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full viewport size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create initial droplets
    const createDroplets = () => {
      const dropletCount = Math.floor(window.innerWidth / 10); // More droplets for denser effect
      const newDroplets: Droplet[] = [];

      for (let i = 0; i < dropletCount; i++) {
        const size = Math.random() * 2.5 + 1.5; // Larger droplets for more visual impact
        const randomColorIndex = Math.floor(Math.random() * funkyColors.length);
        
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the viewport
          size: size,
          speed: Math.random() * 6 + 4, // Varied speeds for more dynamic effect
          opacity: Math.random() * 0.6 + 0.4, // More opacity for vibrant look
          length: size * (Math.random() * 5 + 3), // Varied length
          sway: 0,
          swayDirection: Math.random() > 0.5 ? 1 : -1,
          swaySpeed: Math.random() * 0.1 + 0.05, // More pronounced sway
          color: funkyColors[randomColorIndex], // Random funky color
          rotation: Math.random() * Math.PI, // Random rotation
          pulsating: Math.random() > 0.7, // 30% of droplets will pulsate
          pulseSpeed: Math.random() * 0.05 + 0.02,
          pulseDirection: 1, // Start growing
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Draw funky drop shape
    const drawFunkyDrop = (
      x: number, 
      y: number, 
      size: number, 
      length: number, 
      opacity: number, 
      color: string,
      rotation: number
    ) => {
      ctx.save(); // Save the current state
      ctx.translate(x, y); // Move to the droplet position
      ctx.rotate(rotation); // Apply rotation
      
      // Draw the funky teardrop shape
      ctx.beginPath();
      
      // Start at the bottom of the teardrop
      ctx.moveTo(0, length);
      
      // Draw left side with more exaggerated curve
      ctx.quadraticCurveTo(
        -size, length * 0.6, 
        -size * 1.2, length * 0.3
      );
      
      // Draw top rounded part
      ctx.quadraticCurveTo(
        -size, -size/2, 
        0, -size
      );
      
      // Draw right side with exaggerated curve
      ctx.quadraticCurveTo(
        size, -size/2, 
        size * 1.2, length * 0.3
      );
      
      // Close the path back to the starting point
      ctx.quadraticCurveTo(
        size, length * 0.6, 
        0, length
      );
      
      // Apply funky gradient
      const gradient = ctx.createLinearGradient(0, -size, 0, length);
      gradient.addColorStop(0, `${color}99`); // Semi-transparent at top
      gradient.addColorStop(0.5, color); // Full color in middle
      gradient.addColorStop(1, `${color}88`); // Slightly transparent at bottom
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight/sparkle effect
      ctx.beginPath();
      ctx.arc(-size/2, -size/3, size/3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.fill();
      
      ctx.restore(); // Restore the state
    };

    // Animation function
    const draw = () => {
      // Clear canvas with slight fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update droplets
      droplets.current.forEach((droplet) => {
        // Apply sway movement
        droplet.sway += droplet.swaySpeed * droplet.swayDirection;
        
        // Limit sway amount and change direction when limit reached
        if (Math.abs(droplet.sway) > 2) {
          droplet.swayDirection *= -1;
        }
        
        // Handle pulsating effect
        if (droplet.pulsating) {
          // Change size based on pulse
          const pulseChange = droplet.pulseSpeed * droplet.pulseDirection;
          droplet.size += pulseChange;
          
          // Reverse direction if size limits reached
          if (droplet.size > 4 || droplet.size < 1.5) {
            droplet.pulseDirection *= -1;
          }
        }
        
        // Draw the funky droplet
        drawFunkyDrop(
          droplet.x + droplet.sway, 
          droplet.y, 
          droplet.size, 
          droplet.length, 
          droplet.opacity,
          droplet.color,
          droplet.rotation
        );

        // Update position
        droplet.y += droplet.speed;
        droplet.rotation += 0.002 * droplet.swayDirection; // Subtle rotation change

        // Reset if off screen
        if (droplet.y > canvas.height) {
          droplet.y = Math.random() * -50 - 10; // Randomize starting position above screen
          droplet.x = Math.random() * canvas.width;
          // Occasionally change color when recycling
          if (Math.random() > 0.7) {
            const newColorIndex = Math.floor(Math.random() * funkyColors.length);
            droplet.color = funkyColors[newColorIndex];
          }
          // Randomize speed slightly on reset
          droplet.speed = Math.random() * 6 + 4;
        }
      });

      // Continue animation
      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ 
        pointerEvents: 'none',
        mixBlendMode: 'screen' // Add blend mode for more vibrant effect
      }}
    />
  );
};

export default RainEffect;
