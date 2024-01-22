"use client";

import { FC } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { SvgPlus } from "./icons/plus";

export const Dashboard: FC = () => {
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
    <div className="relative w-[120%] h-[510px] flex flex-col justify-start items-start bg-[#F4F4F4]">
      <div className="flex justify-between items-center py-5 px-10 bg-[#C4C4C4] w-full">
        <div className="text-white text-base font-bold">
          {tasksArray[0] && tasksArray[0].value}
        </div>
        <div className="text-white text-base font-normal">Помидор {1}</div>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className="relative">
          <div className="font-extralight text-[150px] leading-normal">
            {formatTime(timeRemaining)}
          </div>
          <button className="absolute top-1/2 -translate-y-1/2 -right-20">
            <SvgPlus className="text-[#C4C4C4] hover:text-[#899441] transition-colors" />
          </button>
        </div>
        <span className="mb-8 text-[#999] text-base font-normal">
          {"Задача 1 - "}
          <span className="text-base font-normal">
            {tasksArray[0] && tasksArray[0].value}
          </span>
        </span>
        <div>
          {isRunning ? (
            <>
              <Button
                size="sm"
                variant="green"
                onClick={pause}
                className="mr-6"
              >
                Пауза
              </Button>
              <Button onClick={skip} size="md" variant="red">
                Пропустить
              </Button>
            </>
          ) : (
            <>
              {!isRunning && timeRemaining === totalTime ? (
                <Button
                  size="sm"
                  variant="green"
                  onClick={start}
                  className="mr-6"
                >
                  Старт
                </Button>
              ) : (
                <Button
                  size="md"
                  variant="green"
                  onClick={resume}
                  className="mr-6"
                >
                  Продолжить
                </Button>
              )}
              <Button size="sm" variant="red" onClick={stop}>
                Стоп
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
