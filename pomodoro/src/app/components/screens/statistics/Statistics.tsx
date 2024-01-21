"use client";

import { NextPage } from "next";
import { Layout } from "../../layout/Layout";
import styles from "./Statistics.module.scss";
import { useStore } from "@/app/store/store";
import Image from "next/image";

export const Statistics: NextPage = () => {
  const { pauseTime, stopCount, workingTime } = useStore();
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ваша активность</h1>
          <button className={styles.filter}>
            Эта неделя
            <Image
              src="/arrow.svg"
              alt="Arrow SVG"
              width={14}
              height={7}
            />
          </button>
        </div>

        <div className={styles.dashboard}>
          <div className={styles.left}>
            <div className={styles.activity}>
              <span className={styles.day}>Понедельник</span>
              <div className={styles.text}>
                Вы работали над задачами в течение
                <span className={styles.tasks_time}>{workingTime} минуты</span>
              </div>
            </div>
            <div className={styles.pomodoros}>
              <div>
                <Image
                  src="/pomodoro.svg"
                  alt="Pomodoro SVG"
                  width={81}
                  height={81}
                />
                <span>x2</span>
              </div>
              <span>2 помидора</span>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
        <div className={styles.data}>
          <div className={styles.card}>
            <span className={styles.descr}>Фокус</span>
            <span className={styles.count}>35%</span>
            <Image
              className={styles.img}
              src="/focus.svg"
              alt="Focus SVG"
              width={130}
              height={130}
            />
          </div>
          <div className={styles.card}>
            <span className={styles.descr}>Время на паузе</span>
            <span className={styles.count}>{pauseTime}м</span>
            <Image
              className={styles.img}
              src="/pause.svg"
              alt="Pause SVG"
              width={130}
              height={130}
            />
          </div>
          <div className={styles.card}>
            <span className={styles.descr}>Остановки</span>
            <span className={styles.count}>{stopCount ? stopCount: 0}</span>
            <Image
              className={styles.img}
              src="/stop.svg"
              alt="Stop SVG"
              width={130}
              height={130}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};
