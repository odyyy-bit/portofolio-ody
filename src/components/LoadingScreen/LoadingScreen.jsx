import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [isHidden, setIsHidden] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 600);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1050);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`loading-screen ${isHidden ? 'is-hidden' : ''}`}
      aria-hidden="true"
    >
      <div className="loading-content">
        <div className="loading-ring" />
        <span className="loading-brand">
          Odyantoro<span>.</span>
        </span>
      </div>
    </div>
  );
}
