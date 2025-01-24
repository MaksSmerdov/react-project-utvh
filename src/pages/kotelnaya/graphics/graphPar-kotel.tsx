import React from 'react';
import UniversalChart from '../../../components/Charts/chart';
import { IntervalProvider } from '../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../utils/apiUtils';

interface ParKotelProps {
  kotelNumber: number; // Номер котла, передаваемый через пропс
}

const GraphParKotel: React.FC<ParKotelProps> = ({ kotelNumber }) => {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <IntervalProvider>
      <UniversalChart
        id={`chart-par-kotel${kotelNumber}`} // Динамический ID на основе номера котла
        title={`График параметров котла №${kotelNumber}`} // Динамический заголовок
        yMin={-1}
        yMax={10}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel${kotelNumber}/data`, // Динамический API URL
            dataKey: 'parameters',
            params: [
              { 
                key: `Давление пара котел №${kotelNumber}`, // Динамический ключ параметра
                label: `Давление пара`, // Динамическая метка
                unit: 'кгс/см2', 
              },
            ],
          },
        ]}
        showIntervalSelector={true}
      />
    </IntervalProvider>
  );
};

export default GraphParKotel;