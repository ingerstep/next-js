import { useEffect, useState } from 'react';
import { TasksArrayProps, useStore } from '../store/store';
import { useLocalStorageState } from './use-storage';
import { TOTAL_TIME } from '@/constants/constants';

export interface StatisticsProps {
  stopCount: number;
  workingTime: number;
  pauseTime: number;
  successTaskCount: number;
  day: number;
}

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
    fullTimeValue,
    setFullTimeValue,
    isStarted,
    setIsStarted,
    isPaused,
    setIsPaused,
    isRunning,
    setIsRunning,
    timeRemaining,
    setTimeRemaining,
    taskCountIsDone, setTaskCountIsDone
  } = useStore();

  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const [lastSavedTime, setLastSavedTime] = useLocalStorageState<number>(
    'lastSavedTime',
    TOTAL_TIME,
  );

  const [tasksIsDone, setTaskIsDone] = useLocalStorageState<number>(
    'tasksIsDone',
    1,
  );

  const [storageTasks, setStorageTasks] = useLocalStorageState<Array<TasksArrayProps>>(
    'tasksArray',
    [],
  );
  useEffect(() => {
    let countdownTimer: any = null;
    let pauseTimer: any = null;


    if (isRunning) {
      countdownTimer = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
        setLastSavedTime(timeRemaining - 1);
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
      const currentDay = new Date().getDay();
      const dayStatisticsIndex = storageStaistics.findIndex((item) => item.day === currentDay);
      const updatedStatistics = [...storageStaistics];

      const filteredArray = tasksArray
        .map((item, index) => ({
          ...item,
          pomodoros: index === 0 ? item.pomodoros - 1 : item.pomodoros,
        }))
        .filter((item) => item.pomodoros !== 0
        );

      setTasksArray(filteredArray);
      setStorageTasks(filteredArray);

      if (tasksArray.length !== filteredArray.length) {
        setTaskCountIsDone(taskCountIsDone + 1);
        setTaskIsDone(taskCountIsDone + 1);
      }

      setSuccessTaskCount(successTaskCount + 1);
      setFullTimeValue(fullTimeValue - 25);

      if (dayStatisticsIndex !== -1) {
        updatedStatistics[dayStatisticsIndex] = {
          ...updatedStatistics[dayStatisticsIndex],
          stopCount,
          workingTime,
          pauseTime,
          successTaskCount: successTaskCount + 1,
        };
        setStorageStaistics(updatedStatistics);
      } else {
        setStorageStaistics((prevStatistics) => [
          ...prevStatistics,
          {
            stopCount,
            workingTime,
            pauseTime,
            successTaskCount: successTaskCount + 1,
            day: currentDay,
          },
        ]);
      }

      clearInterval(countdownTimer);
      setIsRunning(false);
      setTimeRemaining(TOTAL_TIME);
      setLastSavedTime(TOTAL_TIME);
      setIsStarted(false);


      alert('Count down');
    }

    return () => {
      clearInterval(countdownTimer);
      clearInterval(pauseTimer);
    };
  }, [
    taskCountIsDone,
    tasksArray,
    isRunning,
    isPaused,
    timeRemaining,
    setPauseTime,
    successTaskCount,
    fullTimeValue,
    lastSavedTime,
  ]);

  const addOneMinute = () => {
    setIsRunning(false);
    tasksArray.length !== 0 && isStarted && setIsPaused(true);
    tasksArray.length !== 0 && setTimeRemaining(timeRemaining + 60);
    tasksArray.length !== 0 && setLastSavedTime((prev) => prev + 60);
  };

  const start = () => {
    setTimeRemaining(timeRemaining);
    setLastSavedTime(timeRemaining);
    tasksArray.length !== 0 && setIsRunning(true);
    tasksArray.length !== 0 && setIsStarted(true);
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
    setLastSavedTime(TOTAL_TIME);
    setIsPaused(false);
    isStarted && setStopCount(stopCount + 1);
    setIsStarted(false);
  };

  const skip = () => {
    stop();
    setFullTimeValue(fullTimeValue - 25);
    setTasksArray(tasksArray.filter((item, index) => index !== 0));
    setStorageTasks(tasksArray.filter((item, index) => index !== 0));
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
    setIsRunning,
    start,
    pause,
    resume,
    stop,
    skip,
    TOTAL_TIME,
    addOneMinute,
    isStarted,
    successTaskCount,
    taskCountIsDone,
    isPaused,
    lastSavedTime,
    setTimeRemaining,
    setIsPaused,
    setIsStarted,
  };
};
