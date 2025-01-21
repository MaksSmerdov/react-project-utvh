import { useEffect, useState } from 'react';
import { apiConfigs } from '../../../../configs/apiConfigUtvh';

type KotelKey = keyof typeof apiConfigs;

interface Config<K extends KotelKey> {
  config: (typeof apiConfigs)[K];
}

type Data<K extends KotelKey> = (typeof apiConfigs)[K]['defaultData'];

const useMnemoKotel = <K extends KotelKey>({ config }: Config<K>) => {
  const [data, setData] = useState<Data<K>>(config.defaultData);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFirstLoad) setIsLoading(true);
        const response = await fetch(config.apiUrl);
        if (!response.ok) {
          throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        const errorMsg =
          error.name === 'TypeError' && error.message.includes('Failed to fetch')
            ? `Ошибка: Не удалось подключиться к серверу. Проверьте подключение или URL: ${config.apiUrl}`
            : `Ошибка загрузки данных: ${error.message}`;
        console.error(errorMsg);

        // Устанавливаем все значения в defaultData на "—"
        setDefaultDataToDashes(config.defaultData);
      } finally {
        if (isFirstLoad) {
          setIsFirstLoad(false);
          setIsLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [config.apiUrl, config.defaultData, isFirstLoad]);

  const setDefaultDataToDashes = (defaultData: Record<string, Record<string, string | number>>) => {
    const updatedData = { ...defaultData };
    for (const category in updatedData) {
      for (const key in updatedData[category]) {
        updatedData[category][key] = '—'; // Устанавливаем каждое значение на "—"
      }
    }
    setData(updatedData); // Обновляем состояние data
  };

  const toggleTooltips = () => setTooltipsEnabled((prev) => !prev);

  return {
    data,
    isLoading,
    tooltipsEnabled,
    toggleTooltips,
  };
};

export default useMnemoKotel;
