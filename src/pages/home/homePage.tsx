import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './homePage.module.scss';
import MnemoKotel from '../kotelnaya/mnemo/mnemoKotel';
import CurrentParameterHvo1 from '../hvo/currentParam/currentParam-hvo1';
import CurrentParameterHvo2 from '../hvo/currentParam/currentParam-hvo2';
import CurrentParameterKotel from '../kotelnaya/currentParam/currentParam-kotel';
import GeneralGasKotel from '../kotelnaya/graphics/general/graphGeneral-gas'
import GeneralLevelKotel from '../kotelnaya/graphics/general/graphGeneral-level';
import GeneralParKotel from '../kotelnaya/graphics/general/graphGeneral-par';
import GeneralPressureKotel from '../kotelnaya/graphics/general/graphGeneral-pressure';
import GeneralVacuumKotel from '../kotelnaya/graphics/general/graphGeneral-vacuum';
import MnemoHvo1 from '../hvo/mnemo/mnemo-hvo1';
import MnemoHvo2 from '../hvo/mnemo/mnemo-hvo2';
import GeneralLevelHvo from '../hvo/graphics/graphGeneral-level';
import Icon from '../../components/Common/CustomIcon/icon';
import Loader from '../../components/Common/Preloader/preloader';

const HomePage: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedSubTabIndex, setSelectedSubTabIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Симуляция загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
    setSelectedSubTabIndex(0); // Сбрасываем саб-таб на "Мнемосхему"
  };

  const handleSubTabChange = (index: number) => {
    setSelectedSubTabIndex(index);
  };

  return (
    <>
      <div className={`${styles['loader-overlay']} ${!isLoading ? styles['loader-overlay--hidden'] : ''}`}>
        <Loader size={100} />
      </div>
      <div className={styles['container']}>
        <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabChange}>
          <TabList className={styles['tab-list']}>
            <Tab className={styles['tab']} selectedClassName={styles['tab--selected']}>
              Котел №1
            </Tab>
            <Tab className={styles['tab']} selectedClassName={styles['tab--selected']}>
              Котел №2
            </Tab>
            <Tab className={styles['tab']} selectedClassName={styles['tab--selected']}>
              Котел №3
            </Tab>
            <Tab className={styles['tab']} selectedClassName={styles['tab--selected']}>
              ХВО щит №1
            </Tab>
            <Tab className={styles['tab']} selectedClassName={styles['tab--selected']}>
              ХВО щит №2
            </Tab>
          </TabList>

          {/* Панель для котла №1 */}
          <TabPanel>
            <div className={styles['tab-content']}>
              <Tabs selectedIndex={selectedSubTabIndex} onSelect={handleSubTabChange}>
                <TabList className={styles['sub-tab-list']}>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="wrench" />
                    Мнемосхема
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="grid" />
                    Текущие параметры
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики уровня
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики пара
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики газа
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики воздуха
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики разрежения
                  </Tab>
                </TabList>

                {/* Панель мнемосхемы */}
                <TabPanel>
                  <div key={`kotel1-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <MnemoKotel kotelNumber={1} />
                  </div>
                </TabPanel>

                {/* Панель текущих параметров */}
                <TabPanel>
                  <div key={`kotel1-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <CurrentParameterKotel kotelNumber={1} />
                  </div>
                </TabPanel>

                {/* Панель графиков уровня */}
                <TabPanel>
                  <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralLevelKotel />
                  </div>
                </TabPanel>

                {/* Панель графиков пара */}
                <TabPanel>
                  <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralParKotel />
                  </div>
                </TabPanel>
                {/* Панель графиков газа */}
                <TabPanel>
                  <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralGasKotel/>
                  </div>
                </TabPanel>
                {/*Панель графиков давления воздуха*/}
                <TabPanel>
                  <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralPressureKotel />
                  </div>
                </TabPanel>
                {/*Панель графиков разрежения*/}
                <TabPanel>
                  <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralVacuumKotel />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>

          {/* Панель для котла №2 */}
          <TabPanel>
            <div className={styles['tab-content']}>
              <Tabs selectedIndex={selectedSubTabIndex} onSelect={handleSubTabChange}>
                <TabList className={styles['sub-tab-list']}>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="wrench" />
                    Мнемосхема
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="grid" />
                    Текущие параметры
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики уровня
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики пара
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики газа
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики воздуха
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики разрежения
                  </Tab>
                </TabList>

                {/* Панель мнемосхемы */}
                <TabPanel>
                  <div key={`kotel2-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <MnemoKotel kotelNumber={2} />
                  </div>
                </TabPanel>

                {/* Панель текущих параметров */}
                <TabPanel>
                  <div key={`kotel2-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <CurrentParameterKotel kotelNumber={2} />
                  </div>
                </TabPanel>

                {/* Панель графиков уровня */}
                <TabPanel>
                  <div key={`kotel2-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralLevelKotel />
                  </div>
                </TabPanel>

                {/* Панель графиков пара */}
                <TabPanel>
                  <div key={`kotel2-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralParKotel />
                  </div>
                </TabPanel>

                {/* Панель графиков газа */}
                <TabPanel>
                  <div key={`kotel2-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralGasKotel/>
                  </div>
                </TabPanel>
                {/*Панель графиков давления воздуха*/}
                <TabPanel>
                  <div key={`kotel2-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralPressureKotel />
                  </div>
                </TabPanel>
                {/*Панель графиков разрежения*/}
                <TabPanel>
                  <div key={`kotel2-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralVacuumKotel />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>

          {/* Панель для котла №3 */}
          <TabPanel>
            <div className={styles['tab-content']}>
              <Tabs selectedIndex={selectedSubTabIndex} onSelect={handleSubTabChange}>
                <TabList className={styles['sub-tab-list']}>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="wrench" />
                    Мнемосхема
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="grid" />
                    Текущие параметры
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики уровня
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики пара
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики газа
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики воздуха
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики разрежения
                  </Tab>
                </TabList>

                {/* Панель мнемосхемы */}
                <TabPanel>
                  <div key={`kotel3-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <MnemoKotel kotelNumber={3} />
                  </div>
                </TabPanel>

                {/* Панель текущих параметров */}
                <TabPanel>
                  <div key={`kotel3-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <CurrentParameterKotel kotelNumber={3} />
                  </div>
                </TabPanel>

                {/* Панель графиков уровня */}
                <TabPanel>
                  <div key={`kotel3-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralLevelKotel />
                  </div>
                </TabPanel>

                {/* Панель графиков пара */}
                <TabPanel>
                  <div key={`kotel3-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralParKotel />
                  </div>
                </TabPanel>

                {/* Панель графиков газа */}
                <TabPanel>
                  <div key={`kotel3-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralGasKotel/>
                  </div>
                </TabPanel>

                {/*Панель графиков давления воздуха*/}
                <TabPanel>
                  <div key={`kotel3-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralPressureKotel />
                  </div>
                </TabPanel>

                {/*Панель графиков разрежения*/}
                <TabPanel>
                  <div key={`kotel3-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralVacuumKotel />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>

          {/* Панель для ХВО1 */}
          <TabPanel>
            <div className={styles['tab-content']}>
              <Tabs selectedIndex={selectedSubTabIndex} onSelect={handleSubTabChange}>
                <TabList className={styles['sub-tab-list']}>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="wrench" />
                    Мнемосхема
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="grid" />
                    Текущие параметры
                  </Tab>

                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики
                  </Tab>
                </TabList>

                {/* Панель мнемосхемы */}
                <TabPanel>
                  <div key={`hvo1-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <MnemoHvo1 />
                  </div>
                </TabPanel>

                {/* Панель текущих параметров */}
                <TabPanel>
                  <div key={`hvo1-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <CurrentParameterHvo1 />
                  </div>
                </TabPanel>

                {/* Панель графиков */}
                <TabPanel>
                  <div key={`hvo1-graph-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralLevelHvo />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>

          {/* Панель для ХВО2 */}
          <TabPanel>
            <div className={styles['tab-content']}>
              <Tabs selectedIndex={selectedSubTabIndex} onSelect={handleSubTabChange}>
                <TabList className={styles['sub-tab-list']}>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="wrench" />
                    Мнемосхема
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="grid" />
                    Текущие параметры
                  </Tab>
                  <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                    <Icon name="graph" />
                    Графики
                  </Tab>
                </TabList>

                {/* Панель мнемосхемы */}
                <TabPanel>
                  <div key={`hvo2-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <MnemoHvo2 /> {/* Добавляем компонент MnemoHvo2 */}
                  </div>
                </TabPanel>

                {/* Панель текущих параметров */}
                <TabPanel>
                  <div key={`hvo2-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <CurrentParameterHvo2 />
                  </div>
                </TabPanel>

                {/* Панель графиков */}
                <TabPanel>
                  <div key={`hvo2-graph-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                    <GeneralLevelHvo />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default HomePage;
