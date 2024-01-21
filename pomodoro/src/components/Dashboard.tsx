import { FC } from "react";
import Image from "next/image";
import { useCountdown } from "@/hooks/useCountdown";
import { useStore } from "@/store/store";

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
          <div className=" text-9xl">{formatTime(timeRemaining)}</div>
          <button className="absolute top-1/2 -translate-y-1/2 -right-20">
            <Image src="/plus.svg" alt="Plus Button" width={50} height={50} />
          </button>
        </div>
        <span className="mb-8 text-[#999] text-base font-normal">
          Задача 1 -{" "}
          <span className="text-base font-normal">
            {" "}
            {tasksArray[0] && tasksArray[0].value}
          </span>
        </span>
        <div>
          {isRunning ? (
            <>
              <button
                className="py-4 px-12 text-white bg-[#A8B64F] text-center text-base font-medium"
                onClick={pause}
              >
                Пауза
              </button>
              <button
                className="text-[#C4C4C4] py-3 px-12 bg-transparent text-center border-2 border-solid border-[#C4C4C4] text-base font-medium"
                onClick={skip}
              >
                Пропустить
              </button>
            </>
          ) : (
            <>
              {!isRunning && timeRemaining === totalTime ? (
                <button
                  className="py-4 px-12 text-white bg-[#A8B64F] text-center text-base font-medium"
                  onClick={start}
                >
                  Старт
                </button>
              ) : (
                <button
                  className="py-4 px-12 text-white bg-[#A8B64F] text-center text-base font-medium"
                  onClick={resume}
                >
                  Продолжить
                </button>
              )}
              <button
                className="text-[#C4C4C4] py-3 px-12 bg-transparent text-center border-2 border-solid border-[#C4C4C4] text-base font-medium"
                onClick={stop}
              >
                Стоп
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
