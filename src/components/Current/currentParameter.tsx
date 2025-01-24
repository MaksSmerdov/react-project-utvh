import React, { useEffect, useState } from 'react';
import Header from '../Common/Header/header';
import Table from '../Common/Table/table';
import { ApiConfig } from '../../configs/apiConfigUtvh';

interface CurrentParameterProps {
  config: ApiConfig;
  title: string;
  showHeader?: boolean; // Управление отображением заголовка
}

const CurrentParameter: React.FC<CurrentParameterProps> = ({
  config,
  title,
  showHeader = true,
}) => {
  const [data, setData] = useState(config.defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.apiUrl);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const result = await response.json();

        // Фильтрация данных для каждого типа
        const filteredData = Object.keys(config.defaultData).reduce((acc, key) => {
          acc[key] = Object.fromEntries(
            Object.entries(result[key] || {}).filter(([param]) => param in config.defaultData[key])
          );
          return acc;
        }, {} as any);

        // Устанавливаем отфильтрованные данные
        setData(filteredData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [config.apiUrl, config.defaultData]);

  return (
    <div>
      {showHeader && <Header title={title} maxWidth='100%' />}
      <div>
        {Object.entries(config.titles).map(([key, tableTitle]) => (
          <div key={key}>
            <Table
              title={tableTitle}
              items={data[key] || {}}
              displayNames={config.displayNames[key] || {}}
              width="100%"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentParameter;