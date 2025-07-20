import React from 'react';

const Skills = () => {
  const skills = [
    {
      title: "Frontend Development",
      icon: "💻",
      description: "React, JavaScript, HTML5, CSS3, Responsive Design"
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Node.js, Express, APIs, Database Design"
    },
    {
      title: "Mobile Development",
      icon: "📱",
      description: "React Native, Cross-platform Development"
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      description: "Git, VS Code, npm, Webpack, Vite"
    },
    {
      title: "UI/UX Design",
      icon: "🎨",
      description: "Figma, User Experience, Interface Design"
    },
    {
      title: "Problem Solving",
      icon: "🧩",
      description: "Algorithms, Data Structures, Debugging"
    }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
