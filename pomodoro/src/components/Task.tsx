import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useStore } from "@/store/store";
import { Dropdown } from "./ui/dropdown";
import { SvgDots } from "./icons/dots";

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

  const increaseCount = () => {
    setTasksArray(
      tasksArray.map((item, index) => {
        if (index === id) {
          setFullTimeValue(fullTimeValue + 25);
          return {
            ...item,
            pomodoros: item.pomodoros + 1,
          };
        }
        return item;
      })
    );
  };

  const decreaseCount = () => {
    setTasksArray(
      tasksArray.map((item, index) => {
        if (index === id && item.pomodoros > 1) {
          setFullTimeValue(fullTimeValue - 25);
          return {
            ...item,
            pomodoros: item.pomodoros - 1,
          };
        }
        return item;
      })
    );
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
    <div className="relative flex items-center py-4 px-0 -mt-[1px] border-t border-b border-solid border-gray-300">
      <span className="mr-2 w-[25px] h-[25px] text-center border border-solid border-gray-300 rounded-full font-light text-base">
        {tasksArray[id].pomodoros}
      </span>
      <div
        ref={inputRef}
        className="mr-auto text-base bg-transparent font-light"
      >
        <input
          className={clsx(
            "mr-auto text-base font-light focus-visible:outline-none",
            disable ? "bg-transparent" : " bg-[#F4F4F4]"
          )}
          disabled={disable}
          onChange={(e) => setTaskText(e.target.value)}
          value={tasksArray[id].value}
          type="text"
        />
      </div>
      <button onClick={() => setIsOpen(true)} className="bg-transparent">
        <SvgDots />
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
