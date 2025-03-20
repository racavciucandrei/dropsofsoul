
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
      // Further reduce droplet count for even more sparse rain
      const dropletCount = Math.floor(window.innerWidth / 25); 
      const newDroplets: Droplet[] = [];

      for (let i = 0; i < dropletCount; i++) {
        // Maintain large droplet size (2.0-4.0px)
        const size = Math.random() * 2.0 + 2.0;
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the viewport
          size: size,
          speed: Math.random() * 4 + 4, // Slower speed between 4-8
          opacity: Math.random() * 0.4 + 0.3,
          length: size * (Math.random() * 9 + 7), // Keep long teardrop shape
          sway: 0,
          swayDirection: Math.random() > 0.5 ? 1 : -1,
          swaySpeed: Math.random() * 0.03 + 0.005, // Gentle sway
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Draw droplet with point on top like 💧
    const drawDroplet = (x: number, y: number, size: number, length: number, opacity: number) => {
      ctx.beginPath();
      
      // Start at the bottom of the droplet (rounded part)
      ctx.moveTo(x, y + length);
      
      // Draw the left side curved path (bottom half)
      ctx.quadraticCurveTo(
        x - size, y + length * 0.7,
        x - size, y + length * 0.5
      );
      
      // Draw the left side of top half (coming to a point)
      ctx.quadraticCurveTo(
        x - size * 0.8, y + length * 0.3,
        x, y
      );
      
      // Draw the right side of top half (coming to a point)
      ctx.quadraticCurveTo(
        x + size * 0.8, y + length * 0.3,
        x + size, y + length * 0.5
      );
      
      // Draw the right side curved path (bottom half)
      ctx.quadraticCurveTo(
        x + size, y + length * 0.7,
        x, y + length
      );
      
      // Create gradient for more realistic water appearance
      const gradient = ctx.createLinearGradient(x, y, x, y + length);
      gradient.addColorStop(0, `rgba(200, 230, 255, ${opacity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(210, 235, 255, ${opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.9})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight (small white dot at bottom for reflection)
      ctx.beginPath();
      ctx.arc(x, y + length * 0.8, size/3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
      ctx.fill();
    };

    // Animation function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update droplets
      droplets.current.forEach((droplet) => {
        // Apply slight horizontal sway
        droplet.sway += droplet.swaySpeed * droplet.swayDirection;
        
        // Limit sway amount and change direction when limit reached
        if (Math.abs(droplet.sway) > 1.5) {
          droplet.swayDirection *= -1;
        }
        
        // Draw droplet shape like 💧 emoji (point at top)
        drawDroplet(
          droplet.x + droplet.sway, 
          droplet.y, 
          droplet.size, 
          droplet.length, 
          droplet.opacity
        );

        // Update position
        droplet.y += droplet.speed;

        // Reset if off screen
        if (droplet.y > canvas.height) {
          droplet.y = Math.random() * -50 - 10; // Randomize starting position above screen
          droplet.x = Math.random() * canvas.width;
          // Randomize speed slightly on reset for more natural variation
          droplet.speed = Math.random() * 4 + 4;
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
