import { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorifyProvider } from '@cursorify/react';
import { PhingerCursor } from '@cursorify/cursors';
import Header from './components/Header';
import ClickSpark from './components/ClickSpark';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AboutContact = lazy(() => import('./components/AboutContact'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const sparkColor = theme === 'dark' ? '#d4ff36' : '#9bbf00';

  return (
    <CursorifyProvider cursor={<PhingerCursor />}>
      <ClickSpark sparkColor={sparkColor} sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Router>
          <div className="app">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Suspense fallback={<main className="route-loading container">Loading...</main>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Suspense>
            <Suspense fallback={null}>
              <AboutContact />
            </Suspense>
          </div>
        </Router>
      </ClickSpark>
    </CursorifyProvider>
  );
}

export default App;
