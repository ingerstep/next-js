import clsx from "clsx";

import { useEffect, useState } from "react";
import { Profile } from "../profile";
import { GameSymbol } from "./game-symbol";
import { GAME_SYMBOLS } from "./constants";

import avatarSrc1 from "./images/avatar-1.png";
import avatarSrc2 from "./images/avatar-2.png";
import avatarSrc3 from "./images/avatar-3.png";
import avatarSrc4 from "./images/avatar-4.png";

const players = [
  {
    id: 1,
    name: "Player1",
    rating: 1200,
    avatar: avatarSrc1,
    symbol: GAME_SYMBOLS.CROSS,
  },
  {
    id: 2,
    name: "Player2",
    rating: 900,
    avatar: avatarSrc2,
    symbol: GAME_SYMBOLS.ZERO,
  },
  {
    id: 1,
    name: "Player3",
    rating: 200,
    avatar: avatarSrc3,
    symbol: GAME_SYMBOLS.TRINGLE,
  },
  {
    id: 1,
    name: "Player4asfsafsaf",
    rating: 1000,
    avatar: avatarSrc4,
    symbol: GAME_SYMBOLS.SQUARE,
  },
];

export function GameInfo({ className, playersCount, currentMove }) {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 py-4 justify-between grid grid-cols-2 gap-3",
      )}
    >
      {players.slice(0, playersCount).map((player, index) => (
        <PlayerInfo
          isTimerRunning={currentMove === player.symbol}
          isRight={index % 2 === 1}
          playerInfo={player}
          key={player.id}
        />
      ))}
    </div>
  );
}

function PlayerInfo({ playerInfo, isRight, isTimerRunning }) {
  const [second, setSeconds] = useState(60);

  const minutesString = String(Math.floor(second / 60)).padStart(2, "0");
  const secondsString = String(second % 60).padStart(2, "0");

  const isDanger = second < 10;

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds((s) => Math.max(s - 1, 0));
      }, 1000);

      return () => {
        clearInterval(interval);
        setSeconds(60);
      };
    }
  }, [isTimerRunning]);

  const getTimerColor = () => {
    if (isTimerRunning) {
      return isDanger ? "text-orange-600" : "text-slate-900";
    }
    return "text-slate-200";
  };

  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative", isRight && "order-3")}>
        <Profile
          className="w-44"
          name={playerInfo.name}
          rating={playerInfo.rating}
          avatar={playerInfo.avatar}
        />
        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={playerInfo.symbol} />
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
