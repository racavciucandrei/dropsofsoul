
import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
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
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the viewport
          size: Math.random() * 3 + 1, // Random size between 1-4px
          speed: Math.random() * 2 + 1, // Random speed
          opacity: Math.random() * 0.5 + 0.3, // Random opacity
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Animation function
    const draw = () => {
      // Clear canvas with a transparent fill to create trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update droplets
      droplets.current.forEach((droplet, index) => {
        // Draw droplet
        ctx.beginPath();
        ctx.arc(droplet.x, droplet.y, droplet.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 220, ${droplet.opacity})`;
        ctx.fill();

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
