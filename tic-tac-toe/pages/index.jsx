import { useState } from "react";
import {
  GameField,
  GameInfo,
  GameTitle,
  useGameState,
} from "../components/game";
import { Header } from "../components/header";

export default function HomePage() {
  const [playersCount] = useState(4);

  const { cells, currentMove, nextMove, handleCellClick } =
    useGameState(playersCount);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="pt-6 mx-auto  w-max">
        <GameTitle playersCount={playersCount} />
        <GameInfo
          playersCount={playersCount}
          currentMove={currentMove}
          className="mt-4"
        />
        <GameField
          playersCount={playersCount}
          className="mt-6"
          cells={cells}
          currentMove={currentMove}
          nextMove={nextMove}
          handleCellClick={handleCellClick}
        />
      </main>
    </div>
  );
}
