import React from "react";

function GameScreen() {
  const players = {
    blue: {
      health: 200,
    },
    red: {
      health: 200,
    },
  };
  const gameMap = {
    lanes: {
      top: [
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
      ],
      mid: [
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
      ],
      bot: [
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
        { contains: [] },
      ],
    },
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      <div className="flex flex-row items-center justify-center gap-12">
        <div
          id="blueBase"
          className="w-48 h-48 bg-blue-400 text-white flex justify-center items-center text-5xl"
        >
          {players.blue.health}
        </div>
        <div id="lanes" className="flex flex-col gap-12">
          <div id="topLane" className="flex flex-row gap-4">
            {gameMap.lanes.top.map((tile, index) => (
              <div className="w-12 h-12 border border-yellow-700 flex justify-center items-center">
                {tile.contains.length > 0 ? <div>{tile.contains}</div> : index}
              </div>
            ))}
          </div>
          <div id="midLane" className="flex flex-row gap-4">
            {gameMap.lanes.mid.map((tile, index) => (
              <div className="w-12 h-12 border border-yellow-700 flex justify-center items-center">
                {tile.contains.length > 0 ? <div>{tile.contains}</div> : index}
              </div>
            ))}
          </div>
          <div id="botLane" className="flex flex-row gap-4">
            {gameMap.lanes.bot.map((tile, index) => (
              <div className="w-12 h-12 border border-yellow-700 flex justify-center items-center">
                {tile.contains.length > 0 ? <div>{tile.contains}</div> : index}
              </div>
            ))}
          </div>
        </div>
        <div
          id="redBase"
          className="w-48 h-48 bg-red-400 text-white flex justify-center items-center text-5xl"
        >
          {players.red.health}
        </div>
      </div>
      <div className="flex w-full justify-end px-20 gap-24">
        <div id="dicePoints" className="py-8">
          PUAN=
        </div>
        <div
          id="dice"
          className="w-24 h-24 bg-green-300 flex justify-center items-center"
        >
          ZAR
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
