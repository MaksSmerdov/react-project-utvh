import React from 'react';
import UniversalChart from '../../../components/Charts/chart';
import { IntervalProvider } from '../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../utils/apiUtils';

const GeneralLevelHvo: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-level-hvo1"
        title="График уровня ХВО №1"
        yMin={0}
        yMax={2000}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/hvo1/data`,
            dataKey: 'parameters',
            params: [
              { key: 'Уровень воды в емкости E1/1', label: 'Уровень в емкости E1/1', unit: 'мм' },
              { key: 'Уровень воды в емкости E1/2', label: 'Уровень в емкости E1/2', unit: 'мм' },
            ],
          },
        ]}
        showIntervalSelector={true}
      />
      <UniversalChart
        id="chart-level-hvo2"
        title="График уровня ХВО №2"
        yMin={0}
        yMax={6500}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/hvo2/data`,
            dataKey: 'parameters',
            params: [
              { key: 'Уровень воды в E2/1 (Титан)', label: 'Уровень в E2/1 (Титан)', unit: 'мм' },
              { key: 'Уровень воды в E2/1 (Мида)', label: 'Уровень в E2/1 (Мида)', unit: 'мм' },
            ],
          },
        ]}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default GeneralLevelHvo;
