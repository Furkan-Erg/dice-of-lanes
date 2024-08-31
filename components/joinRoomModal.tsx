import { RoomModel } from "@/models/roomModel";
import { Modal, Box, Typography, Button, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
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

const JoinRoomModal: React.FC<{
  isModalOpen: boolean;
  closeJoinRoomModal: () => void;
  playersName: string;
}> = ({ isModalOpen, closeJoinRoomModal, playersName }) => {
  const router = useRouter();
  const [openJoin, setOpenJoin] = useState(false);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const socket = useCallback(() => io("http://localhost:3001"), []);
  const [title, setTitle] = useState<string>("Mevcut Odalar");
  const [password, setPassword] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<RoomModel>();
  const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
    if (isPasswordWrong) {
      setIsPasswordWrong(false);
    }
  };
  useEffect(() => {
    setOpenJoin(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    const socketInstance = socket();
    const handleRooms = (rooms: RoomModel[]) => {
      setRooms(rooms);
    };
    socketInstance.on("rooms", handleRooms);
    socketInstance.emit("getRooms");
    return () => {
      socketInstance.off("rooms", handleRooms);
      socketInstance.close();
    };
  }, [isModalOpen]);

  const closeModal = () => {
    closeJoinRoomModal();
    setOpenJoin(false);
    setTitle("Mevcut Odalar");
    setSelectedRoom(undefined);
  };
  const setGameRoom = (room: RoomModel) => {
    setTitle(room.roomName);
    setSelectedRoom(room);
  };
  const joinRoom = () => {
    const correctPassword = selectedRoom?.password == password;
    if (correctPassword) {
      router.push(`/gamescreen/${selectedRoom.roomId}`);
      const socketInstance = socket();
      socketInstance.emit("joinRoom", playersName, selectedRoom.roomId);
    } else {
      setIsPasswordWrong(true);
      return;
    }
  };

  return (
    <Modal
      open={openJoin}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {selectedRoom ? (
          <Typography id="desc" sx={{ mt: 2 }}>
            <div className="flex   items-center">
              <div className="w-16">Şifre =</div>
              <div className="flex flex-col justify-center items-center">
                <Input
                  onChange={handlePassword}
                  className="mx-8"
                  placeholder="Şifre"
                  error={isPasswordWrong}
                ></Input>
                <div className="text-sm text-red-400">
                  {isPasswordWrong ? "Şifreniz Yanlış" : ""}
                </div>
              </div>
              <Button onClick={joinRoom}>Katıl</Button>
            </div>
          </Typography>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex flex-col gap-4 h-48 overflow-auto">
              {rooms.map((room, index) => (
                <div key={index} className="flex flex-row justify-between ">
                  <div>{room.roomName}</div>
                  <Button
                    onClick={() => setGameRoom(room)}
                    variant="contained"
                    color="success"
                  >
                    Odaya Katıl
                  </Button>
                </div>
              ))}
            </div>
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default JoinRoomModal;
