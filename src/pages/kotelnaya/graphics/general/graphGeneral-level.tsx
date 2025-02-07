import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const GeneralLevelKotel: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-level-kotel1"
        title="График параметров котла №1"
        yMin={-100}
        yMax={100}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'parameters',
            params: [{ key: 'Уровень в барабане котел №1', label: 'Уровень в котле', unit: 'мм' }],
          },
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'im',
            params: [
              {
                key: `ИМ уровня котел №1`,
                label: `Процент открытия`,
                unit: '%',
              },
            ],
          },
        ]}
        showIntervalSelector={true} // Включаем селектор интервала, если нужно
      />
      <UniversalChart
        id="chart-level-kotel2"
        title="График параметров котла №2"
        yMin={-100}
        yMax={100}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'parameters',
            params: [{ key: 'Уровень в барабане котел №2', label: 'Уровень в котле', unit: 'мм' }],
          },
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'im',
            params: [
              {
                key: `ИМ уровня котел №2`,
                label: `Процент открытия`,
                unit: '%',
              },
            ],
          },
        ]}
        showIntervalSelector={false}
      />
      <UniversalChart
        id="chart-level-kotel3"
        title="График параметров котла №3"
        yMin={-100}
        yMax={100}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel3/data`,
            dataKey: 'parameters',
            params: [{ key: 'Уровень в барабане котел №3', label: 'Уровень в котле', unit: 'мм' }],
          },
          {
            apiUrl: `${apiBaseUrl}/api/kotel3/data`,
            dataKey: 'im',
            params: [
              {
                key: `ИМ уровня котел №3`,
                label: `Процент открытия`,
                unit: '%',
              },
            ],
          },
        ]}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default GeneralLevelKotel;
