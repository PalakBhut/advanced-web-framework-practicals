function Certifications({ certifications }) {
  return (
    <section className="section certifications-section" id="certifications">
      <div className="section-heading">
        <span className="section-tag">Certifications</span>
        <h2>Professional learning milestones</h2>
        <p>Continuous learning through courses and certification programs.</p>
      </div>
      <div className="certification-grid">
        {certifications.map((certification) => (
          <article className="glass-card certification-card" key={certification}>
            <p>{certification}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
