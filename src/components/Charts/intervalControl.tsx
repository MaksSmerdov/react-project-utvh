import React from 'react';
import styles from './chart.module.scss';

interface IntervalControlProps {
  onIntervalChange: (interval: number) => void;
}

const IntervalControl: React.FC<IntervalControlProps> = ({ onIntervalChange }) => {
  const handleChangeInterval = (interval: number) => {
    onIntervalChange(interval);
  };

  return (
    <div className={styles['interval-control']}>
      <button className={styles['interval-button']} onClick={() => handleChangeInterval(10)}>
        10 минут
      </button>
      <button className={styles['interval-button']} onClick={() => handleChangeInterval(30)}>
        30 минут
      </button>
    </div>
  );
};

export default IntervalControl;