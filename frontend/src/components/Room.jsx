import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import GroupSwipe from "./GroupSwipe";
import SideMenu from "./SideMenu";

const socket = io.connect('http://localhost:3001');


function Room() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false);


    const handleJoinRoom = () => {
      if (room !== "") {
        socket.emit('join_room', room);
      }
      setShowChat(true);
    };

    return (
        <div className="App">
            <SideMenu/>

            {!showChat ? (

                <div className="Room text-center">
                    <div>
                        <h1>Enter your Name and Room number</h1>
                    </div>

                    <input
                        type="text"
                        placeholder="John..."
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        value={room}
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                        placeholder="Enter Room Number"
                    />

                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>

            ) : (

                <div>
                    <h3>Room: {room}</h3>
                    <GroupSwipe socket={socket} username={username} room={room}/>
                </div>
            )};
        </div>

    );
}

export default Room;
