import { useState } from 'react';
import { Award, ExternalLink, Maximize2, X } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Certificates.css';

export default function Certificates({ certificates }) {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        <SectionHeader
          label="Certificates"
          title="Galeri"
          highlight="Sertifikat"
          subtitle="Sertifikat pembelajaran atau pelatihan yang telah diperoleh. Klik kartu untuk memperbesar pratinjau."
        />

        <div className="certificates-grid">
          {certificates.map((cert) => (
            <article key={cert.id} className="certificate-card glass-card reveal">
              <div
                className="certificate-image-wrap"
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                aria-label={`Perbesar pratinjau sertifikat ${cert.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedCert(cert);
                  }
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="certificate-image"
                  loading="lazy"
                />
                <span className="certificate-zoom-badge">
                  <Maximize2 size={12} />
                  Preview
                </span>
              </div>

              <div className="certificate-body">
                <div className="certificate-meta">
                  <Award size={13} className="certificate-award-icon" />
                  <span>{cert.year}</span>
                </div>
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-issuer">{cert.issuer}</p>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    <span>Lihat Kredensial</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedCert && (
        <div
          className="cert-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
        >
          <div className="cert-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Tutup pratinjau sertifikat"
            >
              <X size={20} />
            </button>

            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="cert-modal-image"
            />
            <div className="cert-modal-info">
              <h3>{selectedCert.title}</h3>
              <p>
                {selectedCert.issuer} &bull; {selectedCert.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
