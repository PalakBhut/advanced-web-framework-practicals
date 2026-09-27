import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";

const ProjectsPage = lazy(() => import("./pages/Projects"));
const ContactPage = lazy(() => import("./pages/Contact"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} onThemeToggle={toggleTheme} />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home theme={theme} onThemeToggle={toggleTheme} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
