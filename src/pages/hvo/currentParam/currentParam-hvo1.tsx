import React from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import Header from '../../../components/Common/Header/header';
import styles from './currentParam-hvo.module.scss';

// Функция для фильтрации параметров по группам
const filterParameters = (parameters: Record<string, string | number>, filterFn: (key: string) => boolean) => {
  return Object.fromEntries(Object.entries(parameters).filter(([key]) => filterFn(key)));
};

const CurrentParameterHvo1: React.FC = () => {
  const { defaultData, displayNames } = apiConfigs.hvo1;
  const { parameters } = defaultData; // Извлекаем параметры из defaultData

  // Фильтруем параметры для каждой группы
  const pressures = filterParameters(parameters, (key) => key.includes('Давление'));
  const levels = filterParameters(parameters, (key) => key.includes('Уровень'));
  const flows = filterParameters(parameters, (key) => key.includes('Расход'));
  const others = filterParameters(
    parameters,
    (key) => !key.includes('Давление') && !key.includes('Уровень') && !key.includes('Расход')
  );

  return (
    <div>
      <Header title="ХВО щит №1" />
      <div className={styles.tables}>
        {/* Таблица с давлениями */}
        {Object.keys(pressures).length > 0 && (
          <CurrentParameter
            config={{
              apiUrl: apiConfigs.hvo1.apiUrl,
              defaultData: { parameters: pressures },
              titles: { parameters: 'Давления' },
              displayNames: { parameters: displayNames.parameters },
            }}
            title="ХВО щит №1"
            showLoading={false}
            showHeader={false}
          />
        )}

        {/* Таблица с уровнями */}
        {Object.keys(levels).length > 0 && (
          <CurrentParameter
            config={{
              apiUrl: apiConfigs.hvo1.apiUrl,
              defaultData: { parameters: levels },
              titles: { parameters: 'Уровни' },
              displayNames: { parameters: displayNames.parameters },
            }}
            title="Уровни"
            showLoading={false}
            showHeader={false} // Заголовок скрыт
          />
        )}

        {/* Таблица с расходами */}
        {Object.keys(flows).length > 0 && (
          <CurrentParameter
            config={{
              apiUrl: apiConfigs.hvo1.apiUrl,
              defaultData: { parameters: flows },
              titles: { parameters: 'Расходы' },
              displayNames: { parameters: displayNames.parameters },
            }}
            title="Расходы"
            showLoading={false}
            showHeader={false} // Заголовок скрыт
          />
        )}

        {/* Таблица с остальными параметрами */}
        {Object.keys(others).length > 0 && (
          <CurrentParameter
            config={{
              apiUrl: apiConfigs.hvo1.apiUrl,
              defaultData: { parameters: others },
              titles: { parameters: 'Остальные параметры' },
              displayNames: { parameters: displayNames.parameters },
            }}
            title="Остальные параметры"
            showLoading={false}
            showHeader={false} // Заголовок скрыт
          />
        )}
      </div>
    </div>
  );
};

export default CurrentParameterHvo1;
