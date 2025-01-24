import React, { useState } from 'react';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoHvo from '../../../components/Mnemo/hvo/hooks/useMnemoHvo';
import styles from './mnemo-hvo1.module.scss';
import Header from '../../../components/Common/Header/header';
import Tooltip from '../../../components/Common/Tooltip/tooltip';
import ControlButtons from '../../../components/Common/ControlButtons/controlButtons';
import tooltipItemsHvo1 from '../../../components/Mnemo/hvo/config/tooltipItems';
import GifComponent from '../../../components/Common/GifComponent/gifComponent';
import Kran from '../../../components/Common/Kran/kranComponent';
import CustomModal from '../../../components/Common/Modal/modal'; // Импортируем модальное окно
import DocumentationAccordion from '../../../components/Common/Accordion/accordion'; // Импортируем аккордеон
import { accordionData, accordionTitles } from '../../../components/Mnemo/hvo/config/accordionItems'; // Импортируем данные для аккордеона
import LevelIndicator from '../../../components/Common/LevelIndicator/levelIndicator';
import MnemoSymbols from '../../../components/Mnemo/hvo/mnemoSymbols';
import StaticLabels from '../../../components/Mnemo/hvo/staticLabels';

const MnemoHvo1: React.FC = () => {
  const hvo1Config = apiConfigs.hvo1;

  const { data, isLoading } = useMnemoHvo({
    config: hvo1Config,
  });

  const [tooltipsEnabled, setTooltipsEnabled] = useState(true); // Состояние для управления видимостью тултипов
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

  const toggleTooltips = () => {
    setTooltipsEnabled(!tooltipsEnabled); // Функция для переключения видимости тултипов
  };

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  console.log(data);

  return (
    <div>
      <Header title="ХВО щит №1" />

      <div className={styles['mnemo']}>
        <ControlButtons
          tooltipsEnabled={tooltipsEnabled}
          onToggleTooltips={toggleTooltips}
          onOpenModal={() => setIsModalOpen(true)} // Открываем модальное окно
          top="0"
          left="0"
          adaptiveTop="-5px"
          adaptiveLeft="0"
          adaptiveFontSize="16px"
          adaptiveLineHeight="23px"
        />

        {/* Модальное окно с документацией */}
        <CustomModal isOpen={isModalOpen} title="Список документации" onClose={() => setIsModalOpen(false)}>
          <DocumentationAccordion accordionData={accordionData} titles={accordionTitles} />
        </CustomModal>

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
        <StaticLabels />

        {/* Кран для контроля положения ИМ1 */}
        <Kran
          size={{ width: 24, height: 18 }}
          adaptiveSize={{ width: 20, height: 14 }}
          value={parseFloat(String(data.parameters?.['Контроль положения ИМ1'] || '0'))} // Числовое значение
          threshold={5} // Пороговое значение
          orientation="vertical"
          top="53.8%"
          left="53.8%"
          adaptiveTop="53.8%"
          adaptiveLeft="53.8%"
        />

        {/* Индикатор уровня для емкости E1/1 */}
        <LevelIndicator
          data={data}
          minLevel={0} // Минимальный уровень
          maxLevel={1600} // Максимальный уровень
          totalRange={1600} // Общий диапазон
          levelKeyPrefix="Уровень воды в емкости E1/1" // Ключ для данных уровня
          dataSource="parameters" // Источник данных
          width="63px" // Ширина индикатора
          height="88px" // Высота индикатора
          bottom="40.1%" // Позиционирование
          right="30.2%"
          adaptiveWidth="51px"
          adaptiveHeight="73px"
          adaptiveBottom="40.1%"
          adaptiveRight="30.2%"
          fillColor="#57b7f7" // Цвет заполнения
        />

        {/* Индикатор уровня для емкости E1/2 */}
        <LevelIndicator
          data={data}
          minLevel={0}
          maxLevel={1600}
          totalRange={1600}
          levelKeyPrefix="Уровень воды в емкости E1/2"
          dataSource="parameters"
          width="63px"
          height="88px"
          bottom="40.1%"
          right="17.5%" // Позиционирование для E1/2
          adaptiveWidth="51px"
          adaptiveHeight="73px"
          adaptiveBottom="40.1%"
          adaptiveRight="17.5%"
          fillColor="#57b7f7"
          warningThreshold={30}
        />

        {/* Добавляем компонент MnemoSymbols */}
        <MnemoSymbols />
      </div>
    </div>
  );
};

export default MnemoHvo1;
