import { FC, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useStore } from "@/store/store";
import { Dropdown } from "./ui/dropdown";

interface ITaskProp {
  id: number;
  text: string;
}

export const Task: FC<ITaskProp> = ({ text, id }) => {
  const {
    tasksArray,
    setTasksArray,
    setFullTimeValue,
    fullTimeValue,
    modalOpen,
  } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState(text);
  const [disable, setDisable] = useState(true);

  const inputRef = useOutsideClick(() => setDisable(true));
  const onClose = () => setIsOpen(false);

  const onDisable = () => setDisable(false);

  const updatePomodoros = (pomodoros: number) => {
    setTasksArray(
      tasksArray.map((item, index) =>
        index === id ? { ...item, pomodoros } : item
      )
    );
  };

  const increaseCount = () => {
    setFullTimeValue(fullTimeValue + 25);
    updatePomodoros(tasksArray[id].pomodoros + 1);
  };

  const decreaseCount = () => {
    setFullTimeValue(fullTimeValue - 25);
    updatePomodoros(tasksArray[id].pomodoros - 1);
  };

  const dropdownRef = () => {
    !modalOpen && setIsOpen(false);
  };

  const ref = useOutsideClick(dropdownRef);

  useEffect(() => {
    setTasksArray(
      tasksArray.map((item, index) =>
        index === id ? { ...item, value: taskText } : item
      )
    );
  }, [taskText]);

  return (
    <div className="relative flex items-center py-4 px-0 border-t border-b border-solid border-gray-300">
      <span className="mr-2 w-6 text-center p-1 border border-solid border-gray-300 rounded-full font-light text-base">
        {tasksArray[id].pomodoros}
      </span>
      <div
        ref={inputRef}
        className="mr-auto text-base bg-transparent font-light"
      >
        <input
          className={clsx(
            "mr-auto text-base font-light",
            disable ? "bg-transparent" : " bg-[#F4F4F4]"
          )}
          disabled={disable}
          onChange={(e) => setTaskText(e.target.value)}
          value={tasksArray[id].value}
          type="text"
        />
      </div>
      <button onClick={() => setIsOpen(true)} className="bg-transparent">
        {" "}
        <Image alt="Button dots" src="/dots.svg" width={26} height={6} />
      </button>
      {isOpen && (
        <div ref={ref}>
          <Dropdown
            decreaseCount={decreaseCount}
            increaseCount={increaseCount}
            onClose={onClose}
            onDisable={onDisable}
            id={id}
          />
        </div>
      )}
    </div>
  );
};