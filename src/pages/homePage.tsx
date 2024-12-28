import React, { useState } from "react";
import styles from './homePage.module.scss';
import MnemoKotel from "../components/Mnemo/kotelnaya/mnemoKotel";
import CurrentParameter from "../components/Current/currentParameter";
import { apiConfigs } from "../configs/apiConfigKotelnaya";

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kotel-1' | 'kotel-2' | 'kotel-3' | null>(null);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(null);

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
      { label: 'Мнемосхема', component: <MnemoKotel configKey="kotel1" title="Котел №1" objectNumber={1} /> },
      { label: 'Текущие параметры', component: <CurrentParameter config={apiConfigs.kotel1} title="Котел №1" /> },
    
    ],
    'kotel-2': [
      { label: 'Мнемосхема', component: <MnemoKotel configKey="kotel2" title="Котел №2" objectNumber={2} /> },
      { label: 'Текущие параметры', component: <CurrentParameter config={apiConfigs.kotel2} title="Котел №2" /> },
      
    ],
    'kotel-3': [
      { label: 'Мнемосхема', component: <MnemoKotel configKey="kotel3" title="Котел №3" objectNumber={3} /> },
      { label: 'Текущие параметры', component: <CurrentParameter config={apiConfigs.kotel3} title="Котел №3" /> },
    ],
  };

  return (
    <div className={styles['container']}>
      <div className={styles['tab-container']}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as 'kotel-1' | 'kotel-2' | 'kotel-3');
              setActiveComponent(subTabs[tab.id as 'kotel-1' | 'kotel-2' | 'kotel-3'][0].component); // По умолчанию отображаем первый компонент
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
            <h2 className={styles['tab-content__title']}>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
            <div className={styles['tab-content__sub-tab-container']}>
              {subTabs[activeTab].map((subTab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveComponent(subTab.component)}
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
        {activeComponent}
      </div>
    </div>
  );
};

export default HomePage;
