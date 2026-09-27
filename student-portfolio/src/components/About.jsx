function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <span className="section-tag">About Me</span>
        <h2>A dedicated student passionate about web development.</h2>
        <p>
          I am a Computer Engineering student at CHARUSAT who enjoys building modern web
          applications and solving real-world problems through technology. I have experience
          with React, Django, PHP, Java, Python, MySQL, and PostgreSQL. I am continuously
          learning new technologies and improving my development skills.
        </p>
      </div>
      <div className="about-grid">
        <article className="glass-card">
          <h3>Core strengths</h3>
          <ul>
            <li>Full stack web development using React and Django</li>
            <li>Database solutions with MySQL, PostgreSQL, SQLite and Oracle</li>
            <li>Problem solving with Java, Python, C/C++ and PHP</li>
          </ul>
        </article>
        <article className="glass-card">
          <h3>Education</h3>
          <div className="education-item">
            <strong>B.Tech Computer Engineering</strong>
            <span>CHARUSAT • 2024–2028</span>
            <span>CGPA: 7.84</span>
          </div>
          <div className="education-item">
            <strong>Class 12</strong>
            <span>PCM • 93.33%</span>
          </div>
          <div className="education-item">
            <strong>Class 10</strong>
            <span>89.40%</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export default About;
