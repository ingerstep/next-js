import { FC, useEffect, useState } from "react";
import styles from "./Task.module.scss";
import Image from "next/image";
import { Dropdown } from "@/app/components/ui/Dropdown/Dropdown";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { useStore } from "@/app/store/store";

interface ITaskProp {
  id: number;
  text: string;
}

export const Task: FC<ITaskProp> = ({ text, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState(text);
  const [disable, setDisable] = useState(true);
  const {
    tasksArray,
    setTasksArray,
    setFullTimeValue,
    fullTimeValue,
    modalOpen,
  } = useStore();

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

  const inputRef = useOutsideClick(() => setDisable(true));

  useEffect(() => {
    setTasksArray(
      tasksArray.map((item, index) => {
        if (index === id) {
          return { ...item, value: taskText };
        }
        return item;
      })
    );
  }, [taskText]);

  return (
    <div className={styles.task}>
      <span className={styles.id}>{tasksArray[id].pomodoros}</span>
      <div ref={inputRef} className={styles.text}>
        <input
          className={disable ? styles.text : styles.edit}
          disabled={disable}
          onChange={(e) => setTaskText(e.target.value)}
          value={tasksArray[id].value}
          type="text"
        />
      </div>
      <button onClick={() => setIsOpen(true)} className={styles.button}>
        {" "}
        <Image
          className={styles.dots}
          alt="Button dots"
          src="/dots.svg"
          width={26}
          height={6}
        />
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
