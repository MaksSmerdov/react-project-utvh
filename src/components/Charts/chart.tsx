import React, { useEffect, useState, useRef } from 'react';
import styles from './chart.module.scss';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import CrosshairPlugin from 'chartjs-plugin-crosshair';
import { useData } from './hooks/useData';
import { getChartOptions, colors } from './config/chartConfig';
import { handleBackward, handleForward, handleReturnToCurrent, createDataWithGaps } from './utils/chartUtils';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CrosshairPlugin
);

interface UniversalChartProps {
  apiUrl: string;
  title: string;
  yMin?: number;
  yMax?: number;
  dataKey: string;
  params: { key: string; label: string; unit?: string }[]; // Добавлено свойство unit
  width?: number | string; // Ширина графика
  height?: number | string; // Высота графика
}

interface GenericData {
  lastUpdated: string;
  [key: string]: any;
}

const UniversalChart: React.FC<UniversalChartProps> = ({
  apiUrl,
  title,
  yMin,
  yMax,
  dataKey,
  params,
  width = 900,
  height = 400,
}) => {
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const [timeInterval, setTimeInterval] = useState(10);
  const [startTime, setStartTime] = useState(new Date(Date.now() - timeInterval * 60 * 1000));
  const [endTime, setEndTime] = useState(new Date());
  const { data, refetch } = useData(apiUrl, startTime, endTime);
  const [allHidden, setAllHidden] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoScroll) {
        setEndTime(new Date());
        setStartTime(new Date(Date.now() - timeInterval * 60 * 1000));
      } else {
        refetch();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScroll, timeInterval, refetch]);

  const processedData = data.map((item: GenericData) => ({
    time: new Date(item.lastUpdated),
    values: item[dataKey] || {},
  }));

  const chartData = {
    labels: processedData.map((d) => d.time),
    datasets: params.map((param, index) => ({
      label: param.label,
      data: createDataWithGaps(processedData, param.key),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      spanGaps: false,
    })),
  };

  const handleToggleAll = () => {
    if (chartRef.current) {
      chartRef.current.data.datasets.forEach((_, index) => {
        const meta = chartRef.current?.getDatasetMeta(index);
        if (meta) {
          meta.hidden = !allHidden;
        }
      });
      chartRef.current.update();
    }
    setAllHidden(!allHidden);
  };

  const handleIntervalChange = (newInterval: number) => {
    setTimeInterval(newInterval);
    setStartTime(new Date(Date.now() - newInterval * 60 * 1000));
    setEndTime(new Date());
  };

  const options: ChartOptions<'line'> = getChartOptions(
    startTime.getTime(),
    endTime.getTime(),
    title,
    isAutoScroll,
    params, // Передаем параметры
    yMin,
    yMax,
  );

  return (
    <div style={{ width, height, marginBottom: '50px' }}>
      <div className={styles['dynamic-graph__btns']}>
        <button className={styles['dynamic-graph__btn']} onClick={() => handleIntervalChange(10)}>
          10 минут
        </button>
        <button className={styles['dynamic-graph__btn']} onClick={() => handleIntervalChange(30)}>
          30 минут
        </button>
      </div>
      <Line ref={chartRef} data={chartData} options={options} />
      <div className={styles['dynamic-graph__btns']}>
        <button
          className={styles['dynamic-graph__btn']}
          onClick={() => handleBackward(startTime, endTime, setStartTime, setEndTime, setIsAutoScroll)}
        >
          Назад
        </button>
        <button
          className={styles['dynamic-graph__btn']}
          onClick={() => handleForward(startTime, endTime, setStartTime, setEndTime, setIsAutoScroll)}
        >
          Вперёд
        </button>
        <button className={styles['dynamic-graph__btn']} onClick={handleToggleAll}>
          {allHidden ? 'Показать все' : 'Скрыть все'}
        </button>
        <button
          className={styles['dynamic-graph__btn']}
          onClick={() => handleReturnToCurrent(setStartTime, setEndTime, setIsAutoScroll)}
        >
          Вернуться к текущим данным
        </button>
      </div>
    </div>
  );
};

export default UniversalChart;
