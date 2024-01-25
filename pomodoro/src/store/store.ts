import { TOTAL_TIME } from '@/constants/constants';
import { create } from 'zustand';

export interface TasksArrayProps {
  value: string;
  pomodoros: number;
}

export interface State {
  tasksArray: TasksArrayProps[];
  setTasksArray: (tasksArray: TasksArrayProps[]) => void;
  fullTimeValue: number;
  setFullTimeValue: (fullTimeValue: number) => void;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  pauseTime: number;
  setPauseTime: (pauseTime: number) => void;
  stopCount: number;
  setStopCount: (stopCount: number) => void;
  workingTime: number;
  setWorkingTime: (workingTime: number) => void;
  successTaskCount: number;
  setSuccessTaskCount: (successTaskCount: number) => void;
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  timeRemaining: number;
  setTimeRemaining: (timeRemaining: number) => void;
  taskCountIsDone: number
  setTaskCountIsDone: (taskCountIsDone: number) => void;
}

export const useStore = create<State>((set) => ({
  tasksArray: [],
  setTasksArray: (tasksArray) => set({ tasksArray }),
  fullTimeValue: 0,
  setFullTimeValue: (fullTimeValue) => set({ fullTimeValue }),
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
  pauseTime: 0,
  setPauseTime: (pauseTime) => set({ pauseTime }),
  stopCount: 0,
  setStopCount: (stopCount) => set({ stopCount }),
  workingTime: 0,
  setWorkingTime: (workingTime) => set({ workingTime }),
  successTaskCount: 0,
  setSuccessTaskCount: (successTaskCount) => set({ successTaskCount }),
  isStarted: false,
  setIsStarted: (isStarted) => set({ isStarted }),
  isPaused: false,
  setIsPaused: (isPaused) => set({ isPaused }),
  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
  timeRemaining: TOTAL_TIME,
  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
  taskCountIsDone: 1,
  setTaskCountIsDone: (taskCountIsDone) => set({ taskCountIsDone })
}));
