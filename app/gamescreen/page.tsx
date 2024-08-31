"use client";
import React, { useEffect, useState } from "react";

interface GameMapModel {
  lanes: {
    top: { id: number; contains: PunModel[]; isSelectable?: boolean }[];
    mid: { id: number; contains: PunModel[]; isSelectable?: boolean }[];
    bot: { id: number; contains: PunModel[]; isSelectable?: boolean }[];
  };
}
interface PunModel {
  id: string;
  point: number;
  color?: string;
}
interface PlayerModel {
  color: string;
  health: number;
  isTurnEnd: boolean;
}
interface PlayersModel {
  blue: PlayerModel;
  red: PlayerModel;
}

function GameScreen() {
  const [dicePoints, setDicePoints] = useState(0);
  const [pointToPlace, setPointsToPlace] = useState(0);
  const [gameMap, setGameMap] = useState<GameMapModel>();
  const [isDiceRolled, setIsDiceRolled] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayersModel>();

  const puns = [
    { id: "one", point: 1 },
    { id: "two", point: 2 },
    { id: "three", point: 3 },
    { id: "four", point: 4 },
    { id: "five", point: 5 },
    { id: "six", point: 6 },
  ];

  const rollDice = (): void => {
    setDicePoints(dicePoints + 1 + Number((Math.random() * 6).toFixed()));
    setIsDiceRolled(true);
  };
  const buyPun = (pun: PunModel): void => {
    if (!gameMap) {
      return;
    }
    let temp = { ...gameMap };
    setDicePoints(dicePoints - pun.point);
    setPointsToPlace(pun.point);
    //TODO: burda player red se 10 blueysa 0 olacak şekilde refactor lazım
    temp.lanes.top[0].contains.length == 0 &&
      (temp.lanes.top[0].isSelectable = true);
    temp.lanes.mid[0].contains.length == 0 &&
      (temp.lanes.mid[0].isSelectable = true);
    temp.lanes.bot[0].contains.length == 0 &&
      (temp.lanes.bot[0].isSelectable = true);
    setGameMap(temp);
  };
  const setupGameScene = (): void => {
    setGameMap({
      lanes: {
        top: [
          { id: 0, contains: [] },
          { id: 1, contains: [] },
          { id: 2, contains: [] },
          { id: 3, contains: [] },
          { id: 4, contains: [] },
          { id: 5, contains: [] },
          { id: 6, contains: [] },
          { id: 7, contains: [] },
          { id: 8, contains: [] },
          { id: 9, contains: [] },
          { id: 10, contains: [] },
        ],
        mid: [
          { id: 0, contains: [] },
          { id: 1, contains: [] },
          { id: 2, contains: [] },
          { id: 3, contains: [] },
          { id: 4, contains: [] },
          { id: 5, contains: [] },
          { id: 6, contains: [] },
          { id: 7, contains: [] },
          { id: 8, contains: [] },
          { id: 9, contains: [] },
          { id: 10, contains: [] },
        ],
        bot: [
          { id: 0, contains: [] },
          { id: 1, contains: [] },
          { id: 2, contains: [] },
          { id: 3, contains: [] },
          { id: 4, contains: [] },
          { id: 5, contains: [] },
          { id: 6, contains: [] },
          { id: 7, contains: [] },
          { id: 8, contains: [] },
          { id: 9, contains: [] },
          { id: 10, contains: [] },
        ],
      },
    });
    setPlayers({
      blue: {
        color: "blue",
        health: 200,
        isTurnEnd: false,
      },
      red: {
        color: "red",
        health: 200,
        isTurnEnd: false,
      },
    });
  };

  const placePun = (lane: string) => {
    if (!gameMap) {
      return;
    }
    let temp = { ...gameMap };

    if (!temp.lanes[lane][0].isSelectable) {
      return;
    }
    //TODO: burda player red se 10 blueysa 0 olacak şekilde refactor lazım
    temp.lanes[lane][0].contains.push({
      id: Math.random().toString(),
      point: pointToPlace,
      color: "blue", //TODO: burdada player rengi olması lazım
    });
    //TODO: burda player red se 10 blueysa 0 olacak şekilde refactor lazım
    temp.lanes.top[0].isSelectable = false;
    temp.lanes.mid[0].isSelectable = false;
    temp.lanes.bot[0].isSelectable = false;
    setPointsToPlace(0);
    setGameMap(temp);
  };
  const canBuyPun = (pun: PunModel) => {
    if (!gameMap) {
      return;
    }
    //TOOD: contains.length>0 bu buga yol açar rakip geldiğinde lenght mecburen fazla oluyor
    const isAllLanesFull =
      gameMap.lanes.top[0].contains.length > 0 &&
      gameMap.lanes.mid[0].contains.length > 0 &&
      gameMap.lanes.bot[0].contains.length > 0;
    return dicePoints >= pun.point && pointToPlace <= 0 && !isAllLanesFull;
  };
  const endTurn = () => {
    let temp = players;
    if (!temp) {
      return;
    }
    //TODO: blue mu red mi kim attı ona bak
    temp.blue.isTurnEnd = true;
    setPlayers(temp);
  };
  useEffect(() => {
    setupGameScene();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      <div className="flex flex-row items-center justify-center gap-12">
        <div
          id="blueBase"
          className="w-48 h-48 bg-blue-400 text-white flex justify-center items-center text-5xl"
        >
          {players?.blue.health}
        </div>
        <div id="lanes" className="flex flex-col gap-12">
          <div id="topLane" className="flex flex-row gap-4">
            {gameMap?.lanes.top.map((tile, index) => (
              <div
                key={tile.id}
                onClick={() => placePun("top")}
                className={`w-12 h-12 border border-yellow-700 flex justify-center items-center ${
                  tile.isSelectable ? "bg-yellow-300 cursor-pointer" : ""
                }`}
              >
                {tile.contains?.length > 0 ? (
                  <div>
                    {tile.contains?.map((pun: PunModel) => (
                      <div
                        className={`flex justify-center  items-center w-8 h-8 rounded-full bg-${pun.color}-400`}
                      >
                        {pun.point}
                      </div>
                    ))}
                  </div>
                ) : (
                  index
                )}
              </div>
            ))}
          </div>
          <div id="midLane" className="flex flex-row gap-4">
            {gameMap?.lanes.mid.map((tile, index) => (
              <div
                key={tile.id}
                onClick={() => placePun("mid")}
                className={`w-12 h-12 border border-yellow-700 flex justify-center items-center ${
                  tile.isSelectable ? "bg-yellow-300 cursor-pointer" : ""
                }`}
              >
                {tile.contains.length > 0 ? (
                  <div>
                    {tile.contains.map((pun: PunModel) => (
                      <div
                        className={`flex justify-center  items-center w-8 h-8 rounded-full bg-${pun.color}-400`}
                      >
                        {pun.point}
                      </div>
                    ))}
                  </div>
                ) : (
                  index
                )}
              </div>
            ))}
          </div>
          <div id="botLane" className="flex flex-row gap-4">
            {gameMap?.lanes.bot.map((tile, index) => (
              <div
                key={tile.id}
                onClick={() => placePun("bot")}
                className={`w-12 h-12 border border-yellow-700 flex justify-center items-center ${
                  tile.isSelectable ? "bg-yellow-300 cursor-pointer" : ""
                }`}
              >
                {tile.contains.length > 0 ? (
                  <div>
                    {tile.contains.map((pun: PunModel) => (
                      <div
                        className={`flex justify-center  items-center w-8 h-8 rounded-full bg-${pun.color}-400`}
                      >
                        {pun.point}
                      </div>
                    ))}
                  </div>
                ) : (
                  index
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          id="redBase"
          className="w-48 h-48 bg-red-400 text-white flex justify-center items-center text-5xl"
        >
          {players?.red.health}
        </div>
      </div>
      <div className="flex w-full justify-end px-20 gap-24">
        <div id="punSelection" className="flex flex-col gap-4">
          <div>PİYONLAR</div>
          <div className="flex flex-row gap-8">
            {puns.map((pun) => (
              <button
                key={pun.id}
                className={`flex justify-center items-center w-8 h-8 border border-purple-400 ${
                  !canBuyPun(pun) ? "bg-black cursor-not-allowed" : ""
                }`}
                disabled={!canBuyPun(pun)}
                onClick={() => buyPun(pun)}
              >
                {pun.point}
              </button>
            ))}
          </div>
        </div>
        <button
          className="flex justify-center items-center h-8 p-12 bg-orange-500"
          onClick={endTurn}
        >
          Turu Bitir
        </button>
        <div id="dicePoints" className="py-8">
          PUAN = {dicePoints}
        </div>
        <button
          id="dice"
          className={`w-24 h-24 ${
            isDiceRolled
              ? "bg-black cursor-not-allowed"
              : "bg-green-300 cursor-pointer"
          } flex justify-center items-center `}
          onClick={rollDice}
          disabled={isDiceRolled}
        >
          ZAR
        </button>
      </div>
    </div>
  );
}

export default GameScreen;
