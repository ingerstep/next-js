"use client";

import { ChangeEvent, FC, useState } from "react";
import { ITask, useStore } from "@/store/store";
import { Task } from "./Task";
import { Button } from "./ui/button";

export const Form: FC = () => {
  const { tasksArray, setTasksArray, fullTimeValue, setFullTimeValue } =
    useStore();
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
    <div className="flex flex-col w-[370px]">
      <input
        className="py-5 px-4 text-[#999] bg-[#F4F4F4] text-base font-light"
        value={value}
        onChange={onChange}
        placeholder="Название задачи"
        type="text"
      />
      <Button size="default" variant="green" onClick={handleClick}>
        Добавить
      </Button>
      {tasksArray.map((task, index) => (
        <Task key={index} text={task.value} id={index} />
      ))}
      <div className="mb-6">
        {tasksArray.length !== 0 && (
          <span className="text-[#999] text-base font-light">
            {hours !== 0 && `${hours} час `}
            {`${remainderMinutes} минут`}
          </span>
        )}
      </div>
    </div>
  );
};
