import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

export default function ParticleBackground({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let pointer = { x: null, y: null };

    const createNodes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 28 : width < 1024 ? 46 : 68;
      const palette =
        theme === 'light'
          ? ['rgba(124, 58, 237, 0.55)', 'rgba(37, 99, 235, 0.52)', 'rgba(15, 23, 42, 0.25)']
          : ['rgba(167, 139, 250, 0.62)', 'rgba(96, 165, 250, 0.62)', 'rgba(248, 250, 252, 0.28)'];

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.48,
        vy: (Math.random() - 0.5) * 0.48,
        radius: Math.random() * 2.1 + 1.1,
        pulseOffset: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const handlePointerLeave = () => {
      pointer.x = null;
      pointer.y = null;
    };

    let tick = 0;

    const render = () => {
      tick += 0.018;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const linkDistance = width < 640 ? 105 : 138;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x <= 0 || a.x >= width) a.vx *= -1;
        if (a.y <= 0 || a.y >= height) a.vy *= -1;

        // Gentle pointer attraction
        if (pointer.x !== null && pointer.y !== null) {
          const dxp = pointer.x - a.x;
          const dyp = pointer.y - a.y;
          const distP = Math.hypot(dxp, dyp);
          if (distP > 0 && distP < 165) {
            a.x += (dxp / distP) * 0.35;
            a.y += (dyp / distP) * 0.35;
          }
        }

        // Draw connecting constellation lines
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * (theme === 'light' ? 0.2 : 0.24);
            ctx.strokeStyle =
              theme === 'light'
                ? `rgba(109, 40, 217, ${alpha.toFixed(3)})`
                : `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const pulseScale = 1 + Math.sin(tick + a.pulseOffset) * 0.25;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = a.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    createNodes();
    render();

    window.addEventListener('resize', createNodes);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', createNodes);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [theme]);

  return (
    <div className="bg-atmosphere" aria-hidden="true">
      <div className="bg-mesh-grid" />
      <div className="bg-aurora bg-aurora-one" />
      <div className="bg-aurora bg-aurora-two" />
      <canvas ref={canvasRef} className="particle-canvas" />
    </div>
  );
}
