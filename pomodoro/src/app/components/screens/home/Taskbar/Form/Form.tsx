"use client";

import { ChangeEvent, FC, useState } from "react";
import styles from "./Form.module.scss";
import { ITask, useStore } from "@/app/store/store";
import { Task } from "./Task/Task";

export const Form: FC = () => {
  const { tasksArray, setTasksArray, fullTimeValue, setFullTimeValue } = useStore();
  const [value, setValue] = useState<string>("");
  const hours = Math.floor(fullTimeValue / 60);
  const remainderMinutes = fullTimeValue % 60;
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value) {
      const newTask: ITask = { value, pomodoros: 1 };
      setTasksArray([...tasksArray, newTask]);
      setValue("");
      setFullTimeValue(fullTimeValue + 25);
    }
  };

  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder="Название задачи"
        type="text"
      />
      <button className={styles.button} onClick={handleClick}>
        Добавить
      </button>
      {tasksArray.map((task, index) => (
        <Task key={index} text={task.value} id={index} />
      ))}
      <div className={styles.tasks}>
        {tasksArray.length !== 0 && <span className={styles.timer}>{hours !== 0 && `${hours} час `}{`${remainderMinutes} минут`}</span>}
      </div>
    </div>
  );
};
