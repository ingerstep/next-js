"use client";

import { FC } from "react";
import styles from "./HeaderDash.module.scss";
import { useStore } from "@/app/store/store";

export const HeaderDash: FC = () => {
  const { tasksArray } = useStore();
  return (
    <div className={styles.header}>
      <div className={styles.task}>{tasksArray[0] && tasksArray[0].value}</div>
      <div className={styles.pomodor}>Помидор {1}</div>
    </div>
  );
};
