import React from 'react';
import { FaArrowLeft, FaArrowRight, FaEye, FaSync, FaBook, FaWrench } from 'react-icons/fa';
import { FaChartLine } from "react-icons/fa6";
import { FiGrid, FiSliders } from 'react-icons/fi';

export type IconName = 'arrowLeft' | 'arrowRight' | 'eye' | 'sync' | 'book' | 'graph' | 'grid' | 'wrench' | 'slider';

interface IconProps {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

const iconMap: Record<IconName, React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number; color?: string }>> = {
  arrowLeft: FaArrowLeft,
  arrowRight: FaArrowRight,
  eye: FaEye,
  sync: FaSync,
  book: FaBook,
  graph: FaChartLine,
  grid: FiGrid,
  wrench: FaWrench,
  slider: FiSliders,
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
