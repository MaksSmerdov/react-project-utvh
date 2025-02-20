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

    let interval: NodeJS.Timeout;

    const delayLoading = setTimeout(() => {
      fetchData();
      interval = setInterval(fetchData, 5000);
    }, 1000);

    return () => {
      clearTimeout(delayLoading);
      clearInterval(interval);
    };
  }, [hvo2Config]);

  if (error) {
    return <div>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <div>
      {isLoaderVisible && <Loader delay={1000} size={80} />}
      {!isLoading && data && (
        <div className={`${styles.contentContainer} ${!isLoaderVisible ? styles.visible : ''}`}>
          <div className={styles['hvo-header']}>
            <Header title="ХВО щит №2" />
          </div>

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
              const tooltipContent = param.hasTooltip ? param.content : null;

              return (
                <Tooltip
                  key={`${param.id}-${idx}`}
                  tooltipId={param.id}
                  content={tooltipContent}
                  disabled={!tooltipsEnabled || !param.hasTooltip}
                  width={param.width}
                  responsiveWidth={param.responsiveWidth}
                  placement="top"
                >
                  <div
                    className={`${styles['mnemo__param']} ${param.className} ${
                      param.hasTooltip && tooltipsEnabled ? styles.hoverable : styles['no-cursor']
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
              left="65.2%"
              adaptiveTop="7.8%"
              adaptiveLeft="65.2%"
            />

            {/* индикаторы уровней */}
            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={6000}
              totalRange={6000}
              levelKeyPrefix="Уровень воды в E2/1 (Титан)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="35.6%"
              adaptiveWidth="39px"
              adaptiveHeight="75px"
              adaptiveBottom="74.3%"
              adaptiveRight="35.6%"
              fillColor="blue"
            />

            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={6000}
              totalRange={6000}
              levelKeyPrefix="Уровень воды в E2/1 (Мида)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="31.9%"
              adaptiveWidth="37px"
              adaptiveHeight="75px"
              adaptiveBottom="74.3%"
              adaptiveRight="31.9%"
              fillColor="#57b7f7"
            />

            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={6000}
              totalRange={6000}
              levelKeyPrefix="Уровень воды в E2/2 (Титан)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="14.1%"
              adaptiveWidth="39px"
              adaptiveHeight="75px"
              adaptiveBottom="74.3%"
              adaptiveRight="14.1%"
              fillColor="blue"
            />

            <LevelIndicator
              data={data}
              minLevel={0}
              maxLevel={6000}
              totalRange={6000}
              levelKeyPrefix="Уровень воды в E2/2 (Мида)"
              dataSource="parameters"
              width="47px"
              height="91px"
              bottom="74.3%"
              right="10.4%"
              adaptiveWidth="37px"
              adaptiveHeight="75px"
              adaptiveBottom="74.3%"
              adaptiveRight="10.4%"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MnemoHvo2;
