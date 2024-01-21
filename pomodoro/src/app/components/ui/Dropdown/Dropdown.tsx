import { FC } from "react";
import Image from "next/image";
import styles from "./Dropdown.module.scss";
import { useStore } from "@/app/store/store";
import { Modal } from "../Modal/Modal";
import { createPortal } from "react-dom";

interface IDropdown {
  id: number;
  onClose: () => void;
  onDisable: () => void;
  increaseCount:()=>void
  decreaseCount:()=>void
}

export const Dropdown: FC<IDropdown> = ({ id, onClose, onDisable, increaseCount, decreaseCount }) => {
  const { tasksArray, setTasksArray, fullTimeValue, setFullTimeValue, modalOpen, setModalOpen } = useStore();

  const node = document.querySelector('#modal')
  if (!node) return

  const removeItem = () => {
    setFullTimeValue(fullTimeValue - tasksArray[id].pomodoros * 25)

    setTasksArray(tasksArray.filter((item, index) => index !== id));

    onClose();

    setModalOpen(false)
  };

  const editItem = () => {
    onDisable();
    onClose();
  };

  return (
    <div className={styles.dropdown}>
      <span className={styles.square}></span>
      <button onClick={increaseCount} className={styles.button}>
        <Image
          className={styles.img}
          src="/increase.svg"
          alt="Increase Button"
          width={18}
          height={18}
        />
        {"Увеличить"}
      </button>
      <button onClick={decreaseCount} className={styles.button}>
        <Image
          className={styles.img}
          src="/decrease.svg"
          alt="Decrease Button"
          width={18}
          height={18}
        />
        {"Уменьшить"}
      </button>
      <button onClick={editItem} className={styles.button}>
        <Image
          className={styles.img}
          src="/edit.svg"
          alt="Edit Button"
          width={18}
          height={18}
        />
        {"Редактировать"}
      </button>
      <button onClick={()=>{
        setModalOpen(true)
      }} className={styles.button}>
        <Image
          className={styles.img}
          src="/delete.svg"
          alt="Delete Button"
          width={18}
          height={18}
        />
        {"Удалить"}
      </button>
      {modalOpen  && createPortal(<Modal removeItem={removeItem} />, node)}
    </div>
  );
};
