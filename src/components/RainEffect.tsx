
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
        // Increase minimum size for larger droplets (2.5-4.5px)
        const size = Math.random() * 2.0 + 2.5;
        newDroplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the viewport
          size: size,
          speed: Math.random() * 3 + 3, // Even slower speed between 3-6
          opacity: Math.random() * 0.5 + 0.4, // Slightly higher opacity for visibility
          length: size * (Math.random() * 10 + 8), // Longer teardrop shape
          sway: 0,
          swayDirection: Math.random() > 0.5 ? 1 : -1,
          swaySpeed: Math.random() * 0.02 + 0.002, // More subtle sway
        });
      }

      droplets.current = newDroplets;
    };

    createDroplets();

    // Draw a more realistic water droplet
    const drawDroplet = (x: number, y: number, size: number, length: number, opacity: number) => {
      ctx.beginPath();
      
      // More bulbous bottom part and tapered top like 💧
      ctx.moveTo(x, y); // Start at the top point
      
      // Draw right curve - starting from top point
      ctx.bezierCurveTo(
        x + size * 0.5, y + length * 0.3, // control point 1
        x + size * 1.2, y + length * 0.6, // control point 2
        x, y + length // end point (bottom)
      );
      
      // Draw left curve - completing the droplet
      ctx.bezierCurveTo(
        x - size * 1.2, y + length * 0.6, // control point 1
        x - size * 0.5, y + length * 0.3, // control point 2
        x, y // back to start point (top)
      );
      
      // Add a beautiful water-like gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + length);
      gradient.addColorStop(0, `rgba(210, 240, 255, ${opacity * 0.9})`); // Lighter blue at top
      gradient.addColorStop(0.2, `rgba(200, 235, 255, ${opacity})`);
      gradient.addColorStop(0.7, `rgba(180, 225, 255, ${opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`); // White at bottom
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight (small white oval reflection)
      ctx.beginPath();
      ctx.ellipse(
        x - size * 0.3, // x position, slightly off-center
        y + length * 0.25, // y position, near the top
        size * 0.25, // x radius 
        size * 0.5, // y radius
        Math.PI / 4, // rotation
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.fill();
      
      // Add a smaller second highlight
      ctx.beginPath();
      ctx.ellipse(
        x + size * 0.2, // x position, opposite side
        y + length * 0.5, // y position, middle
        size * 0.15, // smaller x radius
        size * 0.3, // smaller y radius
        -Math.PI / 3, // different rotation
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
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
        
        // Draw realistic droplet
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
          droplet.speed = Math.random() * 3 + 3;
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
