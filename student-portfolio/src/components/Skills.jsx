function Skills({ skillList }) {
  const skillProficiency = {
    HTML: 92,
    CSS: 90,
    JavaScript: 86,
    React: 84,
    "C++": 76,
    Java: 74,
    Python: 78,
    PHP: 72,
    Django: 80,
    MySQL: 77,
    PostgreSQL: 74
  };

  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <span className="section-tag">Skills</span>
        <h2>Technical abilities and tools</h2>
        <p>My toolkit combines frontend, backend, and database technologies to create clean, scalable applications.</p>
      </div>
      <div className="skills-grid">
        {skillList.map((skill) => (
          <div className="skill-card" key={skill}>
            <span className="skill-chip">{skill}</span>
            <span className="skill-chip-sub">Professional proficiency</span>
          </div>
        ))}
      </div>
      <div className="progress-grid">
        {Object.entries(skillProficiency).map(([skill, value]) => (
          <div className="progress-group" key={skill}>
            <div className="progress-header">
              <span>{skill}</span>
              <strong>{value}%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
