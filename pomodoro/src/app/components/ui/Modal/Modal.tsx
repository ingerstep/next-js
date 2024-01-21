import { FC } from "react";
import styles from "./Modal.module.scss";
import Image from "next/image";
import { useStore } from "@/app/store/store";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

interface IModal {
  removeItem: () => void;
}

export const Modal: FC<IModal> = ({ removeItem }) => {
  const { setModalOpen } = useStore();

  const ref = useOutsideClick(() => setModalOpen(false));

  return (
    <div className={styles.modal}>
      <div ref={ref} className={styles.content}>
        <div className={styles.title}>Удалить задачу?</div>
        <button onClick={removeItem} className={styles.delete}>
          Удалить
        </button>
        <button onClick={() => setModalOpen(false)} className={styles.cancel}>
          Отмена
        </button>
        <button onClick={() => setModalOpen(false)} className={styles.exit}>
          <Image src="/exit.svg" alt="Exit Button" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};
