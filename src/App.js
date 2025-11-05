import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
    document.body.style.color = "#e6e6e6";
    document.body.style.minHeight = "100vh";
    document.body.style.fontFamily = "'Poppins', sans-serif";

    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Main />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Designs />
        <Contact />
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "responsive" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-brand">SV</div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#main" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#skills" onClick={() => setIsOpen(false)}>Skills</a>
        <a href="#experience" onClick={() => setIsOpen(false)}>Experience</a>
        <a href="#education" onClick={() => setIsOpen(false)}>Education</a>
        <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
        <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
      </div>
      <div className="hamburger" onClick={toggleNavbar}>
        <div className={`line ${isOpen ? "line1" : ""}`}></div>
        <div className={`line ${isOpen ? "line2" : ""}`}></div>
        <div className={`line ${isOpen ? "line3" : ""}`}></div>
      </div>
    </nav>
  );
}

function Main() {
  const [typedText, setTypedText] = useState('');
  const texts = ["Frontend Developer", "React Specialist", "UI/UX Enthusiast"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentIndex];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, typedText.length - 1));
        setTypingSpeed(100);
      } else {
        setTypedText(currentText.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === currentText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentIndex]);

  return (
    <section className="main-section" id="main">
      <div className="main-content">
        <div className="text-container">
          <h1>
            <span className="greeting">Hi, I'm</span>
            <span className="name">Saša Vulić</span>
          </h1>
          <h2 className="typing-text">
            <span>{typedText}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="bio">
            Passionate about creating beautiful, functional web experiences with clean code and 
            intuitive user interfaces.
          </p>
          <div className="button-group">
            <a
              href="/Sasa Vulic CV.pdf"
              download="Sasa Vulic CV.pdf"
              className="button primary"
            >
              Download CV
            </a>
            <a href="#contact" className="button secondary">
              Contact Me
            </a>
          </div>
        </div>
        <div className="image-container">
          <div className="image-wrapper">
            <img src="/slike/ja.jpeg" alt="Saša Vulić" className="profile-image" />
            <div className="image-border"></div>
            <div className="tech-bubble react">React</div>
            <div className="tech-bubble js">JavaScript</div>
            <div className="tech-bubble css">CSS3</div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll down</span>
        <div className="arrow"></div>
      </div>
    </section>
  );
}

function Experience() {
  const experienceItems = [
    {
      id: 1,
      company: "ADE",
      position: "Frontend Developer",
      period: "May 2025 - Present",
      description: `I worked on building high-performance trading applications using React, TypeScript, Zustand, SharedWorker, WebSocket, and IndexedDB. I focused on creating real-time, data-driven interfaces — including virtualized tables and custom CRUD operations — optimized for speed, scalability, and smooth user experience. My work involved deep optimization of state management, data synchronization, and real-time rendering, ensuring reliable and efficient performance in demanding trading environments.`,
      logo: "slike/ade.jpeg"
    }
  ];

  return (
    <section className="experience-section" id="experience">
      <h2 className="section-title">
        <span>Professional</span>
        <span>Experience</span>
      </h2>
      <div className="timeline">
        {experienceItems.map((exp) => (
          <div className="timeline-item" key={exp.id}>
            <div className="timeline-content">
              <div className="timeline-header">
                <img src={exp.logo} alt={exp.company} className="company-logo" />
                <div>
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p className="period">{exp.period}</p>
                </div>
              </div>
              <p className="experience-description">{exp.description}</p>
            </div>
            <div className="timeline-marker"></div>
          </div>
        ))}
      </div>
    </section>
  );
}


function Skills() {
  const skills = [
    { name: "HTML", level: 100, icon: "slike/html.png" },
    { name: "CSS", level: 100, icon: "slike/css.png" },
    { name: "JavaScript", level: 85, icon: "slike/js.png" },
    { name: "TypeScript", level: 85, icon: "slike/ts.png" },
    { name: "React", level: 80, icon: "slike/react.png" },
    { name: "Node.js", level: 40, icon: "slike/node.png" },
    { name: "SQL", level: 50, icon: "slike/sql.png" },
    { name: "MongoDB", level: 50, icon: "slike/mongodb.png" },
    { name: "WordPress", level: 60, icon: "slike/worpdres.png" },
    { name: "Figma", level: 40, icon: "slike/figma.png" },
    { name: "Adobe Photoshop", level: 95, icon: "slike/photoshop.png" },
    {name: "Adobe Premiere Pro", level: 90, icon: "slike/premiere.png"}
  ];

  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title">
        <span>Technical</span>
        <span>Skills</span>
      </h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-info">
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              <span className="skill-name">{skill.name}</span>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-progress" 
                style={{ width: `${skill.level}%` }}
                data-level={skill.level}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  const educationItems = [
    {
      id: 1,
      level: "College",
      institution: "Faculty of Technical Sciences",
      field: "Information Technologies",
      year: "2024",
      icon: "slike/ftn.png"
    },
    {
      id: 2,
      level: "High School",
      institution: "Electrotechnical School - Nikola Tesla",
      field: "Multimedia Electrical Technician",
      year: "2021",
      icon: "slike/tesla.png"
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      issuer: "Udemy - Jonas Schmedtmann",
      date: "May 2024"
    },
    {
      id: 2,
      title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
      issuer: "Udemy - Jonas Schmedtmann",
      date: "March 2025"
    }
  ];

  return (
    <section className="education-section" id="education">
      <h2 className="section-title">
        <span>Education &</span>
        <span>Certifications</span>
      </h2>
      
      <div className="education-container">
        {educationItems.map((edu) => (
          <div className="education-card" key={edu.id}>
            <div className="education-icon">
              <img src={edu.icon} alt={edu.level} />
            </div>
            <div className="education-content">
              <h3>{edu.level}</h3>
              <p className="institution">{edu.institution}</p>
              <p className="field">{edu.field}</p>
              <p className="year">Graduated: {edu.year}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="certificates-container">
        <h3 className="certificates-title">Certificates</h3>
        <div className="certificates-list">
          {certificates.map((cert) => (
            <div className="certificate-item" key={cert.id}>
              <div className="certificate-badge">
                <svg viewBox="0 0 24 24">
                  <path d="M12,2L3,7V17L12,22L21,17V7L12,2M12,12L17,10.2V15.6L12,18L7,15.6V10.2L12,12M12,12L17,10.2L12,7L7,10.2L12,12Z" />
                </svg>
              </div>
              <div className="certificate-details">
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
                <p className="certificate-date">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Crni Dečak Official Site",
      description: "Official website for a musical artist with custom CMS integration.",
      image: "/slike/crnidecak.png",
      technologies: ["React", "Node.js", "CSS"],
      link: "https://crni-decak.vercel.app/"
    },
    {
      id: 2,
      title: "Između Korica",
      description: "Book review platform with user authentication and database integration.",
      image: "/slike/izmedjukorica.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "JWT"],
      link: "https://izmedju-korica-frontend.vercel.app/"
    },
    {
      id: 3,
      title: "Umbrella Weather",
      description: "Weather application with location-based forecasts.",
      image: "/slike/umbrella.png",
      technologies: ["React", "Tailwind"],
      link: "https://umbrella-weather-omega.vercel.app/"
    },
    {
      id: 4,
      title: "Rap station",
      description: "Music streaming platform in early development. Frontend is fully functional, while backend, including user authentication and profile creation, is still in progress.",
      image: "/slike/rapStation.png",
      technologies: ["React", "Tailwind", "Zustand"],
      link: "https://rap-station.vercel.app/"
    },
    {
      id: 5,
      title: "Quiz App",
      description: "Interactive knowledge testing application with score tracking.",
      image: "/slike/kviz.png",
      technologies: ["React", "CSS"],
      link: "https://kviz-znanja.vercel.app/"
    },
    {
      id: 6,
      title: "Bella Cosmetics",
      description: "Beauty products website with responsive design. Created per client’s request. Demo version. School project.",
      image: "/slike/bella.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://sasavulic7.github.io/Jelena/index.html"
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">
        <span>Featured</span>
        <span>Projects</span>
      </h2>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project
                <svg viewBox="0 0 24 24">
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Designs() {
  

  return (
    <section className="designs-section" id="designs">
      
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">
        <span>Get In</span>
        <span>Touch</span>
      </h2>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.5C17.75,14.78 18.11,14.9 18.5,14.9C18.92,14.9 19.27,14.78 19.57,14.5C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
              </svg>
            </div>
            <div className="contact-details">
              <h3>Phone</h3>
              <a href="tel:+381638467816">+381 63 8467816</a>
            </div>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
              </svg>
            </div>
            <div className="contact-details">
              <h3>Email</h3>
              <a href="mailto:sasazvulic@gmail.com">sasazvulic@gmail.com</a>
            </div>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.5C17.75,14.78 18.11,14.9 18.5,14.9C18.92,14.9 19.27,14.78 19.57,14.5C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
              </svg>
            </div>
            <div className="contact-details">
              <h3>Social</h3>
              <div className="social-links">
                <a href="https://www.instagram.com/mr.vulic/" target="_blank" rel="noopener noreferrer">
                  <img src="slike/instagram.png" alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/in/sasa-vulic-623367322/" target="_blank" rel="noopener noreferrer">
                  <img src="slike/linkedin.png" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
              <svg viewBox="0 0 24 24">
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            </button>
            
            {isSubmitted && (
              <div className="form-success">
                <svg viewBox="0 0 24 24">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
                <p>Your message has been sent successfully!</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
