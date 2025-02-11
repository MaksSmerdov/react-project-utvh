import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  maxWidth?: string;
}

const Header: React.FC<HeaderProps> = ({ title, maxWidth = '100%' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className={styles.header} style={{ maxWidth }}>
      <div className={styles.header__title}>
        <span className={styles.header__titleSpan}>УТВХ</span>
        {title}
      </div>
      <div className={styles.header__box}>
        <span className={styles.header__date}>{currentTime.toLocaleDateString()}</span>
        <span className={styles.header__time}>{currentTime.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default Header;
