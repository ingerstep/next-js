import clsx from "clsx";

import { Profile } from "../profile";
import { CrossIcon } from "./icons/cross-icon";
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
    symbol: GAME_SYMBOLS.SQUARE,
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
    symbol: GAME_SYMBOLS.ZERO,
  },
];

export function GameInfo({ className, playersCount }) {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 py-4 justify-between grid grid-cols-2 gap-3",
      )}
    >
      {players.slice(0, playersCount).map((player, index) => (
        <PlayerInfo
          isRight={index % 2 === 1}
          playerInfo={player}
          key={player.id}
        />
      ))}
    </div>
  );
}

function PlayerInfo({ playerInfo, isRight }) {
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
          "text-slate-500 text-lg font-semibold",
          isRight && "order-1",
        )}
      >
        01:08
      </div>
    </div>
  );
}
