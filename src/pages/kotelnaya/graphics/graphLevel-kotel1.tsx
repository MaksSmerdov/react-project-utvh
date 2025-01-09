import React from 'react';
import UniversalChart from "../../../components/Charts/chart";

const LevelKotel1: React.FC = () => {
    return (
<UniversalChart
    apiUrl="http://localhost:3002/api/kotel1/data"
    title="График параметров котла №1"
    yMin={-100}
    yMax={100}
    dataKey="parameters" // Указываем ключ для извлечения данных
    params={[
        { key: 'Уровень в барабане котел №1', label: 'Уровень в котле' },
    ]}
/>
    );
};

export default LevelKotel1;
