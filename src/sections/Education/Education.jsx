import { GraduationCap } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Education.css';

export default function Education({ educations }) {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <SectionHeader
          label="Education"
          title="Riwayat"
          highlight="Pendidikan"
          subtitle="Informasi institusi pendidikan, jurusan, dan periode belajar."
        />

        <div className="education-grid">
          {educations.map((edu) => (
            <article key={edu.id} className="education-card glass-card reveal">
              <div className="education-icon-wrap" aria-hidden="true">
                <GraduationCap size={22} />
              </div>

              <div className="education-content">
                <span className="education-period">{edu.period}</span>
                <h3 className="education-institution">{edu.institution}</h3>
                <p className="education-major">{edu.major}</p>
                {edu.description && <p className="education-desc">{edu.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
