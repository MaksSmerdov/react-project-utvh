import React from 'react';
import styles from './chart.module.scss';
import { useInterval } from './context/intervalContext';

const IntervalSelector: React.FC = () => {
  const { setInterval } = useInterval();

  // Обработчик изменения выбранного значения в выпадающем списке
  const handleIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedInterval = parseInt(event.target.value, 10); // Преобразуем значение в число
    setInterval(selectedInterval); // Устанавливаем новый интервал
  };

  return (
    <div className={styles['interval-selector']}>
      <span className={styles['interval-selector__label']}>Выбор интервала:</span>
      <select
        className={styles['interval-selector__dropdown']}
        onChange={handleIntervalChange}
        defaultValue="10" // Значение по умолчанию
      >
        <option value="5">5 минут</option>
        <option value="10">10 минут</option>
        <option value="30">30 минут</option>
        <option value="60">1 час</option>
      </select>
    </div>
  );
};

export default IntervalSelector;