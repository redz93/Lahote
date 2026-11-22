import { useEffect, useRef } from 'react';

// Neige décorative (canvas). Désactivée si l'utilisateur préfère réduire les animations.
export default function Snow({ count = 70 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = ref.current, x = c.getContext('2d');
    let w, h, raf;
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const n = window.innerWidth < 760 ? Math.round(count / 2) : count;
    const flakes = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 3,
      v: 0.3 + Math.random() * 0.9, d: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      x.clearRect(0, 0, w, h);
      x.fillStyle = 'rgba(255,255,255,.92)'; x.shadowColor = 'rgba(73,55,47,.35)'; x.shadowBlur = 3;
      for (const f of flakes) {
        f.y += f.v; f.d += 0.01; f.x += Math.sin(f.d) * 0.4;
        if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
        x.beginPath(); x.arc(f.x, f.y, f.r, 0, Math.PI * 2); x.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);
  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}
