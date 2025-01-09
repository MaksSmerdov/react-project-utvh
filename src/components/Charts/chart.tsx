import React, { useEffect, useState, useRef } from 'react';
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
import {
    handleBackward,
    handleForward,
    handleReturnToCurrent,
    createDataWithGaps,
} from './utils/chartUtils';

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
    params: { key: string; label: string }[];
}

interface GenericData {
    lastUpdated: string;
    [key: string]: any;
}

const UniversalChart: React.FC<UniversalChartProps> = ({ apiUrl, title, yMin, yMax, dataKey, params }) => {
    const chartRef = useRef<ChartJS<'line'> | null>(null);
    const [startTime, setStartTime] = useState(new Date(Date.now() - 30 * 60 * 1000));
    const [endTime, setEndTime] = useState(new Date());
    const { data, refetch } = useData(apiUrl, startTime, endTime);
    const [allHidden, setAllHidden] = useState(false);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isAutoScroll) {
                setEndTime(new Date());
                setStartTime(new Date(Date.now() - 30 * 60 * 1000));
            } else {
                refetch();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoScroll, refetch]);


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

    const options: ChartOptions<'line'> = getChartOptions(
        startTime.getTime(),
        endTime.getTime(),
        title,
        isAutoScroll,
        yMin,
        yMax
    );

    return (
        <div style={{ width: '1200px', height: '400px', marginBottom: '50px' }}>
            <Line ref={chartRef} data={chartData} options={options} />
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => handleBackward(startTime, endTime, setStartTime, setEndTime, setIsAutoScroll)}>
                    Назад
                </button>
                <button
                    onClick={() => handleForward(startTime, endTime, setStartTime, setEndTime, setIsAutoScroll)}
                    style={{ marginLeft: '10px' }}
                >
                    Вперёд
                </button>
                <button onClick={handleToggleAll} style={{ marginLeft: '10px' }}>
                    {allHidden ? 'Показать все' : 'Скрыть все'}
                </button>
                <button
                    onClick={() => handleReturnToCurrent(setStartTime, setEndTime, setIsAutoScroll)}
                    style={{ marginLeft: '10px' }}
                >
                    Вернуться к текущим данным
                </button>
            </div>
        </div>
    );
};

export default UniversalChart;
