
import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  length: number; // Add length property for teardrop shape
}

const RainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const droplets = useRef<Droplet[]>([]);
  const animationFrameId = useRef<number | null>(null);

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
      const dropletCount = Math.floor(window.innerWidth / 15); // Number of droplets based on screen width
      const newDroplets: Droplet[] = [];

      for (let i = 0; i < dropletCount; i++) {
        const size = Math.random() * 2 + 1; // Random size between 1-3px
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the viewport
          size: size,
          speed: Math.random() * 3 + 2, // Random speed between 2-5
          opacity: Math.random() * 0.4 + 0.2, // Random opacity
          length: size * (Math.random() * 3 + 3), // Length of teardrop proportional to size
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Draw teardrop shape
    const drawTeardrop = (x: number, y: number, size: number, length: number, opacity: number) => {
      ctx.beginPath();
      
      // Draw teardrop shape
      ctx.moveTo(x, y);
      
      // Draw the rounded top of the teardrop
      ctx.arc(x, y, size, 0, Math.PI * 2);
      
      // Draw the tapered tail
      ctx.moveTo(x, y);
      ctx.lineTo(x - size/2, y + length);
      ctx.lineTo(x + size/2, y + length);
      ctx.lineTo(x, y);
      
      // Fill with semi-transparent blue-white color
      ctx.fillStyle = `rgba(220, 240, 255, ${opacity})`;
      ctx.fill();
    };

    // Animation function
    const draw = () => {
      // Clear canvas with a transparent fill
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update droplets
      droplets.current.forEach((droplet) => {
        // Draw droplet as teardrop
        drawTeardrop(
          droplet.x, 
          droplet.y, 
          droplet.size, 
          droplet.length, 
          droplet.opacity
        );

        // Update position
        droplet.y += droplet.speed;

        // Reset if off screen
        if (droplet.y > canvas.height) {
          droplet.y = -10;
          droplet.x = Math.random() * canvas.width;
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
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default RainEffect;
