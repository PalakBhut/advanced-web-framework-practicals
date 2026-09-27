import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Footer from "../components/Footer";

function Home({ theme, onThemeToggle }) {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "C++",
    "Java",
    "Python",
    "PHP",
    "Django",
    "MySQL",
    "PostgreSQL"
  ];

  const projects = [
    {
      title: "ECOFINDS",
      description:
        "Sustainable e-commerce platform for eco-friendly products built with PHP, JavaScript, and PostgreSQL.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "PostgreSQL"]
    },
    {
      title: "Restaurant Management System",
      description:
        "Online food ordering and table booking system with a clean UI and PHP/MySQL backend.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"]
    },
    {
      title: "Shree Sales",
      description:
        "Full-stack stationery e-commerce website built using React, Django and PostgreSQL.",
      technologies: ["React", "Django", "PostgreSQL"]
    }
  ];

  const certifications = [
    "NPTEL Data Structures & Algorithms (Java)",
    "Coursera Algorithm Design",
    "Coursera Data Analysis using Python",
    "Coursera Core Java",
    "Coursera PHP Web Development",
    "AWS Foundation Training"
  ];

  const contact = {
    phone: "+91 94267 37436",
    email: "bhutpalak4@gmail.com",
    location: "Rajkot, Gujarat"
  };

  return (
    <>
      <Header
        name="Palak Bhut"
        title="Computer Engineering Student | Aspiring Full Stack Web Developer"
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      <main className="page-content">
        <About />
        <Skills skillList={skills} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} />
      </main>
      <Footer
        contact={contact.email}
        phone={contact.phone}
        email={contact.email}
        location={contact.location}
      />
    </>
  );
}

export default Home;
