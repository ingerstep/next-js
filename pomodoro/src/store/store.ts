import { create } from "zustand";

export interface ITask {
  value: string;
  pomodoros: number;
}

export interface State {
  tasksArray: ITask[];
  setTasksArray: (tasksArray: ITask[]) => void;
  fullTimeValue: number;
  setFullTimeValue: (fullTimeValue: number) => void
  modalOpen: boolean
  setModalOpen: (modalOpen: boolean) => void
  pauseTime: number
  setPauseTime: (pauseTime: number) => void;
  stopCount: number
  setStopCount: (stopCount: number) => void
  workingTime: number
  setWorkingTime: (workingTime: number) => void
};

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
}));