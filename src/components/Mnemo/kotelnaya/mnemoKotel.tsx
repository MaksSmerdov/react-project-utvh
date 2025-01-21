import { useState } from 'react';
import styles from './mnemoKotel.module.scss';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import useMnemoKotel from './hooks/useMnemoKotel';
import CustomModal from '../../Common/Modal/modal';
import DocumentationAccordion from '../../Common/Accordion/accordion';
import { accordionData, accordionTitles } from './config/accordionItems';
import Tooltip from '../../Common/Tooltip/tooltip';
import Loader from '../../Common/Preloader/preloader';
import ControlButtons from '../../Common/ControlButtons/controlButtons';
import { imLabels, infoLabels, alarmLabels, staticLabels } from './utils/mnemoUtils';
import tooltipItems from './config/tooltipItems';
import Header from '../../Common/Header/header';
import Kran from '../../Common/Kran/kranComponent';
import GifComponent from '../../Common/GifComponent/gifComponent';
import LevelIndicator from '../../Common/LevelIndicator/levelIndicator';

interface MnemoKotelProps<K extends keyof typeof apiConfigs> {
  configKey: K;
  title: string;
  objectNumber: number;
  showLoading?: boolean; // Новый пропс для управления отображением прелоадера
}

const MnemoKotel = <K extends keyof typeof apiConfigs>({
  configKey,
  title,
  objectNumber,
  showLoading = false,
}: MnemoKotelProps<K>) => {
  const { data, tooltipsEnabled, toggleTooltips } = useMnemoKotel({
    config: apiConfigs[configKey],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.mnemoContainer}>
      {showLoading && <Loader delay={1000} size={100} />}
      <Header title={title} maxWidth="1000px" />
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
        {/* mnemo__gif-1 */}
        <GifComponent
          src="/assets/img/kotelnaya/fire-gif.gif"
          alt="Факел горелки"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-1']}`}
          data={data.info}
          objectNumber={objectNumber}
          conditionKey={`Факел горелки котел №${objectNumber}`}
        />

        {/* mnemo__gif-5 */}
        <GifComponent
          src="/assets/img/kotelnaya/iskra.gif"
          alt="Искра"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-5']}`}
          data={data.info}
          objectNumber={objectNumber}
          conditionKey={`Искрообразование котел №${objectNumber}`}
        />

        {/* mnemo__gif-6 */}
        <GifComponent
          src="/assets/img/kotelnaya/fire-zapalnik.gif"
          alt="Факел запальника"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-6']}`}
          data={data.info}
          objectNumber={objectNumber}
          conditionKey={`Факел запальника котел №${objectNumber}`}
        />

        {/* mnemo__gif-7 */}
        <GifComponent
          src="/assets/img/kotelnaya/par.gif"
          alt="Пар"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-7']}`}
          data={data.info}
          objectNumber={objectNumber}
          conditionKey={`Рабочий режим котел №${objectNumber}`}
        />

        {/* mnemo__gif-2 */}
        <GifComponent
          src="/assets/img/kotelnaya/ventilator.png"
          alt="Дымосос"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-2']}`}
          data={data.info}
          objectNumber={objectNumber}
          conditionKey={`Работа дымососа котел №${objectNumber}`}
          isAnimation={true}
        />

        {/* mnemo__gif-3 */}
        <GifComponent
          src="/assets/img/kotelnaya/ventilator.png"
          alt="Вентилятор"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-3']}`}
          data={data.others}
          objectNumber={objectNumber}
          conditionKey={`Индикация работы вентилятора котел №${objectNumber}`}
          isAnimation={true}
        />

        {/* mnemo__gif-4 */}
        <GifComponent
          src="/assets/img/kotelnaya/ventilator.png"
          alt="Пар на трубе"
          className={`${styles['mnemo__gif']} ${styles['mnemo__gif-4']}`}
          data={data.info}
          objectNumber={objectNumber}
          conditionKey={`Рабочий режим котел №${objectNumber}`}
          isAnimation={true}
        />

        {imLabels.map((label, idx) => {
          const value = data.im?.[`${label.key}${objectNumber}`] ?? '—';
          return (
            <div key={idx} className={`${styles['im']} ${label.className}`}>
              {value} %
            </div>
          );
        })}

        {/* Алармы */}
        {alarmLabels.map((label, idx) => {
          const alarmState = data.alarms?.[`${label.key}${objectNumber}`]; // Получаем состояние аларма
          const isAlarmActive = alarmState && alarmState !== '—'; // Проверяем, что состояние не равно "-"
          const alarmClass = isAlarmActive
            ? `${label.className} ${styles.alarmActive}` // Активное состояние
            : `${label.className} ${styles.alarmInactive}`; // Неактивное состояние

          return (
            <div key={idx} className={`${styles['mnemo__alarm']} ${alarmClass}`}>
              <div className={styles['mnemo__alarm-text']}>{label.text}</div>
            </div>
          );
        })}

        {/* Инфо */}
        {infoLabels.map((label, idx) => {
          const infoState = data.info?.[`${label.key}${objectNumber}`]; // Получаем состояние инфо
          const isInfoActive = infoState && infoState !== '—'; // Проверяем, что состояние не равно "-"
          const infoClass = isInfoActive
            ? `${label.className} ${styles.infoActive}` // Активное состояние
            : `${label.className} ${styles.infoInactive}`; // Неактивное состояние

          return (
            <div key={idx} className={`${styles['mnemo__alarm']} ${infoClass}`}>
              <div className={styles['mnemo__alarm-text']}>{label.text}</div>
            </div>
          );
        })}

        <Kran
          size={{ width: 30, height: 24 }}
          adaptiveSize={{ width: 30, height: 24 }}
          status={Boolean(data.info?.[`Клапан запальника котел №${objectNumber}`])}
          orientation="vertical"
          top="405px"
          left="150px"
          adaptiveTop="405px"
          adaptiveLeft="150px"
        />

        <Kran
          size={{ width: 30, height: 24 }}
          adaptiveSize={{ width: 30, height: 24 }}
          status={Boolean(data.info?.[`Клапан отсекатель котел №${objectNumber}`])}
          orientation="horizontal"
          top="150px"
          left="83px"
          adaptiveTop="150px"
          adaptiveLeft="83px"
        />

        <Kran
          size={{ width: 30, height: 24 }}
          adaptiveSize={{ width: 30, height: 24 }}
          status={Boolean(data.info?.[`Клапан отсекатель котел №${objectNumber}`])}
          orientation="horizontal"
          top="275px"
          left="83px"
          adaptiveTop="275px"
          adaptiveLeft="83px"
        />

        <Kran
          size={{ width: 30, height: 24 }}
          adaptiveSize={{ width: 30, height: 24 }}
          status={Boolean(data.info?.[`Клапан отсекатель котел №${objectNumber}`])}
          reverseColorLogic={true} // Обратная логика цвета
          orientation="horizontal"
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
          const dataKeyWithNumber = `${param.dataKey}${objectNumber}`;
          const value = data[param.source]?.[dataKeyWithNumber] ?? '—';
          return (
            <Tooltip
              key={`${param.id}-${objectNumber}-${idx}`} // Уникальный ключ с учетом objectNumber
              tooltipId={param.id}
              content={param.content} // Используем объединённый контент
              disabled={!tooltipsEnabled} // Включен ли тултип
              width={param.width} // Базовая ширина
              responsiveWidth={param.responsiveWidth} // Адаптивная ширина
              placement="top" // Указываем расположение тултипа
            >
              <div
                className={`${styles['mnemo__param']} ${param.className} ${tooltipsEnabled ? styles.enabledHover : ''}`}
              >
                <div className={styles['mnemo__param-naimenov']}>
                  {param.naimenov || 'Нет данных'} {/* Отображение названия параметра */}
                </div>
                <div className={styles['mnemo__param-text']}>
                  <div className={styles['mnemo__param-value']}>{value}</div>
                  <div className={styles['mnemo__param-span']}>{param.unit}</div>
                </div>
              </div>
            </Tooltip>
          );
        })}

        <LevelIndicator
          objectNumber={objectNumber}
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
  );
};

export default MnemoKotel;
