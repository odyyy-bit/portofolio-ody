import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Projects.css';

export default function Projects({ categories, projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Karya &amp;"
          highlight="Proyek Pilihan"
          subtitle="Beberapa proyek yang pernah saya kerjakan. Saring berdasarkan kategori untuk melihat karya sesuai bidangnya."
        />

        <div className="project-filters reveal" role="tablist" aria-label="Filter kategori proyek">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                className={`filter-btn ${active ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
