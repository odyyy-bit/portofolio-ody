import { Compass, Download, Sparkles, User } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './About.css';

export default function About({ about, cv }) {
  const handleDownloadCv = async () => {
    const cvUrl = `/${cv?.fileName || 'CV_Odyantoro.html'}`;
    const downloadName = cv?.downloadName || 'CV_Odyantoro.html';
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

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <SectionHeader
          label="About Me"
          title="Mengenal"
          highlight="Lebih Dekat"
          subtitle="Profil, latar belakang pendidikan, pengalaman PKL, dan biodata ringkas."
        />

        <div className="about-grid">
          <div className="about-narrative glass-card reveal">
            <div className="about-block">
              <div className="about-block-head">
                <Sparkles size={18} className="about-icon" />
                <h3>Perjalanan Belajar &amp; Pengalaman</h3>
              </div>
              {about.storyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="about-text">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about-block">
              <div className="about-block-head">
                <Compass size={18} className="about-icon" />
                <h3>Bidang &amp; Tujuan</h3>
              </div>
              <p className="about-text">{about.careerGoal}</p>
              <ul className="about-interests">
                {about.interests.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="about-biodata glass-card reveal" aria-label="Biodata">
            <div className="about-block-head">
              <User size={18} className="about-icon" />
              <h3>Biodata</h3>
            </div>

            <dl className="biodata-list">
              {about.biodata.map((entry) => (
                <div key={entry.label} className="biodata-row">
                  <dt>{entry.label}</dt>
                  <dd>{entry.value}</dd>
                </div>
              ))}
            </dl>

            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
                onClick={handleDownloadCv}
              >
                <Download size={15} />
                <span>{cv?.label || 'Download CV'}</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
