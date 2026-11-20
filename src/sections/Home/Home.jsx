import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import './Home.css';

export default function Home({ profile }) {
  const typedRole = useTypingEffect(profile.typingRoles);

  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const rafRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      if (!draggingRef.current) {
        velocityRef.current = 4.2;
      }
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stiffness = 0.085;
    const damping = 0.87;

    const step = () => {
      if (!draggingRef.current) {
        const force = -stiffness * offsetRef.current;
        velocityRef.current = (velocityRef.current + force) * damping;
        offsetRef.current += velocityRef.current;

        if (Math.abs(offsetRef.current) < 0.08 && Math.abs(velocityRef.current) < 0.08) {
          offsetRef.current = 0;
          velocityRef.current = 0;
        }

        setOffsetX(offsetRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const rawTarget = dragStartOffsetRef.current + deltaX;
    const maxReach = 135;
    const clamped = Math.max(-maxReach, Math.min(maxReach, rawTarget));

    velocityRef.current = clamped - offsetRef.current;
    offsetRef.current = clamped;
    setOffsetX(clamped);
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    velocityRef.current += -offsetRef.current * 0.14;
  };

  const handleDownloadCv = async () => {
    const cvUrl = `/${profile.cv?.fileName || 'CV_Odyantoro.html'}`;
    const downloadName = profile.cv?.downloadName || 'CV_Odyantoro.html';
    try {
      const res = await fetch(cvUrl);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        return;
      }
    } catch {
      // Fallback below
    }
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  };

  const pendulumAngle = Math.max(-18, Math.min(18, -offsetX * 0.13));
  const stringLength = 88;
  const tipX = offsetX;
  const tipY = Math.sqrt(Math.max(stringLength * stringLength - offsetX * offsetX, 3600));
  const ctrlX = tipX * 0.55;
  const ctrlY = tipY * 0.42;

  return (
    <section id="home" className="section home-section">
      <div className="container home-grid">
        <div className="home-content">
          <div className="home-badge">
            <span className="status-dot" />
            <span>{profile.siteName}</span>
          </div>

          <h1 className="home-title">
            Halo, saya <span className="text-gradient">{profile.name}</span>
          </h1>

          <div className="home-role-wrap" aria-label={`Profesi: ${profile.role}`}>
            <span className="home-role-text">{typedRole || profile.role}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </div>

          <p className="home-description">{profile.heroDescription}</p>

          <div className="home-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              <span>View My Projects</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDownloadCv}
            >
              <Download size={18} />
              <span>{profile.cv?.label || 'Download CV'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              <Mail size={18} />
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        <div className="home-visual">
          <div className="lanyard-rig">
            <svg
              className="lanyard-svg"
              viewBox="-160 0 320 110"
              aria-hidden="true"
            >
              <circle cx="0" cy="6" r="5" className="lanyard-pin" />
              <path
                d={`M 0 6 Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`}
                className="lanyard-cord"
              />
              <circle cx={tipX.toFixed(1)} cy={tipY.toFixed(1)} r="4" className="lanyard-clip" />
            </svg>

            <div
              className={`lanyard-card-pivot ${isDragging ? 'is-dragging' : ''}`}
              style={{
                transform: `translate3d(${offsetX.toFixed(2)}px, 0px, 0) rotate(${pendulumAngle.toFixed(2)}deg)`,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="slider"
              tabIndex={0}
              aria-label="Geser kartu profil ke kiri atau kanan untuk memantul"
              aria-valuemin={-135}
              aria-valuemax={135}
              aria-valuenow={Math.round(offsetX)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  velocityRef.current -= 7;
                } else if (e.key === 'ArrowRight') {
                  velocityRef.current += 7;
                }
              }}
            >
              <div className="avatar-glow-ring" aria-hidden="true" />
              <div className="avatar-card glass-card">
                <div className="lanyard-hole" aria-hidden="true" />
                <img
                  src={profile.avatarUrl}
                  alt={profile.avatarAlt}
                  className="avatar-image"
                  draggable={false}
                />
                <span className="lanyard-hint">Geser kiri / kanan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
