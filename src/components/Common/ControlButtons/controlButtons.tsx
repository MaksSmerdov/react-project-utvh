// controlButtons.tsx
import React, { useEffect, useState } from 'react';
import styles from './controlButtons.module.scss';
import Icon from '../CustomIcon/icon';

interface ControlButtonsProps {
  tooltipsEnabled?: boolean;
  onToggleTooltips?: () => void;
  onOpenModal?: () => void;
  top?: string;
  left?: string;
  adaptiveTop?: string;
  adaptiveLeft?: string;
  adaptiveFontSize?: string;
  adaptiveLineHeight?: string;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  tooltipsEnabled,
  onToggleTooltips,
  onOpenModal,
  top = '0',
  left = '0',
  adaptiveTop = '50px',
  adaptiveLeft = '20px',
  adaptiveFontSize = '12px',
  adaptiveLineHeight = '12px',
}) => {
  const [position, setPosition] = useState({ top, left });
  const [isAdaptive, setIsAdaptive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const adaptive = window.innerWidth <= 1280;
      setIsAdaptive(adaptive);
      setPosition(adaptive ? { top: adaptiveTop, left: adaptiveLeft } : { top, left });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [top, left, adaptiveTop, adaptiveLeft]);

  return (
    <div
      className={styles.paramBox}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {onToggleTooltips && (
        <button
          onClick={onToggleTooltips}
          className={`${styles.btnReset} ${styles.paramBoxBtn}`}
          style={
            isAdaptive
              ? { fontSize: adaptiveFontSize, lineHeight: adaptiveLineHeight }
              : undefined
          }
        >
          <Icon name="eye" />
          {tooltipsEnabled ? 'Выключить всплывающие подсказки' : 'Включить всплывающие подсказки'}
        </button>
      )}

      {onOpenModal && (
        <button
          onClick={onOpenModal}
          className={`${styles.btnReset} ${styles.paramBoxBtn}`}
          style={
            isAdaptive
              ? { fontSize: adaptiveFontSize, lineHeight: adaptiveLineHeight }
              : undefined
          }
        >
          <Icon name="book" />
          Документация
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
