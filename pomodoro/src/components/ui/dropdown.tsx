"use client";

import { FC } from "react";
import Image from "next/image";
import { useStore } from "@/store/store";
import { Modal } from "./modal";

interface DropdownProps {
  id: number;
  onClose: () => void;
  onDisable: () => void;
  increaseCount: () => void;
  decreaseCount: () => void;
}

export const Dropdown: FC<DropdownProps> = ({
  id,
  onClose,
  onDisable,
  increaseCount,
  decreaseCount,
}) => {
  const {
    tasksArray,
    setTasksArray,
    fullTimeValue,
    setFullTimeValue,
    modalOpen,
    setModalOpen,
  } = useStore();

  const removeItem = () => {
    setFullTimeValue(fullTimeValue - tasksArray[id].pomodoros * 25);

    setTasksArray(tasksArray.filter((item, index) => index !== id));

    onClose();

    setModalOpen(false);
  };

  const editItem = () => {
    onClose();
    onDisable();
  };

  return (
    <div className="absolute top-14 -right-[74px] flex flex-col items-start bg-white border border-solid border-gray-300 text-base z-10 ">
      <span className="absolute w-2 h-2 -top-1 left-1/2  border-t border-l border-solid border-gray-300 -translate-x-2/4 rotate-45 bg-white"></span>
      <button
        onClick={increaseCount}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <Image
          className="mr-2"
          src="/increase.svg"
          alt="Increase Button"
          width={18}
          height={18}
        />
        {"Увеличить"}
      </button>
      <button
        onClick={decreaseCount}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <Image
          className="mr-2"
          src="/decrease.svg"
          alt="Decrease Button"
          width={18}
          height={18}
        />
        {"Уменьшить"}
      </button>
      <button
        onClick={editItem}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <Image
          className="mr-2"
          src="/edit.svg"
          alt="Edit Button"
          width={18}
          height={18}
        />
        {"Редактировать"}
      </button>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <Image
          className="mr-2"
          src="/delete.svg"
          alt="Delete Button"
          width={18}
          height={18}
        />
        {"Удалить"}
      </button>
      {modalOpen && <Modal removeItem={removeItem} />}
    </div>
  );
};
