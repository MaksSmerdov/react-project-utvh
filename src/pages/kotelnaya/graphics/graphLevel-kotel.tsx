import React from 'react';
import UniversalChart from '../../../components/Charts/chart';
import { IntervalProvider } from '../../../components/Charts/context/intervalContext';
import { getApiBaseUrl } from '../../../utils/apiUtils';

interface LevelKotelProps {
  kotelNumber: number; // Номер котла, передаваемый через пропс
}

const GraphLevelKotel: React.FC<LevelKotelProps> = ({ kotelNumber }) => {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <IntervalProvider>
      <UniversalChart
        id={`chart-level-kotel${kotelNumber}`} // Динамический ID на основе номера котла
        title={`График параметров котла №${kotelNumber}`} // Динамический заголовок
        yMin={-100}
        yMax={100}
        datasets={[
          {
            apiUrl: `${apiBaseUrl}/api/kotel${kotelNumber}/data`, // Динамический API URL
            dataKey: 'parameters',
            params: [
              { 
                key: `Уровень в барабане котел №${kotelNumber}`, // Динамический ключ параметра
                label: `Уровень в котле`, // Динамическая метка
                unit: 'мм', 
              },
            ],
          },
        ]}
        showIntervalSelector={true}
      />
    </IntervalProvider>
  );
};

export default GraphLevelKotel;