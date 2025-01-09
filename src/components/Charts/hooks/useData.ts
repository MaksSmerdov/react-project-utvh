import { useState, useEffect, useCallback } from 'react';
import { GenericData } from '../types';

export const useData = (apiUrl: string, startTime: Date, endTime: Date) => {
    const [data, setData] = useState<GenericData[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(
                `${apiUrl}?start=${startTime.toISOString()}&end=${endTime.toISOString()}`
            );
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            const result: GenericData[] = await response.json();
            setData(result);
        } catch (err) {
            console.error('Ошибка при запросе данных:', err);
            setError(err as Error);
        }
    }, [apiUrl, startTime, endTime]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, refetch: fetchData };
};
