import { useState } from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !message) {
      setShowHelp(true);
      return;
    }

    setShowHelp(false);
    alert("Thanks for reaching out! I will get back to you soon.");
  };

  return (
    <main className="page-content">
      <section className="section">
        <div className="section-heading">
          <span className="section-tag">Contact</span>
          <h2>Let’s build something great together</h2>
          <p>Feel free to send me a message about projects, internships, or opportunities.</p>
        </div>
        <div className="contact-layout">
          <form className="glass-card contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="6" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write your message here" />
            </div>
            <div className="form-actions">
              <button type="button" className="button secondary" onClick={() => setShowHelp((current) => !current)}>
                Show Help
              </button>
              <button type="submit" className="button primary">
                Submit
              </button>
            </div>
            {showHelp && <p className="help-text">Please fill all fields before submitting.</p>}
            <p className="preview-title">Live preview</p>
            <div className="preview-box">{message || "Your message preview will appear here."}</div>
            <p className="counter">Characters: {message.length}</p>
          </form>
          <div className="glass-card contact-info">
            <h3>Contact details</h3>
            <p>Email: bhutpalak4@gmail.com</p>
            <p>Phone: +91 94267 37436</p>
            <p>Location: Rajkot, Gujarat</p>
            <Link className="button secondary" to="/">
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
