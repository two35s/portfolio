import { useState, useEffect } from 'react';
import './Intro.css';

const Intro = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Timer for the progress bar and counter (2.8s)
    const duration = 2800;
    const interval = 28; // Update every 28ms for ~100 steps
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(timer);
        handleExit();
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    // Wait for the CSS transition (0.8s) before unmounting
    setTimeout(() => {
      onDone();
    }, 800);
  };

  const handleSkip = () => {
    handleExit();
  };

  return (
    <div className={`intro-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="intro-content">
        <div className="intro-letters">
          <span>Y</span>
          <span>/</span>
          <span>B</span>
        </div>
        <div className="intro-subtitle">
          Design × Security
        </div>
      </div>

      <div className="intro-progress-container">
        <div 
          className="intro-progress-bar" 
          style={{ width: `${progress}%`, animation: 'none' }}
        />
      </div>

      <div className="intro-counter">
        {progress.toString().padStart(3, '0')}
      </div>

      <button className="intro-skip" onClick={handleSkip}>
        skip &rarr;
      </button>
    </div>
  );
};

export default Intro;
