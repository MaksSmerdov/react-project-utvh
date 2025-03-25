import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const GeneralGasKotel: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-gas-kotel1"
        title="График давления газа котла №1"
        yMin={0}
        yMax={4000}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление газа котел №1', label: 'Давление газа', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={true}
      />
      <UniversalChart
        id="chart-gas-kotel2"
        title="График давления газа котла №2"
        yMin={0}
        yMax={4000}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление газа котел №2', label: 'Давление газа', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={false}
      />
      <UniversalChart
        id="chart-gas-kotel3"
        title="График давления газа котла №3"
        yMin={0}
        yMax={4000}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel3/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление газа котел №3', label: 'Давление газа', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default GeneralGasKotel;
