export const handleBackward = (
  startTime: Date,
  endTime: Date,
  setStartTime: (time: Date) => void,
  setEndTime: (time: Date) => void,
  setIsAutoScroll: (autoScroll: boolean) => void
) => {
  setIsAutoScroll(false);
  const newStartTime = new Date(startTime.getTime() - 10 * 60 * 1000);
  const newEndTime = new Date(endTime.getTime() - 10 * 60 * 1000);
  setStartTime(newStartTime);
  setEndTime(newEndTime);
};

export const handleForward = (
  startTime: Date,
  endTime: Date,
  setStartTime: (time: Date) => void,
  setEndTime: (time: Date) => void,
  setIsAutoScroll: (autoScroll: boolean) => void
) => {
  const newStartTime = new Date(startTime.getTime() + 10 * 60 * 1000);
  const newEndTime = new Date(endTime.getTime() + 10 * 60 * 1000);
  setStartTime(newStartTime);
  setEndTime(newEndTime);

  // Проверяем, вернулся ли пользователь к текущим данным
  const now = new Date();
  if (
      newEndTime.getTime() >= now.getTime() - 30 * 60 * 1000 &&
      newStartTime.getTime() <= now.getTime()
  ) {
      setIsAutoScroll(true);
  } else {
      setIsAutoScroll(false);
  }
};

export const handleReturnToCurrent = (
  setStartTime: (time: Date) => void,
  setEndTime: (time: Date) => void,
  setIsAutoScroll: (autoScroll: boolean) => void
) => {
  setIsAutoScroll(true);
  setEndTime(new Date());
  setStartTime(new Date(Date.now() - 30 * 60 * 1000));
};

export const createDataWithGaps = (
  data: { time: Date; values: { [key: string]: any } }[],
  key: string
): (number | null)[] => {
  const result: (number | null)[] = [];
  const timestamps: number[] = data.map((d) => d.time.getTime());

  for (let i = 0; i < data.length; i++) {
      const currentValue = data[i].values[key] !== undefined ? data[i].values[key] : null;
      result.push(currentValue);

      if (i < data.length - 1) {
          const nextTimestamp = timestamps[i + 1];
          const currentTimestamp = timestamps[i];

          if (nextTimestamp - currentTimestamp > 60 * 1000) {
              result.push(null);
          }
      }
  }

  return result;
};