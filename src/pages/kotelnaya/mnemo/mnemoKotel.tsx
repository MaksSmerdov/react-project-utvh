import { useState, useEffect } from 'react';
import styles from './mnemoKotel.module.scss';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoKotel from '../../../components/Mnemo/kotelnaya/hooks/useMnemoKotel';
import CustomModal from '../../../components/Common/Modal/modal';
import DocumentationAccordion from '../../../components/Common/Accordion/accordion';
import { accordionData, accordionTitles } from '../../../components/Mnemo/kotelnaya/config/accordionItems';
import Tooltip from '../../../components/Common/Tooltip/tooltip';
import ControlButtons from '../../../components/Common/ControlButtons/controlButtons';
import { imLabels, infoLabels, alarmLabels, staticLabels } from '../../../components/Mnemo/kotelnaya/utils/mnemoUtils';
import tooltipItems from '../../../components/Mnemo/kotelnaya/config/tooltipItems';
import Header from '../../../components/Common/Header/header';
import Kran from '../../../components/Common/Kran/kranComponent';
import GifComponent from '../../../components/Common/GifComponent/gifComponent';
import LevelIndicator from '../../../components/Common/LevelIndicator/levelIndicator';
import Loader from '../../../components/Common/Preloader/preloader';

interface MnemoKotelProps {
  kotelNumber: number;
}

const MnemoKotel = ({ kotelNumber }: MnemoKotelProps) => {
  const configKey = `kotel${kotelNumber}` as keyof typeof apiConfigs;
  const title = `Котел №${kotelNumber}`;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true); // Состояние для управления видимостью прелоудера

  const { tooltipsEnabled, toggleTooltips } = useMnemoKotel({
    config: apiConfigs[configKey],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiConfigs[configKey].apiUrl);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const result = await response.json();

        const filteredData = Object.keys(apiConfigs[configKey].defaultData).reduce((acc, key) => {
          acc[key] = Object.fromEntries(
            Object.entries(result[key] || {}).filter(([param]) => param in apiConfigs[configKey].defaultData[key])
          );
          return acc;
        }, {} as any);

        setData(filteredData);
        setError(null);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные');
      } finally {
        setIsLoading(false);
        setTimeout(() => setIsLoaderVisible(false), 100);
      }
    };

    const delayLoading = setTimeout(() => {
      setIsLoading(true);
      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(delayLoading);
  }, [configKey]);

  const getKotelKey = (key: string) => `${key} котел №${kotelNumber}`;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isLoaderVisible && (
        <Loader
          delay={1000}
          size={80}
        />
      )}
      {!isLoading && data && (
        <div className={`${styles.mnemoContainer} ${!isLoaderVisible ? styles.visible : ''}`}>
          <Header title={title} maxWidth="auto" />
          <div className={styles.mnemo}>
            <ControlButtons
              tooltipsEnabled={tooltipsEnabled}
              onToggleTooltips={toggleTooltips}
              onOpenModal={() => setIsModalOpen(true)}
              top="-5px"
              left="0"
              adaptiveTop="-5px"
              adaptiveLeft="0"
              adaptiveFontSize="16px"
              adaptiveLineHeight="23px"
            />

            <CustomModal isOpen={isModalOpen} title="Список документации" onClose={() => setIsModalOpen(false)}>
              <DocumentationAccordion accordionData={accordionData} titles={accordionTitles} />
            </CustomModal>

            <img src="/assets/img/kotelnaya/kotel.png" alt="Котел" className={styles['mnemo__img']} />

            {/* Факел горелки */}
            <GifComponent
              src="/assets/img/kotelnaya/fire-gif.gif"
              alt="Факел горелки"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-1']}`}
              data={data.info}
              conditionKey={getKotelKey('Факел горелки')}
              conditionType="boolean"
            />

            {/* Искра */}
            <GifComponent
              src="/assets/img/kotelnaya/iskra.gif"
              alt="Искра"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-5']}`}
              data={data.info}
              conditionKey={getKotelKey('Искрообразование')}
              conditionType="boolean"
            />

            {/* Факел запальника */}
            <GifComponent
              src="/assets/img/kotelnaya/fire-zapalnik.gif"
              alt="Факел запальника"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-6']}`}
              data={data.info}
              conditionKey={getKotelKey('Факел запальника')}
              conditionType="boolean"
            />

            {/* Пар */}
            <GifComponent
              src="/assets/img/kotelnaya/par.gif"
              alt="Пар"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-7']}`}
              data={data.info}
              conditionKey={getKotelKey('Рабочий режим')}
              conditionType="boolean"
            />

            {/* Дымосос */}
            <GifComponent
              src="/assets/img/kotelnaya/ventilator.png"
              alt="Дымосос"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-2']}`}
              data={data.info}
              conditionKey={getKotelKey('Работа дымососа')}
              conditionType="boolean"
              isAnimation={true}
            />

            {/* Вентилятор */}
            <GifComponent
              src="/assets/img/kotelnaya/ventilator.png"
              alt="Вентилятор"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-3']}`}
              data={data.others}
              conditionKey={getKotelKey('Индикация работы вентилятора')}
              conditionType="boolean"
              isAnimation={true}
            />

            {/* Пар на трубе */}
            <GifComponent
              src="/assets/img/kotelnaya/ventilator.png"
              alt="Пар на трубе"
              className={`${styles['mnemo__gif']} ${styles['mnemo__gif-4']}`}
              data={data.info}
              conditionKey={getKotelKey('Рабочий режим')}
              conditionType="boolean"
              isAnimation={true}
            />

            {/* ИМ (индикаторы) */}
            {imLabels.map((label, idx) => {
              const value = data.im?.[`${label.key}${kotelNumber}`] ?? '—';
              return (
                <div key={idx} className={`${styles['im']} ${label.className}`}>
                  {value} %
                </div>
              );
            })}

            {/* Алармы */}
            {alarmLabels.map((label, idx) => {
              const alarmState = data.alarms?.[`${label.key}${kotelNumber}`];
              const isAlarmActive = alarmState && alarmState !== '—';
              const alarmClass = isAlarmActive
                ? `${label.className} ${styles.alarmActive}`
                : `${label.className} ${styles.alarmInactive}`;

              return (
                <div key={idx} className={`${styles['mnemo__alarm']} ${alarmClass}`}>
                  <div className={styles['mnemo__alarm-text']}>{label.text}</div>
                </div>
              );
            })}

            {/* Инфо */}
            {infoLabels.map((label, idx) => {
              const infoState = data.info?.[`${label.key}${kotelNumber}`];
              const isInfoActive = infoState && infoState !== '—';
              const infoClass = isInfoActive
                ? `${label.className} ${styles.infoActive}`
                : `${label.className} ${styles.infoInactive}`;

              return (
                <div key={idx} className={`${styles['mnemo__alarm']} ${infoClass}`}>
                  <div className={styles['mnemo__alarm-text']}>{label.text}</div>
                </div>
              );
            })}

            {/* Краны */}
            <Kran
              size={{ width: 30, height: 24 }}
              adaptiveSize={{ width: 30, height: 24 }}
              status={Boolean(data.info?.[getKotelKey('Клапан запальника')])}
              orientation="horizontal"
              top="405px"
              left="150px"
              adaptiveTop="405px"
              adaptiveLeft="150px"
            />

            <Kran
              size={{ width: 30, height: 24 }}
              adaptiveSize={{ width: 30, height: 24 }}
              status={Boolean(data.info?.[getKotelKey('Клапан отсекатель')])}
              orientation="vertical"
              top="150px"
              left="83px"
              adaptiveTop="150px"
              adaptiveLeft="83px"
            />

            <Kran
              size={{ width: 30, height: 24 }}
              adaptiveSize={{ width: 30, height: 24 }}
              status={Boolean(data.info?.[getKotelKey('Клапан отсекатель')])}
              orientation="vertical"
              top="275px"
              left="83px"
              adaptiveTop="275px"
              adaptiveLeft="83px"
            />

            <Kran
              size={{ width: 30, height: 24 }}
              adaptiveSize={{ width: 30, height: 24 }}
              status={Boolean(data.info?.[getKotelKey('Клапан отсекатель')])}
              reverseColorLogic={true}
              orientation="vertical"
              top="150px"
              left="167px"
              adaptiveTop="150px"
              adaptiveLeft="167px"
            />

            {/* Статические подписи */}
            {staticLabels.map((label, idx) => (
              <div key={idx} className={`${styles['mnemo__param-descr']} ${label.className}`}>
                {label.text}
              </div>
            ))}

            {/* Параметры с тултипами */}
            {tooltipItems.map((param, idx) => {
              const dataKeyWithNumber = `${param.dataKey}${kotelNumber}`;
              const value = data[param.source]?.[dataKeyWithNumber] ?? '—';
              return (
                <Tooltip
                  key={`${param.id}-${kotelNumber}-${idx}`}
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
                    <div className={styles['mnemo__param-naimenov']}>{param.naimenov || 'Нет данных'}</div>
                    <div className={styles['mnemo__param-text']}>
                      <div className={styles['mnemo__param-value']}>{value}</div>
                      <div className={styles['mnemo__param-span']}>{param.unit}</div>
                    </div>
                  </div>
                </Tooltip>
              );
            })}

            {/* Индикатор уровня */}
            <LevelIndicator
              objectNumber={kotelNumber}
              data={data}
              minLevel={-100}
              maxLevel={100}
              totalRange={200}
              levelKeyPrefix="Уровень в барабане котел №"
              dataSource="parameters"
              width="42px"
              height="85px"
              bottom="61.9%"
              right="69.8%"
              adaptiveWidth="42px"
              adaptiveHeight="85px"
              adaptiveBottom="61.9%"
              adaptiveRight="69.8%"
              fillColor="#57b7f7"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MnemoKotel;
