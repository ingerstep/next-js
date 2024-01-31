import { useEffect } from 'react';
import { useLocalStorageState } from './use-storage';
import { TOTAL_TIME } from '@/constants/constants';
import { useTimerStore } from '@/store/timer-store';
import { TasksArrayProps, useTasksStore } from '@/store/tasks-store';

export interface StatisticsProps {
  stopCount: number;
  workingTime: number;
  pauseTime: number;
  successTaskCount: number;
  day: number;
  taskCountIsDone: number;
}

export const useCountdown = () => {
  const {
    timeRemaining,
    setTimeRemaining,
    isRunning,
    setIsRunning,
    stopCount,
    setStopCount,
    isStarted,
    setIsStarted,
    workingTime,
    setWorkingTime,
    isPaused,
    setIsPaused,
    pauseTime,
    setPauseTime,
  } = useTimerStore();

  const {
    tasksArray,
    setTasksArray,
    taskCountIsDone,
    setTaskCountIsDone,
    successTaskCount,
    setSuccessTaskCount,
    fullTimeValue,
    setFullTimeValue,
  } = useTasksStore();

  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const [lastSavedTime, setLastSavedTime] = useLocalStorageState<number>(
    'lastSavedTime',
    TOTAL_TIME,
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



      setSuccessTaskCount(successTaskCount + 1);
      setFullTimeValue(fullTimeValue - 25);

      if (dayStatisticsIndex !== -1) {
        updatedStatistics[dayStatisticsIndex] = {
          ...updatedStatistics[dayStatisticsIndex],
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
            taskCountIsDone
          },
        ]);
      };

      if (tasksArray.length !== filteredArray.length) {
        setTaskCountIsDone(taskCountIsDone + 1);
        if (dayStatisticsIndex !== -1) {
          updatedStatistics[dayStatisticsIndex] = {
            ...updatedStatistics[dayStatisticsIndex],
            taskCountIsDone: taskCountIsDone + 1,
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
              taskCountIsDone: taskCountIsDone + 1
            },
          ]);
        };
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
    pauseTime,
    setStorageStaistics
  ]);

  const addOneMinute = () => {
    setIsRunning(false);
    if (tasksArray.length !== 0) {
      isStarted && setIsPaused(true);
      setTimeRemaining(timeRemaining + 60);
      setLastSavedTime((prev) => prev + 60);
    }
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

  return {
    start,
    pause,
    resume,
    stop,
    skip,
    addOneMinute,
  };
};
