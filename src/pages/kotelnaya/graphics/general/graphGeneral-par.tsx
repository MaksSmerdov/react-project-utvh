import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const GeneralParKotel: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-par-kotel1"
        title="График давления пара котел №1"
        yMin={-1}
        yMax={10}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление пара котел №1', label: 'Давление пара', unit: 'кгс/см2' }],
          },
        ]}
        showIntervalSelector={true}
      />
      <UniversalChart
        id="chart-par-kotel2"
        title="График давления пара котел №2"
        yMin={-1}
        yMax={10}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление пара котел №2', label: 'Давление пара', unit: 'кгс/см2' }],
          },
        ]}
        showIntervalSelector={false}
      />
      <UniversalChart
        id="chart-par-kotel3"
        title="График давления пара котел №3"
        yMin={-1}
        yMax={10}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel3/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление пара котел №3', label: 'Давление пара', unit: 'кгс/см2' }],
          },
        ]}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default GeneralParKotel;
