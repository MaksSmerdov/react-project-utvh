import React, { useState, useEffect } from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import Loader from '../../../components/Common/Preloader/preloader';
import styles from './currentParam-kotel.module.scss'; // Импорт стилей

interface CurrentParameterKotelProps {
  kotelNumber: number; // Номер котла (1, 2 или 3)
}

const CurrentParameterKotel: React.FC<CurrentParameterKotelProps> = ({ kotelNumber }) => {
  const [isLoading, setIsLoading] = useState(true); // Состояние для управления загрузкой
  const [data, setData] = useState<any>(null); // Состояние для хранения данных
  const [error, setError] = useState<string | null>(null); // Состояние для обработки ошибок
  const [isLoaderVisible, setIsLoaderVisible] = useState(true); // Состояние для управления видимостью прелоудера

  const config = apiConfigs[`kotel${kotelNumber}` as keyof typeof apiConfigs];
  const title = `Котел №${kotelNumber}`;

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
        setError(null); // Сбрасываем ошибку, если данные успешно загружены
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить данные'); // Устанавливаем сообщение об ошибке
      } finally {
        setIsLoading(false);
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
  }, [config.apiUrl, config.defaultData]);

  if (!config) {
    return <div>Конфигурация для котла №{kotelNumber} не найдена.</div>;
  }

  if (error) {
    return <div className={styles['error-message']}>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <>
      {isLoaderVisible && <Loader delay={1000} size={80} />}
      {!isLoading && data && (
        <div className={`${styles.contentContainer} ${!isLoaderVisible ? styles.visible : ''}`}>
          <CurrentParameter
            config={config}
            title={title}
            data={data} // Передаем загруженные данные в CurrentParameter
            showHeader={true} // Управление отображением заголовка
          />
        </div>
      )}
    </>
  );
};

export default CurrentParameterKotel;
