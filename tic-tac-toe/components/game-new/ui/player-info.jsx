import Image from "next/image";
import clsx from "clsx";
import { GameSymbol } from "./game-symbol";

export function PlayerInfo({
  isRight,
  name,
  rating,
  avatar,
  symbol,
  isTimerRunning,
  timer,
}) {
  const seconds = Math.ceil(timer / 1000);
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const isDanger = seconds < 10;

  const getTimerColor = () => {
    if (isTimerRunning) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }
    return "text-slate-200";
  };
  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative", isRight && "order-3")}>
        <div className="flex items-center gap-2 text-start text-teal-600 w-44">
          <Image src={avatar} width={48} height={48} alt="avatar" />
          <div className="overflow-hidden">
            <div className="text-lg leading-tight truncate">{name}</div>
            <div className="text-slate-400 text-xs leading-tight">
              Рейтинг: {rating}
            </div>
          </div>
        </div>
        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={symbol} />
        </div>
      </div>
      <div
        className={clsx("h-6 w-px bg-slate-200", isRight && "order-2")}
      ></div>
      <div
        className={clsx(
          "text-lg font-semibold w-[60px]",
          isRight && "order-1",
          getTimerColor(),
        )}
      >
        {minutesString}:{secondsString}
      </div>
    </div>
  );
}
