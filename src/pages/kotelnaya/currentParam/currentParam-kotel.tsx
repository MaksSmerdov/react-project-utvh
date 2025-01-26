import React, { useState, useEffect } from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import Loader from '../../../components/Common/Preloader/preloader';

interface CurrentParameterKotelProps {
  kotelNumber: number; // Номер котла (1, 2 или 3)
  fullPageLoader?: boolean; // Пропс для управления прелоудером (на всю страницу или нет)
}

const CurrentParameterKotel: React.FC<CurrentParameterKotelProps> = ({
  kotelNumber,
  fullPageLoader = true, // По умолчанию прелоудер на всю страницу
}) => {
  const [isLoading, setIsLoading] = useState(true); // Состояние для управления загрузкой
  const [data, setData] = useState<any>(null); // Состояние для хранения данных
  const [error, setError] = useState<string | null>(null); // Состояние для обработки ошибок
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
        setIsLoading(false); // Загрузка завершена
      }
    };

    // Устанавливаем задержку в 1 секунду перед началом загрузки
    const delayLoading = setTimeout(() => {
      setIsLoading(true);
      fetchData(); // Первый запрос данных
      const interval = setInterval(fetchData, 5000); // Обновление данных каждые 5 секунд
      return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, 1000);

    return () => clearTimeout(delayLoading); // Очистка таймера при размонтировании
  }, [config.apiUrl, config.defaultData]);

  if (!config) {
    return <div>Конфигурация для котла №{kotelNumber} не найдена.</div>;
  }

  if (error) {
    return <div>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <>
      {isLoading && (
        <Loader
          delay={1000}
          size={80}
        />
      )}
      {!isLoading && data && (
        <CurrentParameter
          config={config}
          title={title}
          data={data} // Передаем загруженные данные в CurrentParameter
          showHeader={true} // Управление отображением заголовка
        />
      )}
    </>
  );
};

export default CurrentParameterKotel;