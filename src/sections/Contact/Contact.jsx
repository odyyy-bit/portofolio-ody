import { useState } from 'react';
import { CheckCircle2, Github, Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Contact.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function SocialIcon({ id }) {
  if (id === 'github') return <Github size={18} />;
  if (id === 'instagram') return <Instagram size={18} />;
  return null;
}

export default function Contact({ contact }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState('');

  const cleanWaNumber = (contact.whatsappNumber || '').replace(/[^0-9]/g, '');
  const hasWhatsapp = cleanWaNumber.length >= 8;
  const hasEmail = Boolean(contact.email && contact.email.trim() !== '');

  const whatsappHref = hasWhatsapp
    ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
        contact.whatsappDefaultMessage || 'Halo Odyantoro!'
      )}`
    : null;

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = 'Nama wajib diisi.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Format alamat email belum valid.';
    }
    if (!formData.subject.trim()) {
      nextErrors.subject = 'Subjek pesan wajib diisi.';
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Pesan tidak boleh kosong.';
    } else if (formData.message.trim().length < 10) {
      nextErrors.message = 'Pesan minimal 10 karakter.';
    }
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submittedMessage) {
      setSubmittedMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedMessage(
      'Pesan telah tervalidasi di formulir. Hubungkan dengan layanan backend/form endpoint (seperti Formspree atau API Anda) agar pesan terkirim ke kotak masuk.'
    );
    setFormData(INITIAL_FORM);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader
          label="Contact"
          title="Hubungi"
          highlight="Saya"
          subtitle={contact.description}
        />

        <div className="contact-grid">
          <div className="contact-info glass-card reveal">
            <h3 className="contact-info-title">{contact.headingLead}</h3>
            <p className="contact-info-copy">
              Hubungi saya langsung lewat WhatsApp atau email, atau ikuti aktivitas saya di GitHub dan Instagram.
            </p>

            <div className="contact-quick-actions">
              {hasWhatsapp ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <MessageCircle size={18} />
                  <span>Chat WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary is-disabled-link"
                  disabled
                  title="Isi whatsappNumber di src/data/profileData.js"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Belum Diisi</span>
                </button>
              )}

              {hasEmail ? (
                <a href={`mailto:${contact.email}`} className="btn btn-secondary">
                  <Mail size={18} />
                  <span>{contact.email}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary is-disabled-link"
                  disabled
                  title="Isi email di src/data/profileData.js"
                >
                  <Mail size={18} />
                  <span>Email Belum Diisi</span>
                </button>
              )}
            </div>

            <div className="contact-socials-wrap">
              <span className="contact-socials-label">Media Sosial</span>
              <div className="contact-socials-list">
                {contact.socials.map((social) => {
                  const hasUrl = Boolean(social.url && social.url.trim() !== '');
                  return hasUrl ? (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                    >
                      <SocialIcon id={social.id} />
                      <span>{social.name}</span>
                    </a>
                  ) : (
                    <span
                      key={social.id}
                      className="social-pill is-unconfigured"
                      title={`Tambahkan URL ${social.name} di src/data/profileData.js`}
                    >
                      <SocialIcon id={social.id} />
                      <span>{social.name} (Belum diatur)</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <form className="contact-form glass-card reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="contact-name">Nama</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Nama lengkap Anda"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'has-error' : ''}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'has-error' : ''}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subjek</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Topik atau keperluan pesan"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? 'has-error' : ''}
              />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Pesan</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tuliskan pesan Anda..."
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'has-error' : ''}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            {submittedMessage && (
              <div className="form-success" role="status">
                <CheckCircle2 size={18} />
                <span>{submittedMessage}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary form-submit-btn">
              <Send size={17} />
              <span>Kirim Pesan</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
