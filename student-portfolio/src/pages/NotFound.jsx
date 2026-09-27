import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page-content">
      <section className="section not-found-section">
        <div className="glass-card not-found-card">
          <p className="not-found-code">404</p>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <Link className="button primary" to="/">
            Go Back Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
