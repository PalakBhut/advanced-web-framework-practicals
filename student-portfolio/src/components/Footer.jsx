function Footer({ contact, phone, location }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content glass-card">
        <div>
          <p className="footer-title">Let's connect</p>
          <p>{contact}</p>
          <p>{phone}</p>
          <p>{location}</p>
        </div>
        <div className="footer-social">
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
      <p className="footer-note">© 2026 Palak Bhut • Computer Engineering Student</p>
    </footer>
  );
}

export default Footer;
