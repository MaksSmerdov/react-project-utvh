import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Импортируем стандартные стили
import styles from './homePage.module.scss';
import MnemoKotel from '../components/Mnemo/kotelnaya/mnemoKotel';
import UniversalChart from '../components/Charts/chart';
import { IntervalProvider } from '../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../utils/apiUtils'; // Импортируем функцию
import Loader from '../components/Common/Preloader/preloader';
import CurrentParameterHvo1 from './hvo/currentParam-hvo1';
import CurrentParameterHvo2 from './hvo/currentParam-hvo2';
import CurrentParameterKotel1 from './kotelnaya/currentParam/currentParam-kotel1';
import CurrentParameterKotel2 from './kotelnaya/currentParam/currentParam-kotel2';
import CurrentParameterKotel3 from './kotelnaya/currentParam/currentParam-kotel3';

const HomePage: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [selectedSubTabIndex, setSelectedSubTabIndex] = useState<number>(0);

  const apiBaseUrl = getApiBaseUrl(); // Получаем базовый URL

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
    setSelectedSubTabIndex(0); // Сбрасываем саб-таб на "Мнемосхему"
  };

  const handleSubTabChange = (index: number) => {
    setSelectedSubTabIndex(index);
  };

  return (
    <div className={styles['container']}>
      <Loader delay={1000} size={100} />
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
                  <MnemoKotel configKey="kotel1" title="Котел №1" objectNumber={1} />
                </div>
              </TabPanel>

              {/* Панель текущих параметров */}
              <TabPanel>
                <div key={`kotel1-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <CurrentParameterKotel1 /> {/* Используем компонент CurrentParameterKotel1 */}
                </div>
              </TabPanel>

              {/* Панель графиков уровня */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <IntervalProvider>
                    <UniversalChart
                      id="chart-kotel1"
                      apiUrls={`${apiBaseUrl}/api/kotel1/data`}
                      title="График уровня котла №1"
                      yMin={-315}
                      yMax={315}
                      dataKey="parameters"
                      params={[{ key: 'Уровень в барабане котел №1', label: 'Уровень в котле №1', unit: 'мм' }]}
                      showIntervalSelector={true}
                    />
                    <UniversalChart
                      id="chart-kotel2"
                      apiUrls={`${apiBaseUrl}/api/kotel2/data`} // Используем базовый URL
                      title="График уровня котла №2"
                      yMin={-315}
                      yMax={315}
                      dataKey="parameters"
                      params={[{ key: 'Уровень в барабане котел №2', label: 'Уровень в котле №2', unit: 'мм' }]}
                      showIntervalSelector={false}
                    />
                    <UniversalChart
                      id="chart-kotel3"
                      apiUrls={`${apiBaseUrl}/api/kotel3/data`} // Используем базовый URL
                      title="График уровня котла №3"
                      yMin={-315}
                      yMax={315}
                      dataKey="parameters"
                      params={[{ key: 'Уровень в барабане котел №3', label: 'Уровень в котле №3', unit: 'мм' }]}
                      showIntervalSelector={false}
                    />
                  </IntervalProvider>
                </div>
              </TabPanel>

              {/* Панель графиков пара */}
              <TabPanel>
                <div key={`kotel1-charts-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <IntervalProvider>
                    <UniversalChart
                      id="chart-kotel1"
                      apiUrls={`${apiBaseUrl}/api/kotel1/data`}
                      title="График давления пара котел №1"
                      yMin={-1}
                      yMax={10}
                      dataKey="parameters"
                      params={[{ key: 'Давление пара котел №1', label: 'Давление пара', unit: 'кгс/см2' }]}
                      showIntervalSelector={true}
                    />
                    <UniversalChart
                      id="chart-kotel2"
                      apiUrls={`${apiBaseUrl}/api/kotel2/data`} // Используем базовый URL
                      title="График давления пара котел №2"
                      yMin={-1}
                      yMax={10}
                      dataKey="parameters"
                      params={[{ key: 'Давление пара котел №2', label: 'Давление пара', unit: 'кгс/см2' }]}
                      showIntervalSelector={false}
                    />
                    <UniversalChart
                      id="chart-kotel3"
                      apiUrls={`${apiBaseUrl}/api/kotel3/data`} // Используем базовый URL
                      title="График давления пара котел №3"
                      yMin={-1}
                      yMax={10}
                      dataKey="parameters"
                      params={[{ key: 'Давление пара котел №3', label: 'Давление пара', unit: 'кгс/см2' }]}
                      showIntervalSelector={false}
                    />
                  </IntervalProvider>
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
              </TabList>

              {/* Панель мнемосхемы */}
              <TabPanel>
                <div key={`kotel2-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <MnemoKotel configKey="kotel2" title="Котел №2" objectNumber={2} />
                </div>
              </TabPanel>

              {/* Панель текущих параметров */}
              <TabPanel>
                <div key={`kotel2-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <CurrentParameterKotel2 /> {/* Используем компонент CurrentParameterKotel2 */}
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
              </TabList>

              {/* Панель мнемосхемы */}
              <TabPanel>
                <div key={`kotel3-mnemo-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <MnemoKotel configKey="kotel3" title="Котел №3" objectNumber={3} />
                </div>
              </TabPanel>

              {/* Панель текущих параметров */}
              <TabPanel>
                <div key={`kotel3-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <CurrentParameterKotel3 /> {/* Используем компонент CurrentParameterKotel3 */}
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
                  Текущие параметры
                </Tab>
              </TabList>

              {/* Панель текущих параметров */}
              <TabPanel>
                <div key={`hvo1-params-${selectedSubTabIndex}`} className={styles['sub-tab-content']}>
                  <CurrentParameterHvo1 /> {/* Используем компонент CurrentParameterHvo1 */}
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
                  <CurrentParameterHvo2 /> {/* Используем компонент CurrentParameterHvo2 */}
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
