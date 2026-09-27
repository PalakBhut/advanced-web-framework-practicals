import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
function Projects() {
  const [repos, setRepos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  fetch("http://localhost:5000/abcd")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    })
    .then((data) => setRepos(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);
if (loading)
    return <Spinner />;

if (error)
    return <ErrorMessage message={error} />;
  return (
    <div>
        <h1>Projects</h1>

        {repos.map((repo) => (
            <div key={repo.id}>
                <h3>{repo.name}</h3>

                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {repo.html_url}
                </a>
            </div>
        ))}
    </div>
);
}

export default Projects;
