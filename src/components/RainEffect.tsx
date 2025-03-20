import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  length: number;
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

    // Create initial droplets - moderate density
    const createDroplets = () => {
      const dropletCount = Math.floor(window.innerWidth / 15); // Increased density from 25 to 15
      const newDroplets: Droplet[] = [];

      for (let i = 0; i < dropletCount; i++) {
        const size = Math.random() * 1 + 0.5; // Keep the same size
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1,
          size: size,
          speed: Math.random() * 4 + 3,
          opacity: Math.random() * 0.3 + 0.1,
          length: size * (Math.random() * 3 + 3),
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Draw simple raindrop
    const drawRaindrop = (
      x: number, 
      y: number, 
      size: number, 
      length: number, 
      opacity: number,
    ) => {
      // Draw a simple line for raindrop
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
      ctx.strokeStyle = `rgba(184, 212, 242, ${opacity})`;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    // Animation function
    const draw = () => {
      // Clear canvas completely for cleaner look
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update droplets
      droplets.current.forEach((droplet) => {
        // Draw the raindrop
        drawRaindrop(
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
          droplet.y = Math.random() * -100 - 10; // Start higher above screen
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
