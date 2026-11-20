import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer({ siteName = 'Odyantoro Portfolio', name = 'Odyantoro' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} <strong>{name}</strong> &mdash; {siteName}. Dibangun dengan React &amp; Vite.
        </p>

        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Kembali ke atas halaman"
        >
          <ArrowUp size={16} />
          <span>Ke Atas</span>
        </button>
      </div>
    </footer>
  );
}
