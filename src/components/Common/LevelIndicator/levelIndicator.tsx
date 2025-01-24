import React, { useEffect, useState } from 'react';
import styles from './levelIndicator.module.scss';

interface LevelIndicatorProps {
  objectNumber?: number; // Номер объекта, для которого отображается индикатор уровня
  data: any; // Данные, содержащие информацию об уровнях. Рекомендуется заменить `any` на более конкретный тип.
  minLevel: number; // Минимальное значение уровня, которое может быть отображено
  maxLevel: number; // Максимальное значение уровня, которое может быть отображено
  totalRange: number; // Полный диапазон значений уровня (разница между maxLevel и minLevel)
  levelKeyPrefix: string; // Префикс ключа для доступа к значению уровня в данных
  dataSource: 'parameters' | 'levels'; // Источник данных, откуда брать значения уровня
  width: string; // Ширина контейнера индикатора уровня
  height: string; // Высота контейнера индикатора уровня
  bottom: string; // Положение индикатора снизу (CSS-значение, например, '10px')
  right: string; // Положение индикатора справа (CSS-значение, например, '20px')
  adaptiveWidth?: string; // Адаптивная ширина для мобильных устройств (опционально)
  adaptiveHeight?: string; // Адаптивная высота для мобильных устройств (опционально)
  adaptiveBottom?: string; // Адаптивное положение снизу для мобильных устройств (опционально)
  adaptiveRight?: string; // Адаптивное положение справа для мобильных устройств (опционально)
  fillColor?: string; // Цвет фона индикатора уровня, когда значение уровня действительное (по умолчанию '#57b7f7')
  warningThreshold?: number; // Порог (в процентах), при котором индикатор начинает мигать красным (по умолчанию 25%)
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({
  objectNumber,
  data,
  minLevel,
  maxLevel,
  totalRange,
  levelKeyPrefix,
  dataSource,
  width,
  height,
  bottom,
  right,
  adaptiveWidth,
  adaptiveHeight,
  adaptiveBottom,
  adaptiveRight,
  fillColor = '#57b7f7',
  warningThreshold = 25, // Порог по умолчанию 25%
}) => {
  const [dynamicSize, setDynamicSize] = useState({ width, height });
  const [position, setPosition] = useState({ bottom, right });
  const [isWarning, setIsWarning] = useState(false); // Состояние для мигания красным цветом

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setDynamicSize({ width: adaptiveWidth || width, height: adaptiveHeight || height });
        setPosition({ bottom: adaptiveBottom || bottom, right: adaptiveRight || right });
      } else {
        setDynamicSize({ width, height });
        setPosition({ bottom, right });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [width, height, bottom, right, adaptiveWidth, adaptiveHeight, adaptiveBottom, adaptiveRight]);

  // Формируем levelKey в зависимости от наличия objectNumber
  const levelKey = objectNumber !== undefined ? `${levelKeyPrefix}${objectNumber}` : levelKeyPrefix;

  // Получаем значение уровня
  const rawValue = data[dataSource]?.[levelKey];

  // Убираем лишние кавычки и пробелы, если они есть
  const cleanedValue = String(rawValue).replace(/["\s]/g, '');

  // Преобразуем значение в число
  const levelValue = parseFloat(cleanedValue);
  const isValidLevel = !isNaN(levelValue);

  // Вычисляем fillPercentage
  let fillPercentage = 0;

  if (isValidLevel) {
    if (levelValue < minLevel) {
      fillPercentage = 0; // Уровень ниже минимального значения
    } else if (levelValue > maxLevel) {
      fillPercentage = 100; // Уровень выше максимального значения
    } else {
      // Уровень в пределах шкалы
      fillPercentage = ((levelValue - minLevel) / totalRange) * 100;
    }
  }

  // Проверяем, нужно ли мигать красным
  useEffect(() => {
    if (isValidLevel && fillPercentage < warningThreshold) {
      const interval = setInterval(() => {
        setIsWarning((prev) => !prev); // Переключаем состояние для мигания
      }, 500); // Интервал мигания: 500 мс

      return () => clearInterval(interval); // Очистка интервала при размонтировании
    } else {
      setIsWarning(false); // Отключаем мигание, если уровень выше порога
    }
  }, [fillPercentage, isValidLevel, warningThreshold]);

  return (
    <div
      className={styles['mnemo__level-container']}
      style={{
        width: dynamicSize.width,
        height: dynamicSize.height,
        position: 'absolute',
        bottom: position.bottom,
        right: position.right,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
      }}
    >
      {/* Индикатор заполнения */}
      <div
        className={styles['mnemo__level-fill']}
        style={{
          height: `${fillPercentage}%`,
          backgroundColor: isWarning ? 'red' : isValidLevel ? fillColor : 'transparent',
          transition: 'background-color 0.5s ease', // Плавное изменение цвета
        }}
      />
    </div>
  );
};

export default LevelIndicator;