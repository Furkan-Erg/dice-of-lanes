"use client";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import { RoomModel } from "@/models/roomModel";
import { GameMapModel } from "@/models/gameMapModel";
import { PunModel } from "@/models/punModel";

// Initialize socket connection
const socket: Socket = io("http://localhost:3001");

function GameScreen() {
  const [dicePoints, setDicePoints] = useState(0);
  const [pointToPlace, setPointsToPlace] = useState(0);
  const [gameMap, setGameMap] = useState<GameMapModel>();
  const [isDiceRolled, setIsDiceRolled] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<RoomModel | undefined>();
  const params = useParams();

  useEffect(() => {
    setupGameScene();
  }, []);

  useEffect(() => {
    const handleRooms = (rooms: RoomModel[]) => {
      console.log("Received rooms:", rooms);
      const room = rooms.find((room) => room.roomId === params.roomId);
      console.log("Updated currentRoom", room);
      setCurrentRoom(room);
    };

    socket.on("rooms", handleRooms);
    socket.emit("getRooms");

    return () => {
      socket.off("rooms", handleRooms);
    };
  }, [params.roomId]);

  const setupGameScene = (): void => {
    setGameMap({
      lanes: {
        top: Array.from({ length: 11 }, (_, id) => ({ id, contains: [] })),
        mid: Array.from({ length: 11 }, (_, id) => ({ id, contains: [] })),
        bot: Array.from({ length: 11 }, (_, id) => ({ id, contains: [] })),
      },
    });
  };

  const rollDice = (): void => {
    setDicePoints(
      (prevPoints) => prevPoints + 1 + Math.floor(Math.random() * 6) + 1
    );
    setIsDiceRolled(true);
  };

  const buyPun = (pun: PunModel): void => {
    if (!gameMap) return;

    let temp = { ...gameMap };
    setDicePoints(dicePoints - pun.point);
    setPointsToPlace(pun.point);

    ["top", "mid", "bot"].forEach((lane) => {
      if (temp.lanes[lane][0].contains.length === 0) {
        temp.lanes[lane][0].isSelectable = true;
      }
    });

    setGameMap(temp);
  };

  const placePun = (lane: string) => {
    if (!gameMap || !gameMap.lanes[lane][0].isSelectable) return;

    let temp = { ...gameMap };
    temp.lanes[lane][0].contains.push({
      id: Math.random().toString(),
      point: pointToPlace,
      color: "blue", // Adjust color as needed
    });

    ["top", "mid", "bot"].forEach((lane) => {
      temp.lanes[lane][0].isSelectable = false;
    });

    setPointsToPlace(0);
    setGameMap(temp);
  };

  const canBuyPun = (pun: PunModel) => {
    if (!gameMap) return false;

    const isAllLanesFull =
      gameMap.lanes.top[0].contains.length > 0 &&
      gameMap.lanes.mid[0].contains.length > 0 &&
      gameMap.lanes.bot[0].contains.length > 0;

    return dicePoints >= pun.point && pointToPlace <= 0 && !isAllLanesFull;
  };

  const endTurn = () => {
    // TODO: Implement end turn logic based on player turn
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      <div className="flex flex-row items-center justify-center gap-12">
        <div
          id="blueBase"
          className="w-48 h-48 bg-blue-400 text-white flex flex-col justify-center items-center text-5xl"
        >
          <div>{currentRoom?.players?.blue?.playerName}</div>
          <div>{currentRoom?.players?.blue?.health}</div>
        </div>
        <div id="lanes" className="flex flex-col gap-12">
          {["top", "mid", "bot"].map((lane) => (
            <div key={lane} id={`${lane}Lane`} className="flex flex-row gap-4">
              {gameMap?.lanes[lane].map((tile) => (
                <div
                  key={tile.id}
                  onClick={() => placePun(lane)}
                  className={`w-12 h-12 border border-yellow-700 flex justify-center items-center ${
                    tile.isSelectable ? "bg-yellow-300 cursor-pointer" : ""
                  }`}
                >
                  {tile.contains.length > 0 ? (
                    <div>
                      {tile.contains.map((pun: PunModel) => (
                        <div
                          key={pun.id}
                          className={`flex justify-center items-center w-8 h-8 rounded-full bg-${pun.color}-400`}
                        >
                          {pun.point}
                        </div>
                      ))}
                    </div>
                  ) : (
                    tile.id
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          id="redBase"
          className="w-48 h-48 bg-red-400 text-white flex flex-col justify-center items-center text-5xl"
        >
          <div>{currentRoom?.players?.red?.playerName}</div>
          <div>{currentRoom?.players?.red?.health}</div>
        </div>
      </div>
      <div className="flex w-full justify-end px-20 gap-24">
        <div id="punSelection" className="flex flex-col gap-4">
          <div>PİYONLAR</div>
          <div className="flex flex-row gap-8">
            {[
              { id: "one", point: 1 },
              { id: "two", point: 2 },
              { id: "three", point: 3 },
              { id: "four", point: 4 },
              { id: "five", point: 5 },
              { id: "six", point: 6 },
            ].map((pun) => (
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
