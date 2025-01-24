import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const LevelKotel2: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-level-kotel2"
        title="График параметров котла №2"
        yMin={-100}
        yMax={100}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'parameters',
            params: [
              { key: 'Уровень в барабане котел №2', label: 'Уровень в котле №2', unit: 'мм' },
            ],
          },
        ]}
        showIntervalSelector={true}
      />
    </IntervalProvider>
  );
};

export default LevelKotel2;
