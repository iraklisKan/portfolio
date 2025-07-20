import React, { useState } from 'react';

const Projects = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
      image: "🛒",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "📝",
      technologies: ["React", "Firebase", "Material-UI"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts and interactive charts.",
      image: "🌤️",
      technologies: ["JavaScript", "API Integration", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing projects and skills with smooth animations.",
      image: "🎨",
      technologies: ["React", "CSS3", "Vite"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Social Media App",
      description: "A social networking platform with user profiles, posts, likes, and real-time messaging.",
      image: "📱",
      technologies: ["React Native", "Express", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Expense Tracker",
      description: "A personal finance management app with budget tracking and expense categorization.",
      image: "💰",
      technologies: ["React", "Redux", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const handleProjectClick = (project, type) => {
    setSelectedProject({ ...project, linkType: type });
    setShowAnimation(true);
  };

  const handleNext = () => {
    if (selectedProject) {
      const url = selectedProject.linkType === 'live' ? selectedProject.liveUrl : selectedProject.githubUrl;
      if (url !== '#') {
        window.open(url, '_blank');
      }
    }
    setShowAnimation(false);
    setSelectedProject(null);
  };

  const handleClose = () => {
    setShowAnimation(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                {project.image}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <button 
                    onClick={() => handleProjectClick(project, 'live')}
                    className="project-link"
                  >
                    Live Demo
                  </button>
                  <button 
                    onClick={() => handleProjectClick(project, 'github')}
                    className="project-link"
                  >
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Animated Loading Screen */}
    {showAnimation && selectedProject && (
      <div className="project-animation-overlay">
        <div className="project-animation-container">
          <div className="animation-content">
            <div className="project-preview">
              <div className="preview-icon">{selectedProject.image}</div>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <div className="tech-showcase">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-bubble">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="loading-animation">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
            </div>
            
            <div className="animation-controls">
              <button onClick={handleNext} className="next-btn">
                Enter Project
              </button>
              <button onClick={handleClose} className="close-btn">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Projects;
