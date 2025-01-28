import React, { useState, useEffect } from 'react';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoHvo from '../../../components/Mnemo/hvo/hooks/useMnemoHvo';
import styles from './mnemo-hvo2.module.scss';
import Header from '../../../components/Common/Header/header';
import Tooltip from '../../../components/Common/Tooltip/tooltip';
import ControlButtons from '../../../components/Common/ControlButtons/controlButtons';
import CustomModal from '../../../components/Common/Modal/modal';
import DocumentationAccordion from '../../../components/Common/Accordion/accordion';
import { accordionData, accordionTitles } from '../../../components/Mnemo/hvo/config/accordionItems';
import Loader from '../../../components/Common/Preloader/preloader';
import { tooltipItemsHvo2 } from '../../../components/Mnemo/hvo/config/tooltipItems';
import StaticLabelsHvo2 from '../../../components/Mnemo/hvo/staticLabelsHvo2';

const MnemoHvo2: React.FC = () => {
  const hvo2Config = apiConfigs.hvo2;

  const [isLoading, setIsLoading] = useState(true); // Состояние для управления загрузкой
  const [data, setData] = useState<any>(null); // Состояние для хранения данных
  const [error, setError] = useState<string | null>(null); // Состояние для обработки ошибок
  const [isLoaderVisible, setIsLoaderVisible] = useState(true); // Состояние для управления видимостью прелоудера

  const { tooltipsEnabled, toggleTooltips } = useMnemoHvo({
    config: hvo2Config,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(hvo2Config.apiUrl);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const result = await response.json();

        // Фильтрация данных для каждого типа
        const filteredData = Object.keys(hvo2Config.defaultData).reduce((acc, key) => {
          acc[key] = Object.fromEntries(
            Object.entries(result[key] || {}).filter(([param]) => param in hvo2Config.defaultData[key])
          );
          return acc;
        }, {} as any);

        setData(filteredData);
        setError(null); // Сбрасываем ошибку, если данные успешно загружены
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные'); // Устанавливаем сообщение об ошибке
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsLoaderVisible(false), 100);
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
  }, [hvo2Config]);

  if (error) {
    return <div>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <div>
      {isLoaderVisible && <Loader delay={1000} size={80} />}
      {!isLoading && data && (
        <div className={`${styles.contentContainer} ${!isLoaderVisible ? styles.visible : ''}`}>
          <Header title="ХВО щит №2" />

          <div className={styles['mnemo']}>
            <ControlButtons
              tooltipsEnabled={tooltipsEnabled}
              onToggleTooltips={toggleTooltips}
              onOpenModal={() => setIsModalOpen(true)}
              top="63%"
              left="0"
              adaptiveTop="63%"
              adaptiveLeft="0"
              adaptiveFontSize="16px"
              adaptiveLineHeight="23px"
            />

            {/* Модальное окно с документацией */}
            <CustomModal isOpen={isModalOpen} title="Список документации" onClose={() => setIsModalOpen(false)}>
              <DocumentationAccordion accordionData={accordionData} titles={accordionTitles} />
            </CustomModal>

            <img src="/assets/img/hvo/hvo2.png" alt="Котел" className={styles['mnemo__img']} />

            {/* Параметры с тултипами */}
            {tooltipItemsHvo2.map((param, idx) => {
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

            <StaticLabelsHvo2></StaticLabelsHvo2>

            {/* Контроль положения ИМ1 */}
            <div className={`${styles['mnemo__param']} ${styles['im2']}`}>
              <div className={styles['mnemo__param-text']}>{data.parameters?.['Контроль положения ИМ2'] ?? '—'} %</div>
            </div>

            {/* Уровни */}
            <div className={`${styles['mnemo__param']} ${styles['uroven-titan-e2-1']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Уровень воды в E2/1 (Титан)'] ?? '—'}
              </div>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['uroven-mida-e2-1']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Уровень воды в E2/1 (Мида)'] ?? '—'}
              </div>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['uroven-titan-e2-2']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Уровень воды в E2/2 (Титан)'] ?? '—'}
              </div>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['uroven-mida-e2-2']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Уровень воды в E2/2 (Мида)'] ?? '—'}
              </div>
            </div>

            {/* Частоты */}
            <div className={`${styles['mnemo__param']} ${styles['n4-1-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H4/1 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['n4-2-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H4/2 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['n5-1-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H5/1 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['n5-2-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H5/2 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['n6-1-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H6/1 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['n6-2-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H6/2 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
            <div className={`${styles['mnemo__param']} ${styles['n6-3-hz']}`}>
              <div className={styles['mnemo__param-text']}>
                {data.parameters?.['Рабочая частота насоса H6/3 (Гц)'] ?? '—'}
              </div>
              <span className={styles['mnemo__param-naimenov']}>Гц</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MnemoHvo2;
