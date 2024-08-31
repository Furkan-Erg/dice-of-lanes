import { Modal, Box, Typography, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

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
function CreateRoomModal({
  isModalOpen,
  closeCreateRoomModal,
  playersName,
}: {
  isModalOpen: boolean;
  closeCreateRoomModal: any;
  playersName: string;
}) {
  const socket = io("http://localhost:3001");
  const [openCreate, setOpenCreate] = useState(false);
  const closeModal = () => {
    closeCreateRoomModal();
    setOpenCreate(false);
  };
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
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
    closeModal();
    //TODO: game screen e yönlendirme yapılacak
  };

  useEffect(() => {
    setOpenCreate(isModalOpen), [isModalOpen];
  });
  return (
    <Modal
      open={openCreate}
      onClose={closeModal}
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
  );
}

export default CreateRoomModal;
