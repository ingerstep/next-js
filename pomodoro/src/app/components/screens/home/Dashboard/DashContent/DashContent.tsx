"use client";

import { FC } from "react";
import styles from "./DashContnent.module.scss";
import Image from "next/image";
import { useStore } from "@/app/store/store";
import { useCountdown } from "@/app/hooks/useCountdown";

export const DashContent: FC = () => {
  const { tasksArray } = useStore();
  const {
    formatTime,
    timeRemaining,
    isRunning,
    start,
    pause,
    resume,
    stop,
    skip,
    totalTime,
  } = useCountdown();

  return (
    <div className={styles.content}>
      <div className={styles.time}>
        <div className={styles.timer}>{formatTime(timeRemaining)}</div>
        <button className={styles.plus}>
          <Image src="/plus.svg" alt="Plus Button" width={50} height={50} />
        </button>
      </div>
      <span className={styles.taskNum}>
        Задача 1 -{" "}
        <span className={styles.task}>
          {" "}
          {tasksArray[0] && tasksArray[0].value}
        </span>
      </span>
      <div className={styles.buttons}>
        {isRunning ? (
          <>
            <button className={styles.startBtn} onClick={pause}>
              Пауза
            </button>
            <button className={styles.stopBtn} onClick={skip}>
              Пропустить
            </button>
          </>
        ) : (
          <>
            {!isRunning && timeRemaining === totalTime ? (
              <button className={styles.startBtn} onClick={start}>
                Старт
              </button>
            ) : (
              <button className={styles.startBtn} onClick={resume}>
                Продолжить
              </button>
            )}
            <button className={styles.stopBtn} onClick={stop}>
              Стоп
            </button>
          </>
        )}
      </div>
    </div>
  );
};
