import React from 'react';
import Header from '../Common/Header/header';
import Table from '../Common/Table/table';
import { ApiConfig } from '../../configs/apiConfigUtvh';

interface CurrentParameterProps {
  config: ApiConfig;
  title: string;
  data: any; // Данные, переданные из CurrentParameterKotel
  showHeader?: boolean; // Управление отображением заголовка
}

const CurrentParameter: React.FC<CurrentParameterProps> = ({
  config,
  title,
  data,
  showHeader = true,
}) => {
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