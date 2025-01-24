import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const LevelKotel1: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-level-kotel1"
        title="График параметров котла №1"
        yMin={-100}
        yMax={100}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'parameters',
            params: [
              { key: 'Уровень в барабане котел №1', label: 'Уровень в котле №1', unit: 'мм' },
            ],
          },
        ]}
        showIntervalSelector={true} // Включаем селектор интервала, если нужно
      />
    </IntervalProvider>
  );
};

export default LevelKotel1;
