import React from 'react';

interface GifComponentProps {
  src: string; // URL изображения IMG
  alt: string; // Альтернативный текст для изображения
  className: string; // CSS-классы для стилизации изображения
  data: { [key: string]: string | number | boolean }; // Объект с данными, где ключи - строки, а значения - строки, числа или булевы значения
  conditionKey: string; // Ключ для доступа к значению в объекте данных
  conditionType?: 'boolean' | 'greaterThan' | 'lessThan' | 'equals'; // Тип условия (по умолчанию 'boolean')
  conditionValue?: number | boolean; // Значение для сравнения (если нужно)
  isAnimation?: boolean; // Флаг, указывающий, должна ли анимация быть включена (по умолчанию false)
}

const GifComponent: React.FC<GifComponentProps> = ({
  src,
  alt,
  className,
  data,
  conditionKey,
  conditionType = 'boolean',
  conditionValue,
  isAnimation = false,
}) => {
  // Получаем значение из данных по ключу
  const value = data[conditionKey];

  // Определяем, должна ли анимация быть активной
  let isActive = false;

  switch (conditionType) {
    case 'boolean':
      // Для булевых значений просто проверяем, равно ли значение true
      isActive = value === true;
      break;
    case 'greaterThan':
      // Для числовых значений преобразуем value в число
      isActive = parseFloat(String(value)) > (conditionValue as number);
      break;
    case 'lessThan':
      // Для числовых значений преобразуем value в число
      isActive = parseFloat(String(value)) < (conditionValue as number);
      break;
    case 'equals':
      // Для сравнения на равенство
      isActive = value === conditionValue;
      break;
    default:
      isActive = false;
  }

  // Лог для проверки isActive
  console.log(`isActive для ${conditionKey}:`, isActive);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      style={{
        display: isAnimation || isActive ? 'block' : 'none',
        animationPlayState: isActive ? 'running' : 'paused',
      }}
    />
  );
};

export default GifComponent;
