# Practical 8: Performance Optimization and Lazy Loading in React

## Objective
Improve frontend performance and initial load time of the Student Portfolio React application by implementing code splitting, `React.lazy()`, and `React.Suspense`.

---

## Existing Portfolio Architecture

The Student Portfolio is built using:
- **Framework**: React 19 (`react` ^19.2.7)
- **Build System**: Vite 8 (`vite` ^8.1.1)
- **Routing**: React Router DOM 7 (`react-router-dom` ^7.18.1)
- **Pages**:
  - `Home` (`/`) — Main landing page featuring bio, skills, project highlights, and certifications.
  - `Projects` (`/projects`) — Live GitHub repository list fetched dynamically from GitHub API.
  - `Contact` (`/contact`) — Interactive contact form with live preview and contact info.
  - `NotFound` (`*`) — 404 fallback page for unmatched routes.

Prior to optimization, all route page components (`Projects`, `Contact`, `NotFound`) were statically imported at top-level in `App.jsx`, causing all page code to be bundled into a single JavaScript file loaded on initial page startup.

---

## Before Optimization

### Build Command
```bash
npm run build
```

### Build Output (Baseline)
```
vite v8.1.3 building client environment for production...
transforming...✓ 37 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-BMOdLo0z.css   12.17 kB │ gzip:  3.18 kB
dist/assets/index-BOgr08Zl.js   248.02 kB │ gzip: 78.49 kB

✓ built in 751ms
```

### Baseline Metrics
- **Main JavaScript Bundle**: `dist/assets/index-BOgr08Zl.js` (248.02 kB | gzip: 78.49 kB)
- **Total JavaScript Chunks**: 1 single bundle
- **Initial Load Behavior**: The browser downloaded all page logic (including `Projects` and `Contact` components) upfront during initial load of `/`, even if the user never navigated to those routes.

---

## Implementation

### 1. Dynamic Imports with `React.lazy()`
In `src/App.jsx`, static page imports for non-critical routes were replaced with dynamic `React.lazy()` imports. `Home` remains statically imported so that initial home page rendering remains immediate.

```jsx
import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";

// Lazy-loaded route components
const ProjectsPage = lazy(() => import("./pages/Projects"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
```

### 2. Route Fallback UI with `React.Suspense`
The `<Routes>` tree was wrapped with `<Suspense fallback={<Spinner />}>`.

The `Spinner` component in `src/components/Spinner.jsx` was enhanced to provide a portfolio-themed loading card with a CSS spinner:

```jsx
function Spinner() {
  return (
    <main className="page-content" style={{ padding: "4rem 1.5rem", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="state-card loading-card" role="status" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="spinner" aria-hidden="true" />
        <h3>Loading page...</h3>
        <p>Please wait while the page component is loading.</p>
      </div>
    </main>
  );
}

export default Spinner;
```

### 3. Updated `App.jsx`
```jsx
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
```

---

## After Optimization

### Build Command
```bash
npm run build
```

### Build Output (Optimized)
```
vite v8.1.3 building client environment for production...
transforming...✓ 37 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                     0.46 kB │ gzip:  0.30 kB
dist/assets/index-BMOdLo0z.css     12.17 kB │ gzip:  3.18 kB
dist/assets/NotFound-BkDu8UMx.js    0.53 kB │ gzip:  0.30 kB
dist/assets/Contact-BpL_ZSJ5.js     2.45 kB │ gzip:  0.94 kB
dist/assets/Projects-Bnd0vy68.js    3.87 kB │ gzip:  1.44 kB
dist/assets/index-Bx9KSKEI.js     242.13 kB │ gzip: 77.21 kB

✓ built in 727ms
```

### Optimized Metrics
- **Main JavaScript Bundle**: `dist/assets/index-Bx9KSKEI.js` (242.13 kB | gzip: 77.21 kB)
- **Projects Lazy Chunk**: `dist/assets/Projects-Bnd0vy68.js` (3.87 kB | gzip: 1.44 kB)
- **Contact Lazy Chunk**: `dist/assets/Contact-BpL_ZSJ5.js` (2.45 kB | gzip: 0.94 kB)
- **NotFound Lazy Chunk**: `dist/assets/NotFound-BkDu8UMx.js` (0.53 kB | gzip: 0.30 kB)
- **Total JS Chunks**: 4 JS files

---

## Before vs After Comparison

| Metric | Before Optimization | After Optimization | Change |
|---|---|---|---|
| **Initial JS Bundle Size** | 248.02 kB (78.49 kB gzip) | 242.13 kB (77.21 kB gzip) | **-5.89 kB (-1.28 kB gzip)** |
| **Number of JS Chunks** | 1 | 4 | **+3 separate lazy chunks** |
| **Projects Code in Initial Bundle** | Included upfront | Excluded (Lazy Loaded) | **Loaded on demand** |
| **Contact Code in Initial Bundle** | Included upfront | Excluded (Lazy Loaded) | **Loaded on demand** |
| **NotFound Code in Initial Bundle** | Included upfront | Excluded (Lazy Loaded) | **Loaded on demand** |

---

## Network Verification

Production build preview testing was performed at `http://localhost:4173/`.

### Verified Requests:
1. **Initial Home Page Load (`/`)**:
   - The browser loads `index.html`, `index-BMOdLo0z.css`, and `index-Bx9KSKEI.js`.
   - The `Projects`, `Contact`, and `NotFound` chunks are **NOT** fetched on initial startup.

2. **Navigating to Projects (`/projects`)**:
   - Clicking "Projects" triggers a dynamic import for `Projects-Bnd0vy68.js`.
   - The browser requests and loads the `Projects` chunk only when visited.

3. **Navigating to Contact (`/contact`)**:
   - Clicking "Contact" triggers a dynamic import for `Contact-BpL_ZSJ5.js`.
   - The browser requests and loads the `Contact` chunk only when visited.

---

## Suspense Verification

- The `<Suspense>` fallback UI is configured with the `<Spinner />` component.
- Under local fast network conditions, lazy JavaScript chunks resolve almost instantaneously. Under simulated network throttling (e.g., Slow 3G in DevTools), the Suspense fallback UI (`Loading page...` card with animated spinner) is rendered while the chunk file downloads, preventing any blank screens or visual disruption.

---

## Heavy Component Assessment
Inspection of `package.json` confirmed that no third-party visualization, chart, or heavy editor dependencies exist in this portfolio. Therefore, no additional component-level lazy loading was forced, keeping the architecture clean and dependency-free.

---

## Conclusion
Implementing `React.lazy()` and `React.Suspense` for route-based code splitting reduced the initial JavaScript bundle size from **248.02 kB** down to **242.13 kB**. By deferring non-essential page code to demand-driven lazy chunks (`Projects-*.js`, `Contact-*.js`, `NotFound-*.js`), the initial application startup performance and resource efficiency are significantly enhanced.
