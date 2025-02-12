import React, { useState, useEffect } from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import Header from '../../../components/Common/Header/header';
import styles from './currentParam-hvo.module.scss';
import Loader from '../../../components/Common/Preloader/preloader';

const CurrentParameterHvo1: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true); // Состояние для управления видимостью прелоудера
  const { displayNames, apiUrl } = apiConfigs.hvo1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const result = await response.json();

        // Фильтрация данных для каждой группы
        const pressures = Object.fromEntries(
          Object.entries(result.parameters).filter(([key]) => key.includes('Давление'))
        );
        const levels = Object.fromEntries(Object.entries(result.parameters).filter(([key]) => key.includes('Уровень')));
        const flows = Object.fromEntries(Object.entries(result.parameters).filter(([key]) => key.includes('Расход')));
        const others = Object.fromEntries(
          Object.entries(result.parameters).filter(
            ([key]) => !key.includes('Давление') && !key.includes('Уровень') && !key.includes('Расход')
          )
        );

        // Сохраняем отфильтрованные данные
        setData({ pressures, levels, flows, others });
        setError(null);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные');
      } finally {
        setIsLoading(false);
        // Плавное исчезновение прелоудера через 0.1 секунды
        setTimeout(() => setIsLoaderVisible(false), 100);
      }
    };

    let interval: NodeJS.Timeout;

    const delayLoading = setTimeout(() => {
      fetchData();
      interval = setInterval(fetchData, 5000);
    }, 1000);

    return () => {
      clearTimeout(delayLoading);
      clearInterval(interval);
    };
  }, [apiUrl]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {isLoaderVisible && <Loader delay={1000} size={80} />}
      {!isLoading && data && (
        <div className={`${styles.contentContainer} ${!isLoaderVisible ? styles.visible : ''}`}>
          {/* Шапка для всей страницы */}
          <Header title="ХВО щит №1" maxWidth="100%" />

          {/* Таблицы */}
          <div className={styles.tables}>
            {/* Таблица с давлениями */}
            {Object.keys(data.pressures).length > 0 && (
              <CurrentParameter
                config={{
                  apiUrl,
                  defaultData: { parameters: data.pressures },
                  titles: { parameters: 'Давления' },
                  displayNames: { parameters: displayNames.parameters },
                }}
                data={{ parameters: data.pressures }}
                title="Давления"
                showHeader={false}
              />
            )}

            {/* Таблица с уровнями */}
            {Object.keys(data.levels).length > 0 && (
              <CurrentParameter
                config={{
                  apiUrl,
                  defaultData: { parameters: data.levels },
                  titles: { parameters: 'Уровни' },
                  displayNames: { parameters: displayNames.parameters },
                }}
                data={{ parameters: data.levels }}
                title="Уровни"
                showHeader={false}
              />
            )}

            {/* Таблица с расходами */}
            {Object.keys(data.flows).length > 0 && (
              <CurrentParameter
                config={{
                  apiUrl,
                  defaultData: { parameters: data.flows },
                  titles: { parameters: 'Расходы' },
                  displayNames: { parameters: displayNames.parameters },
                }}
                data={{ parameters: data.flows }}
                title="Расходы"
                showHeader={false}
              />
            )}

            {/* Таблица с остальными параметрами */}
            {Object.keys(data.others).length > 0 && (
              <CurrentParameter
                config={{
                  apiUrl,
                  defaultData: { parameters: data.others },
                  titles: { parameters: 'Остальные параметры' },
                  displayNames: { parameters: displayNames.parameters },
                }}
                data={{ parameters: data.others }}
                title="Остальные параметры"
                showHeader={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentParameterHvo1;
