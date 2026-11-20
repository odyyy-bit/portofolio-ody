import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ brandName = 'Odyantoro', theme = 'dark', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          {brandName}
          <span>.</span>
        </a>

        <nav className="navbar-links" aria-label="Navigasi Utama">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar-controls">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Ubah ke mode terang (putih)' : 'Ubah ke mode gelap (hitam)'}
            title={theme === 'dark' ? 'Mode Putih' : 'Mode Hitam'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="theme-toggle-label">{theme === 'dark' ? 'Putih' : 'Hitam'}</span>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}>
        <nav className="mobile-drawer-links" aria-label="Navigasi Mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
