import { Link } from "react-router-dom";

function Header({ name, title }) {
    return (
        <header className="site-header hero-header" id="home">
            <section className="hero-panel">
                <div className="hero-copy">
                    <p className="eyebrow">Computer Engineering Student</p>
                    <h1>
                        Hi, I’m <span>{name}</span>
                    </h1>
                    <p className="hero-text">{title}</p>
                    <div className="hero-actions">
                        <Link className="button primary" to="/projects">
                            View Projects
                        </Link>
                        <Link className="button secondary" to="/contact">
                            Contact Me
                        </Link>
                    </div>
                    <div className="hero-links">
                        <a href="https://github.com/PalakBhut" target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/palak-bhut-92b297424" target="_blank" rel="noreferrer">
                            LinkedIn
                        </a>
                        <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="hero-card glass-card">
                    <div className="profile-ring">
                        <div className="profile-circle">PB</div>
                    </div>
                    <div className="hero-card-content">
                        <p className="card-label">Aspiring Full Stack Web Developer</p>
                        <p>Building modern applications with React, Django, and PostgreSQL.</p>
                        <div className="hero-stat-grid">
                            <div>
                                <span>2024–2028</span>
                                <small>Computer Engineering</small>
                            </div>
                            <div>
                                <span>Rajkot, Gujarat</span>
                                <small>Based in India</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
}

export default Header;
