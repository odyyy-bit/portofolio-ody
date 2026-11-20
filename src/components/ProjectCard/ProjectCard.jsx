import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    });
  };

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim() !== '');
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim() !== '');

  return (
    <article
      ref={cardRef}
      className="project-card glass-card reveal"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
        <span className="project-category-badge">{project.category}</span>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <ul className="project-tech-list" aria-label="Teknologi yang digunakan">
          {project.technologies.map((tech) => (
            <li key={tech} className="project-tech-tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="project-actions">
          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm is-disabled-link"
              disabled
              title="Tambahkan URL Live Demo di src/data/projectsData.js"
            >
              <ExternalLink size={15} />
              Demo Belum Tersedia
            </button>
          )}

          {hasGithubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <Github size={15} />
              GitHub
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm is-disabled-link"
              disabled
              title="Tambahkan URL GitHub di src/data/projectsData.js"
            >
              <Github size={15} />
              Repo Belum Tersedia
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
