import React, { useState } from 'react';

const Projects = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Categorized projects
  const pythonProjects = [
    {
      title: "Friends Management App",
      description: "A full-stack CRUD application for managing friends with auto-generated avatars. Built with Python Flask backend and React frontend using Chakra UI components. Features include adding, editing, and deleting friends with real-time updates, responsive design, and automatic avatar generation based on gender selection.",
      image: "👥",
      technologies: ["React", "Flask", "Python", "SQLAlchemy", "Chakra UI", "SQLite"],
      liveUrl: "#contact",
      githubUrl: "https://github.com/iraklisKan/python_react_chatapp"
    },
    {
      title: "Python Real-Time Chat App",
      description: "A real-time chat application built with Python Flask and Socket.IO for instant messaging. Features include automatic user generation with random avatars, live message broadcasting, username updates, and responsive design. Users can join instantly and communicate in real-time with automatic avatar assignment. 💡 Tip: Open the live demo in two separate tabs to see real-time messaging between sender and receiver!",
      image: "💬",
      technologies: ["Python", "Flask", "Socket.IO", "WebSockets", "HTML/CSS", "JavaScript"],
      liveUrl: "https://python-chatapp-gjoe.onrender.com",
      githubUrl: "https://github.com/iraklisKan/python_Chatapp"
    },
    {
      title: "Python Web App ToDo List",
      description: "A modern web-based todo list application built with Python and Streamlit. Features an intuitive web interface for task management, allowing users to add, view, edit, and delete tasks through a clean and responsive web UI. Deployed on Streamlit Cloud for easy access and demonstration.",
      image: "📝",
      technologies: ["Python", "Streamlit", "Web App", "Task Management", "Cloud Deployment"],
      liveUrl: "https://irakliskan-python-todo-list-todolistweb-7mqa2v.streamlit.app/",
      githubUrl: "https://github.com/iraklisKan/python-todo-list"
    },
    {
      title: "Django Application Form System",
      description: "A comprehensive web application built with Django featuring user authentication, admin panel management, and a dynamic application form system. Includes secure user login functionality, administrative controls, and a robust backend for managing application submissions and user data.",
      image: "🎯",
      technologies: ["Python", "Django", "SQLite", "HTML/CSS", "Authentication", "Admin Panel"],
      liveUrl: "https://irakliskan.github.io/Simple-Application-Form-Using-Django-/",
      githubUrl: "https://github.com/iraklisKan/Simple-Application-Form-Using-Django-"
    },
    {
      title: "Email Daily News with API",
      description: "An automated Python application that fetches daily news using external APIs and sends personalized email newsletters. Features news aggregation from multiple sources, email template customization, scheduled delivery, and API integration for real-time news updates. Demonstrates proficiency in API consumption, email automation, and task scheduling.",
      image: "📧",
      technologies: ["Python", "API Integration", "Email Automation", "News API", "SMTP", "Task Scheduling"],
      liveUrl: "#contact",
      githubUrl: "https://github.com/iraklisKan/Email-daily-news-with-Api-Python"
    }
  ];

  const nodeProjects = [
    {
      title: "MERN Stack Note-Taking App",
      description: "A modern note-taking app built with MongoDB, Express, React, and Node.js. Features include creating, editing, and deleting notes, instant updates, rate limiting, and a beautiful responsive UI using Tailwind CSS and DaisyUI.",
      image: "📝",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "DaisyUI"],
      liveUrl: "https://mernstack-notetaking-app-node.onrender.com/",
      githubUrl: "https://github.com/iraklisKan/mernstack_Notetaking_app"
    }
  ];

  const otherProjects = [
    {
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my skills and experience as a Full Stack Web Developer. Features smooth animations, interactive elements, professional timeline layout, and modular architecture with glass-morphism design effects.",
      image: "💼",
      technologies: ["HTML5", "CSS3", "JavaScript", "Vite", "Responsive Design"],
      liveUrl: "https://irakliskan.github.io/portfolio/",
      githubUrl: "https://github.com/iraklisKan/portfolio"
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
        if (url.startsWith('#')) {
          // Handle anchor links
          setShowAnimation(false);
          setSelectedProject(null);
          document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.open(url, '_blank');
        }
      }
    }
    setShowAnimation(false);
    setSelectedProject(null);
  };

  const handleClose = () => {
    setShowAnimation(false);
    setSelectedProject(null);
  };

  const ProjectGrid = ({ projects }) => (
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
                {project.liveUrl.startsWith('#') ? 'Request Demo' : 'Live Demo'}
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
  );

  return (
    <>
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title gradient-text">Featured Projects</h2>
          
          {/* Python Projects Section */}
          <div className="projects-category">
            <h3 className="projects-category-title">🐍 Python Projects</h3>
            <ProjectGrid projects={pythonProjects} />
          </div>
          
          {/* Node.js Projects Section */}
          <div className="projects-category">
            <h3 className="projects-category-title">📗 Node.js Projects</h3>
            <ProjectGrid projects={nodeProjects} />
          </div>
          
          {/* Other Projects Section */}
          <div className="projects-category">
            <h3 className="projects-category-title">🌐 Other Projects</h3>
            <ProjectGrid projects={otherProjects} />
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
