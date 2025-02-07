// Icon.tsx
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaEye, FaSync, FaBook } from 'react-icons/fa';

// Определяем возможные имена иконок
export type IconName = 'arrowLeft' | 'arrowRight' | 'eye' | 'sync' | 'book';

interface IconProps {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

// Маппинг имен иконок на компоненты из react-icons
const iconMap: Record<IconName, React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number; color?: string }>> = {
  arrowLeft: FaArrowLeft,
  arrowRight: FaArrowRight,
  eye: FaEye,
  sync: FaSync,
  book: FaBook,
};

const Icon: React.FC<IconProps> = ({ name, style, size = 20, color }) => {
  const Component = iconMap[name];
  return (
    <Component
      style={style}
      size={size}
      color={color}
    />
  );
};

export default Icon;
