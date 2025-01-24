import React, { useState, useEffect } from 'react';
import styles from './preloader.module.scss';

interface LoaderProps {
  delay?: number;
  size?: number;
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  delay = 1000,
  size = 60,
  fullPage = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true); // Начинаем анимацию исчезновения
      setTimeout(() => setIsVisible(false), 300); // Полностью скрываем после завершения анимации
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.loaderContainer} ${fullPage ? styles.fullPage : ''} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.reactLogo} style={{ width: size, height: size }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-11.5 -10.23174 23 20.46348"
          className={styles.reactSvg}
        >
          <defs>
            <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'darkgreen', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'green', stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: 'black', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'darkgreen', stopOpacity: 1 }} />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="2.05" fill="url(#coreGradient)" className={styles.centerDot} />
          <ellipse
            rx="11"
            ry="4.2"
            stroke="url(#orbitGradient)"
            strokeWidth="1"
            fill="none"
            className={styles.orbit1}
          />
          <ellipse
            rx="11"
            ry="4.2"
            stroke="url(#orbitGradient)"
            strokeWidth="1"
            fill="none"
            transform="rotate(60)"
            className={styles.orbit2}
          />
          <ellipse
            rx="11"
            ry="4.2"
            stroke="url(#orbitGradient)"
            strokeWidth="1"
            fill="none"
            transform="rotate(120)"
            className={styles.orbit3}
          />
        </svg>
      </div>
      <p className={styles.loaderText}>Идет загрузка, пожалуйста подождите</p>
    </div>
  );
};

export default Loader;