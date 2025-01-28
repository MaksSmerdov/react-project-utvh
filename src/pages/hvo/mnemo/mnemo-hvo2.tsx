import React, { useState, useEffect } from 'react';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoHvo from '../../../components/Mnemo/hvo/hooks/useMnemoHvo';
import styles from './mnemo-hvo2.module.scss';
import Header from '../../../components/Common/Header/header';
import Tooltip from '../../../components/Common/Tooltip/tooltip';
import ControlButtons from '../../../components/Common/ControlButtons/controlButtons';
import CustomModal from '../../../components/Common/Modal/modal';
import DocumentationAccordion from '../../../components/Common/Accordion/accordion';
import { accordionDataHvo2, accordionTitles } from '../../../components/Mnemo/hvo/config/accordionItems';
import Loader from '../../../components/Common/Preloader/preloader';
import { tooltipItemsHvo2 } from '../../../components/Mnemo/hvo/config/tooltipItems';
import StaticLabelsHvo2 from '../../../components/Mnemo/hvo/staticLabelsHvo2';
import Kran from '../../../components/Common/Kran/kranComponent';
import LevelIndicator from '../../../components/Common/LevelIndicator/levelIndicator';
import GifComponent from '../../../components/Common/GifComponent/gifComponent';

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
              <DocumentationAccordion accordionData={accordionDataHvo2} titles={accordionTitles} />
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

            {/* Статические подписи */}
            <StaticLabelsHvo2></StaticLabelsHvo2>

            {/* Кран для контроля положения ИМ1 */}
            <Kran
              size={{ width: 24, height: 18 }}
              adaptiveSize={{ width: 20, height: 14 }}
              value={parseFloat(String(data.parameters?.['Контроль положения ИМ2'] || '0'))}
              threshold={5}
              orientation="horizontal"
              top="7.8%"
              left="65.6%"
              adaptiveTop="7.8%"
              adaptiveLeft="65.6%"
            />

            {/* индикаторы уровней */}
            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={1600}
              totalRange={1600}
              levelKeyPrefix="Уровень воды в E2/1 (Титан)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="35.6%"
              adaptiveWidth="51px"
              adaptiveHeight="73px"
              adaptiveBottom="40.1%"
              adaptiveRight="30.2%"
              fillColor="blue"
            />

            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={1600}
              totalRange={1600}
              levelKeyPrefix="Уровень воды в E2/1 (Мида)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="31.9%"
              adaptiveWidth="51px"
              adaptiveHeight="73px"
              adaptiveBottom="40.1%"
              adaptiveRight="30.2%"
              fillColor="#57b7f7"
            />

            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={1600}
              totalRange={1600}
              levelKeyPrefix="Уровень воды в E2/2 (Титан)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="14.1%"
              adaptiveWidth="51px"
              adaptiveHeight="73px"
              adaptiveBottom="40.1%"
              adaptiveRight="30.2%"
              fillColor="blue"
            />

            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={1600}
              totalRange={1600}
              levelKeyPrefix="Уровень воды в E2/2 (Мида)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="10.4%"
              adaptiveWidth="51px"
              adaptiveHeight="73px"
              adaptiveBottom="40.1%"
              adaptiveRight="30.2%"
              fillColor="#57b7f7"
            />

            {/* Анимации насосов */}
            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H4/1"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-4-1']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H4/1 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H4/2"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-4-2']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H4/2 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H5/1"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-5-1']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H5/1 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H5/2"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-5-2']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H5/2 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H6/1"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-6-1']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H6/1 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H6/2"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-6-2']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H6/2 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

            <GifComponent
              src="/assets/img/hvo/ventilator.png"
              alt="Насос H6/3"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-pump-6-3']}`}
              data={data.parameters}
              conditionKey="Рабочая частота насоса H6/3 (Гц)"
              conditionType="greaterThan"
              conditionValue={5}
              isAnimation={true}
            />

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
