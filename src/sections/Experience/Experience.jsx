import { Briefcase } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Experience.css';

export default function Experience({ experiences }) {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <SectionHeader
          label="Experience"
          title="Riwayat"
          highlight="Pengalaman"
          subtitle="Linimasa pengalaman magang, organisasi, atau proyek nyata (tanpa data fiktif)."
        />

        <div className="timeline">
          {experiences.map((item) => (
            <article key={item.id} className="timeline-item reveal">
              <div className="timeline-marker" aria-hidden="true">
                <Briefcase size={15} />
              </div>

              <div className="timeline-card glass-card">
                <div className="timeline-meta">
                  <span className="timeline-period">{item.period}</span>
                  {item.type && <span className="timeline-badge">{item.type}</span>}
                </div>

                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-org">{item.organization}</p>
                <p className="timeline-desc">{item.description}</p>

                {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                  <ul className="timeline-highlights">
                    {item.highlights.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
