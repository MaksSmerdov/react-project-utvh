import React, { useState, useEffect } from 'react';
import CurrentParameter from '../../../components/Current/currentParameter';
import { apiConfigs } from '../../../configs/apiConfigUtvh';
import Header from '../../../components/Common/Header/header'; // Импортируем Header
import styles from './currentParam-hvo.module.scss';
import Loader from '../../../components/Common/Preloader/preloader';

interface CurrentParameterHvo1Props {
  fullPageLoader?: boolean; // Пропс для управления прелоудером (на всю страницу или нет)
}

const CurrentParameterHvo1: React.FC<CurrentParameterHvo1Props> = ({
  fullPageLoader = true, // По умолчанию прелоудер не на всю страницу
}) => {
  const [isLoading, setIsLoading] = useState(true); // Состояние для управления загрузкой
  const [data, setData] = useState<any>(null); // Состояние для хранения данных
  const [error, setError] = useState<string | null>(null); // Состояние для обработки ошибок
  const { displayNames, apiUrl } = apiConfigs.hvo1; // Убрали defaultData, так как она не используется

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
        const levels = Object.fromEntries(
          Object.entries(result.parameters).filter(([key]) => key.includes('Уровень'))
        );
        const flows = Object.fromEntries(
          Object.entries(result.parameters).filter(([key]) => key.includes('Расход'))
        );
        const others = Object.fromEntries(
          Object.entries(result.parameters).filter(
            ([key]) =>
              !key.includes('Давление') && !key.includes('Уровень') && !key.includes('Расход')
          )
        );

        // Сохраняем отфильтрованные данные
        setData({ pressures, levels, flows, others });
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
  }, [apiUrl]);

  if (error) {
    return <div>{error}</div>; // Отображение ошибки, если она есть
  }

  return (
    <div>
      {isLoading && (
        <Loader
          delay={1000}
          size={80}
        />
      )}
      {!isLoading && data && (
        <>
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
                data={{ parameters: data.pressures }} // Передаем данные для давлений
                title="Давления"
                showHeader={false} // Шапка больше не нужна внутри таблицы
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
                data={{ parameters: data.levels }} // Передаем данные для уровней
                title="Уровни"
                showHeader={false} // Шапка больше не нужна внутри таблицы
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
                data={{ parameters: data.flows }} // Передаем данные для расходов
                title="Расходы"
                showHeader={false} // Шапка больше не нужна внутри таблицы
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
                data={{ parameters: data.others }} // Передаем данные для остальных параметров
                title="Остальные параметры"
                showHeader={false} // Шапка больше не нужна внутри таблицы
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentParameterHvo1;