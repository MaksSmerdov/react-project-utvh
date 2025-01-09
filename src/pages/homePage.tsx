import React, { useState } from 'react';
import styles from './homePage.module.scss';
import MnemoKotel from '../components/Mnemo/kotelnaya/mnemoKotel';
import CurrentParameter from '../components/Current/currentParameter';
import { apiConfigs } from '../configs/apiConfigKotelnaya';
import Loader from '../components/Common/Preloader/preloader'; // Импортируйте ваш Loader
import UniversalChart from '../components/Charts/chart';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kotel-1' | 'kotel-2' | 'kotel-3' | null>(null);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(null);
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки

  const tabs = [
    { id: 'kotel-1', label: 'Котел №1' },
    { id: 'kotel-2', label: 'Котел №2' },
    { id: 'kotel-3', label: 'Котел №3' },
  ];

  const subTabs: {
    'kotel-1': { label: string; component: React.ReactNode }[];
    'kotel-2': { label: string; component: React.ReactNode }[];
    'kotel-3': { label: string; component: React.ReactNode }[];
  } = {
    'kotel-1': [
      {
        label: 'Мнемосхема',
        component: <MnemoKotel configKey="kotel1" title="Котел №1" objectNumber={1} showLoader={false} />,
      },
      {
        label: 'Текущие параметры',
        component: <CurrentParameter config={apiConfigs.kotel1} title="Котел №1" showLoader={false} />,
      },
      {
        label: 'Графики уровня',
        component: (
          <>
            <div className={styles['graph-container']}>
              <div className={styles['graph-top']}>
                <UniversalChart
                  apiUrl="http://localhost:3002/api/kotel1/data"
                  title="График уровня котла №1"
                  yMin={-315}
                  yMax={315}
                  dataKey="parameters"
                  params={[{ key: 'Уровень в барабане котел №1', label: 'Уровень в котле №1' }]}
                />
                <UniversalChart
                  apiUrl="http://localhost:3002/api/kotel2/data"
                  title="График уровня котла №2"
                  yMin={-315}
                  yMax={315}
                  dataKey="parameters"
                  params={[{ key: 'Уровень в барабане котел №2', label: 'Уровень в котле №2' }]}
                />
              </div>
              <div className={styles['graph-bottom']}>
                <UniversalChart
                  apiUrl="http://localhost:3002/api/kotel3/data"
                  title="График уровня котла №3"
                  yMin={-315}
                  yMax={315}
                  dataKey="parameters"
                  params={[{ key: 'Уровень в барабане котел №3', label: 'Уровень в котле №3' }]}
                  width={1600}  // Ширина графика
                  height={400}  // Высота графика
                />
              </div>
            </div>
          </>
        ),
      },
    ],
    'kotel-2': [
      {
        label: 'Мнемосхема',
        component: <MnemoKotel configKey="kotel2" title="Котел №2" objectNumber={2} showLoader={false} />,
      },
      {
        label: 'Текущие параметры',
        component: <CurrentParameter config={apiConfigs.kotel2} title="Котел №2" showLoader={false} />,
      },
    ],
    'kotel-3': [
      {
        label: 'Мнемосхема',
        component: <MnemoKotel configKey="kotel3" title="Котел №3" objectNumber={3} showLoader={false} />,
      },
      {
        label: 'Текущие параметры',
        component: <CurrentParameter config={apiConfigs.kotel3} title="Котел №3" showLoader={false} />,
      },
    ],
  };

  const handleSubTabClick = async (component: React.ReactNode) => {
    setLoading(true); // Начинаем загрузку
    setActiveComponent(null); // Сбрасываем активный компонент, чтобы прелоадер отображался

    // Здесь вы можете добавить логику загрузки данных, если это необходимо
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Симуляция задержки загрузки

    setActiveComponent(component);
    setLoading(false); // Завершаем загрузку
  };

  return (
    <div className={styles['container']}>
      <div className={styles['tab-container']}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as 'kotel-1' | 'kotel-2' | 'kotel-3');
              handleSubTabClick(subTabs[tab.id as 'kotel-1' | 'kotel-2' | 'kotel-3'][0].component); // По умолчанию отображаем первый компонент
            }}
            className={`${styles['tab-container__button']} ${
              activeTab === tab.id ? styles['tab-container__button--active'] : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles['tab-content']}>
        {activeTab && (
          <div className={styles['tab-container-box']}>
            <div className={styles['tab-content__sub-tab-container']}>
              {subTabs[activeTab].map((subTab, index) => (
                <button
                  key={index}
                  onClick={() => handleSubTabClick(subTab.component)}
                  className={styles['sub-tab-button']}
                >
                  {subTab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles['component-container']}>
        <Loader size={80} loading={loading} /> {/* Использование Loader */}
        {activeComponent}
      </div>
    </div>
  );
};

export default HomePage;
