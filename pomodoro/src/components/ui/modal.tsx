import { FC } from "react";
import Image from "next/image";
import { useStore } from "@/store/store";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";

interface ModalProps {
  removeItem: () => void;
}

export const Modal: FC<ModalProps> = ({ removeItem }) => {
  const { setModalOpen } = useStore();
  const node = document.querySelector("#modal");
  const ref = useOutsideClick(() => setModalOpen(false));

  if (!node) return;

  return createPortal(
    <div className="absolute w-full h-full top-0 flex justify-center items-center bg-black/50">
      <div
        ref={ref}
        className="relative flex flex-col items-center py-6 px-20 bg-white"
      >
        <div className="mb-6 text-[#333] text-2xl font-normal">
          Удалить задачу?
        </div>
        <button
          onClick={removeItem}
          className="mb-2 py-4 px-12 text-white text-center text-base bg-[#DC3E22] font-medium"
        >
          Удалить
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="pb-1 text-[#333] text-base font-light border-b-[2px solid #333]"
        >
          Отмена
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-3 right-3"
        >
          <Image src="/exit.svg" alt="Exit Button" width={24} height={24} />
        </button>
      </div>
    </div>,
    node
  );
};
