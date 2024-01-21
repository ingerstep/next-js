"use client";

import Image from "next/image";
import { useStore } from "@/store/store";

export default function StatisticsPage() {
  const { pauseTime, stopCount, workingTime } = useStore();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold text-2xl">Ваша активность</h1>
        <button className="w-[370px] py-5 px-4 text-base font-normal">
          Эта неделя
          <Image src="/arrow.svg" alt="Arrow SVG" width={14} height={7} />
        </button>
      </div>

      <div className="">
        <div className="">
          <div className="">
            <span className="">Понедельник</span>
            <div className="">
              Вы работали над задачами в течение
              <span className="">{workingTime} минуты</span>
            </div>
          </div>
          <div className="">
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
        <div className=""></div>
      </div>
      <div className="">
        <div className="">
          <span className="">Фокус</span>
          <span className="">35%</span>
          <Image
            className=""
            src="/focus.svg"
            alt="Focus SVG"
            width={130}
            height={130}
          />
        </div>
        <div className="">
          <span className="">Время на паузе</span>
          <span className="">{pauseTime}м</span>
          <Image
            className=""
            src="/pause.svg"
            alt="Pause SVG"
            width={130}
            height={130}
          />
        </div>
        <div className="">
          <span className="">Остановки</span>
          <span className="">{stopCount ? stopCount : 0}</span>
          <Image
            className=""
            src="/stop.svg"
            alt="Stop SVG"
            width={130}
            height={130}
          />
        </div>
      </div>
    </div>
  );
}
