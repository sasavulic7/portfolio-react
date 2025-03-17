import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  useEffect(() => {
    document.body.style.backgroundImage = "url('/slike/pozadina.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  return (
    <div className="app-container">
      <div className="content">
        <Main />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </div>
      <Navbar />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "responsive" : ""}`}>
      <div className="icon" onClick={toggleNavbar}>
        &#9776; {/* Hamburger ikona */}
      </div>
      <ul>
        <li>
          <a href="#main">Home</a>
        </li>
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <a href="#education">Education</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

function Main() {
  return (
    <section className="main-section" id="main">
      <div className="text-container">
        <h1>Hi, I am Sasa</h1>
        <p>Frontend Developer</p>
        <div className="download-button">
          <a
            href="/Sasa Vulic - CV.pdf"
            download="Sasa Vulic CV.pdf"
            className="button"
          >
            Download CV
          </a>
        </div>
      </div>
      <div className="image-container">
        <img src="/slike/ja.jpeg" alt="Sasa" />
      </div>
    </section>
  );
}
function Skills() {
  const skillRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.innerWidth > 768) {
            // Check if not on mobile
            entry.target.classList.add("show"); // Add class when element becomes visible
          }
        });
      },
      { threshold: 0.1 }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      skillRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="skills-section" id="skills">
      <h2>Skills</h2>
      <div className="skills">
        {[
          { src: "slike/html.png", name: "HTML" },
          { src: "slike/css.png", name: "CSS" },
          { src: "slike/js.png", name: "JavaScript" },
          { src: "slike/react.png", name: "React" },
          { src: "slike/node.png", name: "Node.js" },
          { src: "slike/sql.png", name: "SQL" },
          { src: "slike/bootstrap.png", name: "Bootstrap" },
          { src: "slike/worpdres.png", name: "WordPress" }
        ].map((skill, index) => (
          <div
            className="skill"
            key={index}
            ref={(el) => (skillRefs.current[index] = el)}
          >
            <img src={skill.src} alt={skill.name} className="skill-icon" />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  const tableRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Prestanak posmatranja nakon što postane vidljiv
          }
        });
      },
      { threshold: 0.1 } // Aktivira se kad 10% tabele postane vidljivo
    );

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      if (tableRef.current) {
        observer.unobserve(tableRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Proverava da li je širina ekrana manja od 768px
    };

    handleResize(); // Poziv funkcije prilikom inicijalnog renderovanja
    window.addEventListener("resize", handleResize); // Dodavanje event listener-a

    return () => {
      window.removeEventListener("resize", handleResize); // Čišćenje event listener-a
    };
  }, []);

  return (
    <section className="education-section" id="education">
      <h2>Education</h2>
      <div className="education-table-container">
        {isMobile ? (
          <ul className="education-list">
            <li className="education-item">
              <h3>College</h3>
              <p>
                <strong>Institution:</strong> Faculty of Technical Sciences
              </p>
              <p>
                <strong>Field of Study:</strong> Information Technologies
              </p>
              <p>
                <strong>Graduation Year:</strong> 2024
              </p>
            </li>
            <li className="education-item">
              <h3>High School</h3>
              <p>
                <strong>Institution:</strong> Electrotechnical School - Nikola
                Tesla
              </p>
              <p>
                <strong>Field of Study:</strong> Multimedia Electrical
                Technician
              </p>
              <p>
                <strong>Graduation Year:</strong> 2021
              </p>
            </li>
          </ul>
        ) : (
          <table
            className={`education-table ${
              isVisible ? "table-visible" : "table-animated"
            }`}
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>Level</th>
                <th>Institution</th>
                <th>Field of Study</th>
                <th>Graduation Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>College</td>
                <td>Faculty of Technical Sciences</td>
                <td>Information Technologies</td>
                <td>2024</td>
              </tr>
              <tr>
                <td>High School</td>
                <td>Electrotechnical School - Nikola Tesla</td>
                <td>Multimedia Electrical Technician</td>
                <td>2021</td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="certificates-section">
          <h3>Certificates</h3>
          <ul className="certificates-list">
            <li>
              <strong>
                The Complete JavaScript Course 2024: From Zero to Expert!
              </strong>{" "}
              - Issued by: Udemy - Jonas Schmedtmann - Issued on: May 2024
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        <div className="project-card">
          <img
            src="/slike/crnidecak.png"
            alt="Project 1"
            className="project-image"
          />
          <h3>Crni Dečak Official Site</h3>
          <h4>Technologies: React, Node.Js, CSS</h4>
          <a href="https://crni-decak.vercel.app/">Take a look</a>
        </div>

              <div className="project-card">
          <img
            src="/slike/izmedjukorica.png"
            alt="Project 7"
            className="project-image"
          />
          <h3>Između Korica</h3>
          <h4>Technologies: React, Node.Js, Express, MongoDB, Tailwind, JWT</h4>
          <a href="https://crni-decak.vercel.app/">Take a look</a>
        </div>

        <div className="project-card">
          <img
            src="/slike/umbrella.png"
            alt="Project 2"
            className="project-image"
          />
          <h3>Umbrella Weather</h3>
          <h4>Technologies: React, Tailwind</h4>
          <a href="https://umbrella-weather-omega.vercel.app/">Take a look</a>
        </div>

        <div className="project-card">
          <img
            src="/slike/kviz.png"
            alt="Project 3"
            className="project-image"
          />
          <h3>Quiz</h3>
          <h4>Technologies: React, CSS</h4>
          <a href="https://kviz-znanja.vercel.app/">Take a look</a>
        </div>
        <div className="project-card">
          <img
            src="/slike/elegancija.png"
            alt="Project 4"
            className="project-image"
          />
          <h3>Elegancija Jewerly</h3>
          <h4>Technologies: HTML, CSS, JavaScript</h4>
          <a href="https://sasavulic7.github.io/Katarina/index.html">
            Take a look
          </a>
        </div>
        <div className="project-card">
          <img
            src="/slike/bella.png"
            alt="Project 5"
            className="project-image"
          />
          <h3>Bella Cosmetics</h3>
          <h4>Technologies: HTML, CSS, JavaScript</h4>
          <a href="https://sasavulic7.github.io/Jelena/index.html">
            Take a look
          </a>{" "}
        </div>
        <div className="project-card">
          <img
            src="/slike/salon.png"
            alt="Project 6"
            className="project-image"
          />
          <h3>Barber Shop</h3>
          <h4>Technologies: HTML, CSS, JavaScript</h4>
          <a href="https://sasavulic7.github.io/Frizerski%20salon/index.html">
            Take a look
          </a>{" "}
        </div>
              
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Poruka je uspešno poslata!");
        // Opcionalno: resetovanje forme
        event.target.reset();
      } else {
        alert(result.message || "Slanje poruke nije uspelo.");
      }
    } catch (error) {
      console.error("Greška:", error);
      alert("Greška pri slanju poruke.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Contact</h2>
      <div className="contact-info">
        <p>
          <a href="https://www.instagram.com/mr.vulic/">
            <img
              src="slike/instagram.png"
              alt="Instagram"
              className="contact-icon"
            />
            mr.vulic
          </a>
        </p>
        <p>
          <a href="https://www.linkedin.com/in/sasa-vulic-623367322/">
            <img
              src="slike/linkedin.png"
              alt="LinkedIn"
              className="contact-icon"
            />
            Saša Vulić
          </a>
        </p>
        <p>
          <a href="mailto:sasazvulic@gmail.com">
            <img src="slike/gmail.png" alt="Email" className="contact-icon" />
            sasazvulic@gmail.com
          </a>
        </p>
        <p>
          <a href="tel:+381638467816">
            <img src="slike/telefon.png" alt="Phone" className="contact-icon" />
            +381 63 8467816
          </a>
        </p>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          ></textarea>
          <input type="submit" value="Send Message" />
        </form>
      </div>
    </section>
  );
}
