import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const GeneralVacuumKotel: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-vacuum-kotel1"
        title="График разрежения котла №1"
        yMin={-13}
        yMax={13}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'parameters',
            params: [{ key: 'Разрежение в топке котел №1', label: 'Разрежение', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={true}
      />
      <UniversalChart
        id="chart-vacuum-kotel2"
        title="График разрежения котла №2"
        yMin={-13}
        yMax={13}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'parameters',
            params: [{ key: 'Разрежение в топке котел №2', label: 'Разрежение', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={false}
      />
      <UniversalChart
        id="chart-vacuum-kotel3"
        title="График разрежения котла №3"
        yMin={-13}
        yMax={13}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel3/data`,
            dataKey: 'parameters',
            params: [{ key: 'Разрежение в топке котел №3', label: 'Разрежение', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default GeneralVacuumKotel;
