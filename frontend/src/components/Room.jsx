import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import GroupSwipe from "./GroupSwipe";
import SideMenu from "./SideMenu";

const socket = io.connect('http://localhost:3001');


function Room() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState('');
    const [showSwipe, setShowSwipe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [waitingMessage, setWaitingMessage] = useState('');
    const [waiting, setWaiting] = useState(false);


    const createRoom = () => {
        setRoom(prevRoom => {
            // Use the previous state to calculate the new state
            const newRoom = String(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
            socket.emit('create_room', newRoom);
            setShowSwipe(true);
            setWaiting(true);

            // Return the new state
            return newRoom;
        });
    };


    const joinRoom = () => {
        if (room.trim() === "") {
            setErrorMessage('Please enter a room number');
            return;
        }

        socket.emit('join_room', room);

        if (errorMessage === "The room does not exist" || errorMessage !== "The room is full" || errorMessage !== "The room cannot be empty") {
            setShowSwipe(true);
    }

    };

    useEffect(() => {

        socket.on('waiting', (waitingMessage) => {
            setWaitingMessage(waitingMessage);
            setShowSwipe(false);
            setWaiting(true);
        });

        socket.on('room_ready', (users) => {
            setWaiting(false);
            setShowSwipe(true);
            setWaitingMessage('');
        });

        socket.on('error', (errorMessage) => {
            setErrorMessage(errorMessage);
            setShowSwipe(false);
        });
        return () => {
            // Cleanup event listeners on component unmount
            socket.off('error');
        };
    }, []);



    return (
        <div className="App">
            <SideMenu/>

            {!showSwipe && !waiting && (
                <div className="Room text-center">
                    <div>
                        <h1>Create Room</h1>
                        <button onClick={createRoom}>Create Room</button>
                    </div>
                    <div>
                        <h1>Join Room</h1>
                        <input
                            type="text"
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}
                            placeholder="Enter Room Number"
                        />
                        <button onClick={joinRoom}>Join Room</button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                </div>
            )}

            {!showSwipe && waiting && (
                <div className="Room text-center">
                    <div>
                        <h3>Room: {room}</h3>
                        <p>{waitingMessage}</p>
                    </div>

                </div>
            )}

            {showSwipe && !waiting &&(
                <div>
                    <h3>Room: {room}</h3>
                    <GroupSwipe socket={socket} username={username} room={room}/>
                </div>
            )}
        </div>
    );
}

export default Room;
