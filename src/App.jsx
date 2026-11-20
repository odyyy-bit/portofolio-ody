import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './sections/Home/Home';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';
import Education from './sections/Education/Education';
import Certificates from './sections/Certificates/Certificates';
import Contact from './sections/Contact/Contact';

import { profileData } from './data/profileData';
import { skillsShowcaseData } from './data/skillsData';
import { projectCategories, projectsData } from './data/projectsData';
import { experienceData } from './data/experienceData';
import { educationData } from './data/educationData';
import { certificatesData } from './data/certificatesData';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('odyantoro-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('odyantoro-theme', theme);
    } catch {
      // Ignore storage error
    }
  }, [theme]);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-wrapper">
      <LoadingScreen />
      <ParticleBackground theme={theme} />
      <Navbar brandName={profileData.brandName} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Home profile={profileData} />
        <About about={profileData.about} cv={profileData.cv} />
        <Skills showcase={skillsShowcaseData} />
        <Projects categories={projectCategories} projects={projectsData} />
        <Experience experiences={experienceData} />
        <Education educations={educationData} />
        <Certificates certificates={certificatesData} />
        <Contact contact={profileData.contact} />
      </main>

      <Footer siteName={profileData.siteName} name={profileData.name} />
    </div>
  );
}
