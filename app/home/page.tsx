"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Modal from "@mui/material/Modal";
import { Box, Button, Input, Typography } from "@mui/material";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface RoomModel {
  playersName: string;
  roomName: string;
  password: string;
}
function Home() {
  const socket = io("http://localhost:3001");

  const [playersName, setPlayersName] = useState<string>("fuzzy player");

  const handleNameChange = (event: any) => {
    setPlayersName(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRoomName = (event: any) => {
    setRoomName(event.target.value);
  };
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const createRoom = () => {
    console.log("oda kuruluyor");
    let room: RoomModel = {
      playersName: playersName,
      roomName: roomName,
      password: password,
    };
    socket.emit("createRoom", room);
    handleClose();
    //TODO: game screen e yönlendirme yapılacak
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12">
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
            onClick={handleOpen}
            className="w-36 h-12  bg-green-700 flex justify-center items-center text-white font-bold"
          >
            Oda Kur
          </div>
          <div className="w-36 h-12  bg-green-800 flex justify-center items-center text-white font-bold">
            Odaya Katıl
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Oda bilgilerini gir
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex gap-4  items-center">
              <span>Oda İsmi = </span>
              <Input onChange={handleRoomName} placeholder="Oda İsmi"></Input>
            </div>
            <div className="flex gap-4  items-center">
              <span>Şifre =</span>
              <Input
                onChange={handlePassword}
                className="mx-8"
                placeholder="Şifre"
              ></Input>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={createRoom}
                variant="contained"
                size="large"
                color="success"
              >
                ODA KUR
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
