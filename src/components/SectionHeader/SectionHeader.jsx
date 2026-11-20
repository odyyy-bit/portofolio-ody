import './SectionHeader.css';

export default function SectionHeader({ label, title, highlight, subtitle }) {
  return (
    <div className="section-header reveal">
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
