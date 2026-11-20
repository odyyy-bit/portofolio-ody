import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Skills.css';

function TechAppLogo({ id, short }) {
  switch (id) {
    case 'html':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <path fill="#E34F26" d="M5 3h22l-2 22.5L16 28l-9-2.5L5 3z" />
          <path fill="#EF652A" d="M16 5v20.9l7.3-2L25 5H16z" />
          <path
            fill="#FFFFFF"
            d="M16 13.5h-4.4l-.3-3.2H16V7.2H8l.8 9.4H16v-3.1zm0 8.1l-3.6-1-.2-2.6H9.1l.4 5 6.5 1.8v-3.2z"
          />
          <path
            fill="#EBEBEB"
            d="M16 13.5v3.1h4l-.4 4-3.6 1v3.2l6.5-1.8.9-9.5H16zm0-6.3v3.1h7.7l.3-3.1H16z"
          />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <path fill="#1572B6" d="M5 3h22l-2 22.5L16 28l-9-2.5L5 3z" />
          <path fill="#33A9DC" d="M16 5v20.9l7.3-2L25 5H16z" />
          <path
            fill="#FFFFFF"
            d="M16 13.5H9.6l.3 3.1H16v-3.1zm0-6.3H8.8l.3 3.1H16V7.2zm0 14.4l-3.6-1-.2-2.6H9.1l.4 5 6.5 1.8v-3.2z"
          />
          <path
            fill="#EBEBEB"
            d="M19.9 16.6l-.4 4-3.5 1v3.2l6.5-1.8 1.2-15.8H16v3.1h4.4l-.2 3.2H16v3.1h3.9z"
          />
        </svg>
      );
    case 'js':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="5" fill="#F7DF1E" />
          <text
            x="16"
            y="22"
            textAnchor="middle"
            fill="#111827"
            fontFamily="sans-serif"
            fontWeight="800"
            fontSize="12.5"
          >
            JS
          </text>
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1.6" fill="none">
            <ellipse cx="16" cy="16" rx="12" ry="4.8" />
            <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)" />
            <ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)" />
          </g>
        </svg>
      );
    case 'php':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <ellipse cx="16" cy="16" rx="13" ry="8.5" fill="#777BB4" />
          <text
            x="16"
            y="19.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="sans-serif"
            fontWeight="800"
            fontSize="9.5"
          >
            php
          </text>
        </svg>
      );
    case 'laravel':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <path
            d="M7 8l5-2.5 5 2.5v7l5-2.5 5 2.5v6l-10 5-10-5V8z"
            fill="none"
            stroke="#FF2D20"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M12 10.5l5 2.5v7.5l-5-2.5v-7.5z" fill="#FF2D20" fillOpacity="0.25" />
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <ellipse cx="16" cy="9" rx="9" ry="3.6" fill="#4479A1" />
          <path
            d="M7 9v6c0 2 4 3.6 9 3.6s9-1.6 9-3.6V9M7 15v7c0 2 4 3.6 9 3.6s9-1.6 9-3.6v-7"
            fill="none"
            stroke="#4479A1"
            strokeWidth="2.1"
          />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 32 32" className="orbit-svg" aria-hidden="true">
          <path d="M12 5h4v7h-4a3.5 3.5 0 010-7z" fill="#F24E1E" />
          <path d="M16 5h4a3.5 3.5 0 010 7h-4V5z" fill="#FF7262" />
          <path d="M16 12h4a3.5 3.5 0 010 7h-4v-7z" fill="#1ABCFE" />
          <path d="M12 12h4v7h-4a3.5 3.5 0 010-7z" fill="#A259FF" />
          <path d="M12 19h4v3.5a3.5 3.5 0 11-4-3.5z" fill="#0ACF83" />
        </svg>
      );
    default:
      return <span className="orbit-fallback-text">{short}</span>;
  }
}

export default function Skills({ showcase }) {
  const apps = showcase?.orbitApps || [];

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader
          label="Skills"
          title="Teknologi &amp;"
          highlight="Kemampuan"
          subtitle="Ekosistem teknologi web dan aplikasi yang saya gunakan dalam pengembangan proyek."
        />

        <div className="skills-orbit-stage reveal">
          {/* Ambient Glow di belakang foto */}
          <div className="skills-center-glow" aria-hidden="true" />

          {/* Garis lintasan orbit */}
          <div className="orbit-ring orbit-ring-outer" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-inner" aria-hidden="true" />

          {/* Logo-logo aplikasi yang berputar mengelilingi foto */}
          <div className="orbit-spinner" aria-label="Logo teknologi yang dikuasai">
            {apps.map((app, index) => {
              const angle = (360 / apps.length) * index;
              return (
                <div
                  key={app.id}
                  className="orbit-slot"
                  style={{ '--angle': `${angle}deg` }}
                >
                  <div className="orbit-counter-spin">
                    <div
                      className="orbit-badge glass-card"
                      title={app.name}
                      style={{ '--app-accent': app.color }}
                    >
                      <TechAppLogo id={app.id} short={app.short} />
                      <span className="orbit-badge-name">{app.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Foto Odyantoro tanpa latar belakang di tengah */}
          <div className="skills-cutout-wrap">
            <img
              src={showcase.cutoutPhoto}
              alt={showcase.cutoutAlt}
              className="skills-cutout-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
