import React, { useState, useEffect } from 'react';
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
import Loader from '../../../components/Common/Preloader/preloader'; // Импортируем Loader

interface MnemoHvo1Props {
  fullPageLoader?: boolean; // Пропс для управления прелоудером (на всю страницу или нет)
}

const MnemoHvo1: React.FC<MnemoHvo1Props> = ({ fullPageLoader = true }) => {
  const hvo1Config = apiConfigs.hvo1;

  const [isLoading, setIsLoading] = useState(true); // Состояние для управления загрузкой
  const [data, setData] = useState<any>(null); // Состояние для хранения данных
  const [error, setError] = useState<string | null>(null); // Состояние для обработки ошибок

  const { tooltipsEnabled, toggleTooltips } = useMnemoHvo({
    config: hvo1Config,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(hvo1Config.apiUrl);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const result = await response.json();

        // Фильтрация данных для каждого типа
        const filteredData = Object.keys(hvo1Config.defaultData).reduce((acc, key) => {
          acc[key] = Object.fromEntries(
            Object.entries(result[key] || {}).filter(([param]) => param in hvo1Config.defaultData[key])
          );
          return acc;
        }, {} as any);

        setData(filteredData);
        setError(null); // Сбрасываем ошибку, если данные успешно загружены
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные'); // Устанавливаем сообщение об ошибке
      } finally {
        setIsLoading(false); // Загрузка завершена
      }
    };

    // Устанавливаем задержку в 1 секунду перед началом загрузки
    const delayLoading = setTimeout(() => {
      setIsLoading(true);
      fetchData(); // Первый запрос данных
      const interval = setInterval(fetchData, 5000); // Обновление данных каждые 5 секунд
      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, 1000);

    return () => clearTimeout(delayLoading); // Очистка таймера при размонтировании
  }, [hvo1Config]);

  if (error) {
    return <div>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <div className={styles.mnemoContainer}>
      {isLoading && <Loader delay={1000} size={80} />}
      {!isLoading && data && (
        <>
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
                    className={`${styles['mnemo__param']} ${param.className} ${
                      tooltipsEnabled ? styles.enabledHover : ''
                    }`}
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
        </>
      )}
    </div>
  );
};

export default MnemoHvo1;
