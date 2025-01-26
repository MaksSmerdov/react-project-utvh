import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Импортируем стандартные стили
import styles from './homePage.module.scss';
import MnemoKotel from '../kotelnaya/mnemo/mnemoKotel';
import CurrentParameterHvo1 from '../hvo/currentParam/currentParam-hvo1';
import CurrentParameterHvo2 from '../hvo/currentParam/currentParam-hvo2';
import CurrentParameterKotel from '../kotelnaya/currentParam/currentParam-kotel';
import GeneralLevelKotel from '../kotelnaya/graphics/general/graphGeneral-level';
import GeneralParKotel from '../kotelnaya/graphics/general/graphGeneral-par';
import MnemoHvo1 from '../hvo/mnemo/mnemo-hvo1';

const HomePage: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedSubTabIndex, setSelectedSubTabIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
    setSelectedSubTabIndex(0); // Сбрасываем саб-таб на "Мнемосхему"
  };

  const handleSubTabChange = (index: number) => {
    setSelectedSubTabIndex(index);
  };

  return (
    <div className={styles['container']}>
      <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabChange}>
        <TabList className={styles['tab-list']}>
          <Tab
            className={styles['tab']}
            selectedClassName={styles['tab--selected']} // Класс для активного таба
          >
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
                  Мнемосхема
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Текущие параметры
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Графики уровня
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Графики пара
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
                  <CurrentParameterKotel kotelNumber={1} fullPageLoader={false} />
                </div>
              </TabPanel>

              {/* Панель графиков уровня */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <GeneralLevelKotel></GeneralLevelKotel>
                </div>
              </TabPanel>

              {/* Панель графиков пара */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <GeneralParKotel></GeneralParKotel>
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
                  Мнемосхема
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Текущие параметры
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Графики уровня
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Графики пара
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
                  <CurrentParameterKotel kotelNumber={2} fullPageLoader={false} />
                </div>
              </TabPanel>

              {/* Панель графиков уровня */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <GeneralLevelKotel></GeneralLevelKotel>
                </div>
              </TabPanel>

              {/* Панель графиков пара */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <GeneralParKotel></GeneralParKotel>
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
                  Мнемосхема
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Текущие параметры
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Графики уровня
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Графики пара
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
                  <CurrentParameterKotel kotelNumber={3}/>
                </div>
              </TabPanel>

              {/* Панель графиков уровня */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <GeneralLevelKotel></GeneralLevelKotel>
                </div>
              </TabPanel>

              {/* Панель графиков пара */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <GeneralParKotel></GeneralParKotel>
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
                  Мнемосхема
                </Tab>
                <Tab className={styles['sub-tab']} selectedClassName={styles['sub-tab--selected']}>
                  Текущие параметры
                </Tab>
              </TabList>

              {/* Панель мнемосхемы */}
              <TabPanel>
                <div key={`hvo1-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <MnemoHvo1 fullPageLoader={false} /> {/* Используем компонент MnemoHvo1 */}
                </div>
              </TabPanel>

              {/* Панель текущих параметров */}
              <TabPanel>
                <div key={`hvo1-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <CurrentParameterHvo1 fullPageLoader={false} /> {/* Используем компонент CurrentParameterHvo1 */}
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
                  Текущие параметры
                </Tab>
              </TabList>

              {/* Панель текущих параметров */}
              <TabPanel>
                <div key={`hvo2-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <CurrentParameterHvo2 fullPageLoader={false}/> {/* Используем компонент CurrentParameterHvo2 */}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default HomePage;
