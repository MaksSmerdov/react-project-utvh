import React from 'react';
import UniversalChart from '../../../../components/Charts/chart';
import { IntervalProvider } from '../../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../../utils/apiUtils';

const GeneralPressureKotel: React.FC = () => {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-pressure-kotel1"
        title="График давления воздуха котла №1"
        yMin={0}
        yMax={200}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel1/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление воздуха котел №1', label: 'Давление воздуха', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={true}
      />
      <UniversalChart
        id="chart-pressure-kotel2"
        title="График давления воздуха котла №2"
        yMin={0}
        yMax={200}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel2/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление воздуха котел №2', label: 'Давление воздуха', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={false}
      />
      <UniversalChart
        id="chart-pressure-kotel3"
        title="График давления воздуха котла №3"
        yMin={0}
        yMax={200}
        animationEnabled={false}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel3/data`,
            dataKey: 'parameters',
            params: [{ key: 'Давление воздуха котел №3', label: 'Давление воздуха', unit: 'кг/м²' }],
          },
        ]}
        showIntervalSelector={false}
      />
    </IntervalProvider>
  );
};

export default GeneralPressureKotel;
