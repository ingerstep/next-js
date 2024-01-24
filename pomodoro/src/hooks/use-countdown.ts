import { useEffect, useState } from 'react';
import { TasksArrayProps, useStore } from '../store/store';
import { useLocalStorageState } from './use-storage';

export interface StatisticsProps {
  stopCount: number;
  workingTime: number;
  pauseTime: number;
  successTaskCount: number;
  day: number;
}

const TOTAL_TIME = 5;

export const useCountdown = () => {
  const {
    tasksArray,
    setTasksArray,
    pauseTime,
    setPauseTime,
    stopCount,
    setStopCount,
    workingTime,
    setWorkingTime,
    successTaskCount,
    setSuccessTaskCount,
  } = useStore();
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const [storageTasks, setStorageTasks] = useLocalStorageState<Array<TasksArrayProps>>('array', []);

  const currentDay = new Date().getDay();

  useEffect(() => {
    let countdownTimer: any = null;
    let pauseTimer: any = null;

    if (isRunning) {
      countdownTimer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
        setWorkingTime(workingTime + 1);
      }, 1000);
    } else {
      clearInterval(countdownTimer);
    }

    if (isPaused) {
      pauseTimer = setInterval(() => {
        setPauseTime(pauseTime + 1);
      }, 1000);
    } else {
      clearInterval(pauseTimer);
    }

    if (timeRemaining === 0) {
      const dayStatisticsIndex = storageStaistics.findIndex((item) => item.day === currentDay);

      setSuccessTaskCount(successTaskCount + 1);
      clearInterval(countdownTimer);
      setIsRunning(false);
      setTimeRemaining(TOTAL_TIME);

      const filteredArray = tasksArray
        .map((item, index) => {
          if (index === 0) {
            return {
              ...item,
              pomodoros: item.pomodoros - 1,
            };
          }
          return item;
        })
        .filter((item) => item.pomodoros !== 0);

      setTasksArray(filteredArray);
      setStorageTasks(filteredArray);

      if (dayStatisticsIndex !== -1) {
        const updatedStatistics = [...storageStaistics];
        updatedStatistics[dayStatisticsIndex] = {
          ...updatedStatistics[dayStatisticsIndex],
          stopCount,
          workingTime,
          pauseTime,
          successTaskCount,
        };
        setStorageStaistics(updatedStatistics);
      } else {
        setStorageStaistics((prevStatistics) => [
          ...prevStatistics,
          {
            stopCount,
            workingTime,
            pauseTime,
            successTaskCount,
            day: currentDay,
          },
        ]);
      }

      alert('Count down');
    }

    return () => {
      clearInterval(countdownTimer);
      clearInterval(pauseTimer);
    };
  }, [isRunning, isPaused, timeRemaining, setPauseTime, currentDay]);

  const addOneMinute = () => {
    setTimeRemaining((prevTime) => prevTime + 60);
  };

  const start = () => {
    setTimeRemaining(TOTAL_TIME);
    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (!isRunning && timeRemaining > 0) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const stop = () => {
    setIsRunning(false);
    setTimeRemaining(TOTAL_TIME);
    setIsPaused(false);
    setStopCount(stopCount + 1);
  };

  const skip = () => {
    stop();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
    formatTime,
    timeRemaining,
    isRunning,
    start,
    pause,
    resume,
    stop,
    skip,
    TOTAL_TIME,
    addOneMinute,
  };
};
