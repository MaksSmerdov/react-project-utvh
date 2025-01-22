import React, { useState } from 'react';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoHvo from '../../../components/Mnemo/hvo/hooks/useMnemoHvo';
import styles from './mnemo-hvo1.module.scss'; // Импортируем SCSS-стили
import Header from '../../../components/Common/Header/header';
import Tooltip from '../../../components/Common/Tooltip/tooltip'; // Импортируем компонент Tooltip
import ControlButtons from '../../../components/Common/ControlButtons/controlButtons'; // Импортируем компонент ControlButtons
import tooltipItemsHvo1 from '../../../components/Mnemo/hvo/config/tooltipItems';

const MnemoHvo1: React.FC = () => {
  const hvo1Config = apiConfigs.hvo1;

  const { data, isLoading } = useMnemoHvo({
    config: hvo1Config,
  });

  const [tooltipsEnabled, setTooltipsEnabled] = useState(true); // Состояние для управления видимостью тултипов

  const toggleTooltips = () => {
    setTooltipsEnabled(!tooltipsEnabled); // Функция для переключения видимости тултипов
  };

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div>
      <Header title="ХВО щит №1" />

      <div className={styles['mnemo']}>
        <ControlButtons
          tooltipsEnabled={tooltipsEnabled}
          onToggleTooltips={toggleTooltips}
          top="-5px"
          left="0"
          adaptiveTop="-5px"
          adaptiveLeft="0"
          adaptiveFontSize="16px"
          adaptiveLineHeight="23px"
        />

        <img src="/assets/img/hvo/hvo1.png" alt="Котел" className={styles['mnemo__img']} />

        {tooltipItemsHvo1.map((param, idx) => {
          const value = data.parameters?.[param.dataKey] ?? '—';
          return (
            <Tooltip
              key={`${param.id}-${idx}`}
              tooltipId={param.id}
              content={param.content}
              disabled={!tooltipsEnabled}
              width={param.width}
              responsiveWidth={param.responsiveWidth}
              placement="top"
            >
              <div
                className={`${styles['mnemo__param']} ${param.className} ${tooltipsEnabled ? styles.enabledHover : ''}`}
              >
                <div className={styles['mnemo__param-text']}>{value}</div>
                <div className={styles['mnemo__param-naimenov']}>{param.unit}</div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default MnemoHvo1;
