
import React, { useEffect, useRef } from 'react';

interface Raindrop {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const RainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raindrops = useRef<Raindrop[]>([]);
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

    // Initialize raindrops
    const initRaindrops = () => {
      // More raindrops for heavier rain effect
      const dropCount = Math.floor(window.innerWidth / 15);
      const drops: Raindrop[] = [];

      for (let i = 0; i < dropCount; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above viewport
          size: Math.random() * 3 + 3, // Smaller drops (3-6px)
          speed: Math.random() * 7 + 10, // Much faster fall (10-17px per frame)
          opacity: Math.random() * 0.3 + 0.5, // Similar opacity (0.5-0.8)
        });
      }

      raindrops.current = drops;
    };

    initRaindrops();

    // Draw a raindrop
    const drawRaindrop = (x: number, y: number, size: number, opacity: number) => {
      // Save current state
      ctx.save();
      
      // Set global alpha for entire raindrop
      ctx.globalAlpha = opacity;
      
      // Draw teardrop shape
      ctx.beginPath();
      
      // Draw the main teardrop shape (same as before)
      const width = size;
      const height = size * 1.5;
      
      // Start at the top point (pointed end)
      ctx.moveTo(x, y);
      
      // Draw the right curve
      ctx.bezierCurveTo(
        x + width / 2, y + height / 3,
        x + width, y + height / 2,
        x, y + height
      );
      
      // Draw the left curve back to top
      ctx.bezierCurveTo(
        x - width, y + height / 2,
        x - width / 2, y + height / 3,
        x, y
      );
      
      // Create a water-like gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, 'rgba(200, 240, 255, 0.9)');  // Light blue at top
      gradient.addColorStop(0.6, 'rgba(170, 220, 255, 0.9)'); // Mid blue
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');   // White at bottom
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add highlight to make it look wet and reflective
      ctx.beginPath();
      const hlSize = size * 0.25;
      ctx.ellipse(
        x - hlSize, 
        y + height * 0.25, 
        hlSize, 
        hlSize * 1.5, 
        -Math.PI / 4, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
      
      // Restore context state
      ctx.restore();
    };

    // Add trail effect (optional)
    const drawRainTrail = (x: number, y: number, size: number, speed: number, opacity: number) => {
      const trailLength = Math.min(speed * 0.8, 20); // Trail length proportional to speed
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - trailLength);
      
      // Create gradient for trail
      const gradient = ctx.createLinearGradient(x, y, x, y - trailLength);
      gradient.addColorStop(0, `rgba(200, 240, 255, ${opacity})`);
      gradient.addColorStop(1, `rgba(200, 240, 255, 0)`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = size * 0.5;
      ctx.stroke();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw raindrops
      raindrops.current.forEach(drop => {
        // Draw trail for faster drops
        if (drop.speed > 12) {
          drawRainTrail(drop.x, drop.y, drop.size, drop.speed, drop.opacity);
        }
        
        // Draw raindrop
        drawRaindrop(drop.x, drop.y, drop.size, drop.opacity);
        
        // Update position
        drop.y += drop.speed;
        
        // Add some wind effect (slight horizontal movement)
        drop.x += Math.sin(Date.now() / 2000 + drop.y / 100) * 0.3;
        
        // Reset when offscreen
        if (drop.y > canvas.height) {
          drop.y = -drop.size * 2;
          drop.x = Math.random() * canvas.width;
          // Slightly randomize speed on reset
          drop.speed = Math.random() * 7 + 10;
        }
      });
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

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
    />
  );
};

export default RainEffect;
