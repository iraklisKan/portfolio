import React, { useState } from 'react';

const Projects = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Friends Management App",
      description: "A full-stack CRUD application for managing friends with auto-generated avatars. Built with Python Flask backend and React frontend using Chakra UI components.",
      image: "👥",
      technologies: ["React", "Flask", "Python", "SQLAlchemy", "Chakra UI", "SQLite"],
      liveUrl: "#",
      githubUrl: "https://github.com/iraklisKan/python_react_chatapp"
    },
    {
      title: "Python Real-Time Chat App",
      description: "A real-time chat application built with Python Flask and Socket.IO for instant messaging with automatic user generation and live broadcasting. 💡 Tip: Open in two separate tabs to see real-time messaging between sender and receiver!",
      image: "💬",
      technologies: ["Python", "Flask", "Socket.IO", "WebSockets", "HTML/CSS", "JavaScript"],
      liveUrl: "https://python-chatapp-gjoe.onrender.com",
      githubUrl: "https://github.com/iraklisKan/python_Chatapp"
    },
    {
      title: "MERN Stack Note-Taking App",
      description: "A modern note-taking app built with MongoDB, Express, React, and Node.js. Features include creating, editing, and deleting notes, instant updates, rate limiting, and a beautiful responsive UI using Tailwind CSS and DaisyUI.",
      image: "📝",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "DaisyUI"],
      liveUrl: "https://mernstack-notetaking-app-node.onrender.com/",
      githubUrl: "https://github.com/iraklisKan/mernstack_Notetaking_app"
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
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
      image: "🛒",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
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
