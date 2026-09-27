import { Link, useNavigate } from "react-router-dom";

function NavBar({ theme, onThemeToggle }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("portfolio_token");

  const handleLogout = () => {
    localStorage.removeItem("portfolio_token");
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="topbar">
        <Link className="brand" to="/">
          Palak Bhut
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button type="button" className="button secondary compact" onClick={handleLogout}>
              Logout
            </button>
          )}
          <Link to="/contact">Contact</Link>
        </nav>
        <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle dark light mode">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default NavBar;
