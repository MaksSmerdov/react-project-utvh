import React from 'react';
import UniversalChart from '../../../components/Charts/chart';
import { IntervalProvider } from '../../../components/Charts/context/intervalContext';

const LevelKotel1: React.FC = () => {
  return (
    <IntervalProvider>
      <UniversalChart
        id="chart-kotel1"
        apiUrl="http://localhost:3002/api/kotel1/data"
        title="График параметров котла №1"
        yMin={-100}
        yMax={100}
        dataKey="parameters" // Указываем ключ для извлечения данных
        params={[{ key: 'Уровень в барабане котел №1', label: 'Уровень в котле №1', unit: 'мм' }]}
        showIntervalSelector={true} // Включаем селектор интервала, если нужно
      />
    </IntervalProvider>
  );
};

export default LevelKotel1;
