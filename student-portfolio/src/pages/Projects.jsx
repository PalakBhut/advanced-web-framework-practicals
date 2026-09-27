import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GITHUB_USERNAME = "PalakBhut";

const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

function ProjectsPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/PalakBhut/repos?per_page=100`, {
        headers: { Accept: "application/vnd.github+json" }
      });

      if (!response.ok) {
        throw new Error("Unable to load repositories from GitHub right now.");
      }

      const data = await response.json();
      setRepos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load repositories from GitHub.");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRepos();
  }, [fetchRepos]);

  const filteredRepos = repos.filter((repo) => repo.name.toLowerCase().includes(search.trim().toLowerCase()));
  const hasSearch = search.trim().length > 0;

  return (
    <main className="page-content">
      <section className="section">
        <div className="section-heading">
          <span className="section-tag">Projects</span>
          <h2>GitHub repositories</h2>
          <p>Explore my recent work and development activity across full-stack web applications and practical coding projects.</p>
        </div>

        <div className="repo-toolbar">
          <a className="button primary compact" href={PROFILE_URL} target="_blank" rel="noreferrer">
            Visit GitHub Profile
          </a>
          <label className="repo-search" htmlFor="repo-search">
            <span className="repo-search-icon" aria-hidden="true">
              🔎
            </span>
            <input
              id="repo-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search repositories by name"
            />
          </label>
          {hasSearch && (
            <button type="button" className="button secondary compact" onClick={() => setSearch("")}>
              Clear Search
            </button>
          )}
        </div>

        {loading ? (
          <div className="state-card loading-card" role="status">
            <div className="spinner" aria-hidden="true" />
            <h3>Loading repositories...</h3>
            <p>Fetching the latest GitHub activity for {GITHUB_USERNAME}.</p>
          </div>
        ) : error ? (
          <div className="state-card error-card">
            <div className="state-icon" aria-hidden="true">
              ⚠️
            </div>
            <h3>We hit a snag</h3>
            <p>{error}</p>
            <button type="button" className="button primary" onClick={() => void fetchRepos()}>
              Retry
            </button>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="repo-grid">
            {filteredRepos.map((repo) => (
              <article className="glass-card repo-card" key={repo.id}>
                <div className="repo-card-head">
                  <div>
                    <p className="repo-name">{repo.name}</p>
                    <p className="repo-description">{repo.description || "No description provided yet."}</p>
                  </div>
                  <span className="repo-language">{repo.language || "Stack"}</span>
                </div>
                <div className="repo-metrics">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>🗓 {new Date(repo.updated_at).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <a className="repo-link" href={repo.html_url} target="_blank" rel="noreferrer">
                  View on GitHub <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="state-card empty-card">
            <div className="state-icon" aria-hidden="true">
              📦
            </div>
            <h3>{`No repositories found matching '${search.trim()}'.`}</h3>
            <p>Try a different keyword to explore the project list.</p>
            <button type="button" className="button secondary compact" onClick={() => setSearch("")}>
              Clear Search
            </button>
          </div>
        )}

        <div className="page-actions">
          <Link className="button secondary" to="/">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
