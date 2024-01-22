"use client";

import { FC } from "react";
import { useStore } from "@/store/store";
import { Modal } from "./modal";
import { SvgIncrease } from "../icons/increase";
import { SvgDecrease } from "../icons/decrease";
import { SvgEdit } from "../icons/edit";
import { SvgDelete } from "../icons/delete";

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
        <SvgIncrease />
        <span className="ml-2">Увеличить</span>
      </button>
      <button
        onClick={decreaseCount}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <SvgDecrease />
        <span className="ml-2">Уменьшить</span>
      </button>
      <button
        onClick={editItem}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <SvgEdit />
        <span className="ml-2">Редактировать</span>
      </button>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="flex items-center w-full  py-2 px-4 hover:bg-[#F4F4F4] transition-colors"
      >
        <SvgDelete />
        <span className="ml-2">Удалить</span>
      </button>
      {modalOpen && <Modal removeItem={removeItem} />}
    </div>
  );
};
