import React, { useState } from 'react';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoHvo from '../../../components/Mnemo/hvo/hooks/useMnemoHvo';
import styles from './mnemo-hvo1.module.scss'; // Импортируем SCSS-стили
import Header from '../../../components/Common/Header/header';
import Tooltip from '../../../components/Common/Tooltip/tooltip'; // Импортируем компонент Tooltip
import ControlButtons from '../../../components/Common/ControlButtons/controlButtons'; // Импортируем компонент ControlButtons
import tooltipItemsHvo1 from '../../../components/Mnemo/hvo/config/tooltipItems';
import GifComponent from '../../../components/Common/GifComponent/gifComponent'; // Импортируем GifComponent

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
          top="0"
          left="0"
          adaptiveTop="-5px"
          adaptiveLeft="0"
          adaptiveFontSize="16px"
          adaptiveLineHeight="23px"
        />

        <img src="/assets/img/hvo/hvo1.png" alt="Котел" className={styles['mnemo__img']} />

        {/* Анимации насосов */}
        {/* Насос H1/1 */}
        <GifComponent
          src="/assets/img/hvo/ventilator.png" // Путь к изображению вентилятора
          alt="Насос H1/1"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-1-1']}`}
          data={data.parameters}
          conditionKey="Рабочая частота насоса H1/1 (Гц)"
          conditionType="greaterThan" // Условие: частота > 5
          conditionValue={5} // Пороговое значение
          isAnimation={true} // Анимация всегда включена
        />

        {/* Насос H1/2 */}
        <GifComponent
          src="/assets/img/hvo/ventilator.png"
          alt="Насос H1/2"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-1-2']}`}
          data={data.parameters}
          conditionKey="Рабочая частота насоса H1/2 (Гц)"
          conditionType="greaterThan"
          conditionValue={5}
          isAnimation={true}
        />

        {/* Насос H2/1 */}
        <GifComponent
          src="/assets/img/hvo/ventilator.png"
          alt="Насос H2/1"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-2-1']}`}
          data={data.parameters}
          conditionKey="Рабочая частота насоса H2/1 (Гц)"
          conditionType="greaterThan"
          conditionValue={5}
          isAnimation={true}
        />

        {/* Насос H2/2 */}
        <GifComponent
          src="/assets/img/hvo/ventilator.png"
          alt="Насос H2/2"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-2-2']}`}
          data={data.parameters}
          conditionKey="Рабочая частота насоса H2/2 (Гц)"
          conditionType="greaterThan"
          conditionValue={5}
          isAnimation={true}
        />

        {/* Параметры с тултипами */}
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

        {/* Контроль положения ИМ1 */}
        <div className={`${styles['mnemo__param']} ${styles['kontrol-im-1']}`}>
          <div className={styles['mnemo__param-text']}>{data.parameters?.['Контроль положения ИМ1'] ?? '—'}</div>
        </div>

        {/* Задание уровня воды в емкостях E1/1,2 */}
        <div className={`${styles['mnemo__param']} ${styles['zadanie-uroven-e1-1-2']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Задание уровня воды в емкостях E1/1,2'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>%</div>
        </div>

        {/* Насосы */}
        <div className={`${styles['mnemo__param']} ${styles['n1-1-percent']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Выход РАН давления воды для ПЧ H1/1 (%)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>%</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n1-1-hz']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Рабочая частота насоса H1/1 (Гц)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>Гц</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n1-2-percent']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Выход РАН давления воды для ПЧ H1/2 (%)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>%</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n1-2-hz']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Рабочая частота насоса H1/2 (Гц)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>Гц</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n2-1-percent']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Выход РАН давления воды для ПЧ H2/1 (%)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>%</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n2-1-hz']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Рабочая частота насоса H2/1 (Гц)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>Гц</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n2-2-percent']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Выход РАН давления воды для ПЧ H2/2 (%)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>%</div>
        </div>

        <div className={`${styles['mnemo__param']} ${styles['n2-2-hz']}`}>
          <div className={styles['mnemo__param-text']}>
            {data.parameters?.['Рабочая частота насоса H2/2 (Гц)'] ?? '—'}
          </div>
          <div className={styles['mnemo__param-naimenov']}>Гц</div>
        </div>

        {/* Статические подписи */}
        <p className={`${styles['mnemo__param-descr']} ${styles['pomeshenie-2-text']}`}>Помещение-2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['zadanie-uroven-e1-1-2-text']}`}>Задание</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f1-1-text']}`}>Ф1/1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f1-2-text']}`}>Ф1/2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f1-3-text']}`}>Ф1/3</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f1-4-text']}`}>Ф1/4</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f2-1-text']}`}>Ф2/1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f2-2-text']}`}>Ф2/2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['f2-3-text']}`}>Ф2/3</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['e1-1-text']}`}>Е1/1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['e1-2-text']}`}>Е1/2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n1-1-text']}`}>H1/1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n1-2-text']}`}>H1/2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n1-3-text']}`}>H1/3</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n2-1-text']}`}>H2/1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n2-2-text']}`}>H2/2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n3-1-text']}`}>H3/1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['n3-2-text']}`}>H3/2</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['rashod-na-promyvku-text']}`}>Q на промывку</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['rashod-na-vhode-text']}`}>Q на входе</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['davl-vhod-ustanivki-text']}`}>P на входе</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['davl-posle-nasosov-1-1-2-3-text']}`}>
          P перед фильтрами
        </p>
        <p className={`${styles['mnemo__param-descr']} ${styles['kontrol-im-1-text']}`}>ИМ1</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['davl-pered-f3-1-7-text']}`}>P перед Ф3/1-7</p>
        <p className={`${styles['mnemo__param-descr']} ${styles['davl-posle-nasosov-3-1-2-text']}`}>
          P на промывку Ф1/1-4, Ф2/1-3
        </p>
      </div>
    </div>
  );
};

export default MnemoHvo1;
