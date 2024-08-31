"use client";
import React, { useState } from "react";
import CreateRoomModal from "@/components/createRoomModal";
import JoinRoomModal from "@/components/joinRoomModal";

function Home() {
  const [playersName, setPlayersName] = useState<string>("fuzzy player");
  const handleNameChange = (event: any) => {
    setPlayersName(event.target.value);
  };
  const [openCreate, setOpenCreate] = useState(false);
  const closeCreateRoomModal = () => setOpenCreate(false);
  const [openJoin, setOpenJoin] = useState(false);
  const closeJoinRoomModal = () => setOpenJoin(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
      <CreateRoomModal
        isModalOpen={openCreate}
        closeCreateRoomModal={closeCreateRoomModal}
        playersName={playersName}
      ></CreateRoomModal>
      <JoinRoomModal
        isModalOpen={openJoin}
        closeJoinRoomModal={closeJoinRoomModal}
        playersName={playersName}
      ></JoinRoomModal>
      <div className="flex flex-col gap-8">
        <div
          id="playerDetails"
          className="flex flex-row gap-12 p-24 border border-orange-300"
        >
          <div>Name</div>
          <input type="text" value={playersName} onChange={handleNameChange} />
        </div>
        <div className="flex justify-center items-center flex-col gap-8">
          <div
            onClick={() => setOpenCreate(true)}
            className="w-36 h-12  bg-green-700 flex justify-center items-center text-white font-bold"
          >
            Oda Kur
          </div>
          <div
            onClick={() => setOpenJoin(true)}
            className="w-36 h-12  bg-green-800 flex justify-center items-center text-white font-bold"
          >
            Odaya Katıl
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
