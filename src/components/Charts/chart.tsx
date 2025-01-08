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
import { getChartOptions } from './chartConfig';

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
    params: { key: string; label: string; color: string }[];
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

    useEffect(() => {
        const interval = setInterval(() => {
            setEndTime(new Date());
            setStartTime(new Date(Date.now() - 30 * 60 * 1000));
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        if (chartRef.current) {
            refetch();
        }
    }, [startTime, endTime, refetch]);
    
    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);
    

    const handleBackward = () => {
        const newStartTime = new Date(startTime.getTime() - 60 * 60 * 1000);
        const newEndTime = new Date(endTime.getTime() - 60 * 60 * 1000);
        setStartTime(newStartTime);
        setEndTime(newEndTime);
    };

    const handleForward = () => {
        const newStartTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        const newEndTime = new Date(endTime.getTime() + 60 * 60 * 1000);
        setStartTime(newStartTime);
        setEndTime(newEndTime);
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

    const processedData = data.map((item: GenericData) => ({
        time: new Date(item.lastUpdated),
        values: item[dataKey] || {},
    }));

    const chartData = {
        labels: processedData.map((d) => d.time),
        datasets: params.map((param) => ({
            label: param.label,
            data: processedData.map((d) => d.values[param.key] ?? null),
            borderColor: param.color,
            backgroundColor: `${param.color}33`,
        })),
    };

    const options: ChartOptions<'line'> = getChartOptions(
        startTime.getTime(),
        endTime.getTime(),
        title,
        yMin,
        yMax
    );

    return (
        
        <div style={{ width: '1200px', height:'400px', marginBottom: '50px' }}>
            <Line ref={chartRef} data={chartData} options={options} />
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleBackward}>Назад</button>
                <button onClick={handleForward} style={{ marginLeft: '10px' }}>
                    Вперед
                </button>
                <button onClick={handleToggleAll} style={{ marginLeft: '10px' }}>
                    {allHidden ? 'Показать все' : 'Скрыть все'}
                </button>
            </div>
        </div>
    );
};

export default UniversalChart;
