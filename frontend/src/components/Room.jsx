import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import GroupSwipe from "./GroupSwipe";
import SideMenu from "./SideMenu";
import {useAuth} from "../security/AuthContext";

const socket = io.connect('http://localhost:3001');


function Room() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState('');
    const [showSwipe, setShowSwipe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [waitingMessage, setWaitingMessage] = useState('');
    const [waiting, setWaiting] = useState(false);

    const { getUserData } = useAuth(); // Access the user data from the context
    const userData = getUserData();
    const userID = userData.userId;

    console.log(userID);

    const createRoom = () => {
        const userID = userData.userId;
        console.log(userID);

        setRoom((prevRoom) => {
            const newRoom = String(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
            socket.emit('create_room', { room: newRoom, userID }); // Pass room and userID as an object
            setShowSwipe(true);
            setWaiting(true);

            return newRoom;
        });
    };

    const joinRoom = () => {
        if (room.trim() === "") {
            setErrorMessage('Please enter a room number');
            return;
        }

        const userID = userData.userId; // Get the userID

        socket.emit('join_room', { room, userID }); // Pass room and userID as an object

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
                <div className="cm-form room">
                    <div>
                        <h2>Create Room</h2>
                        <button onClick={createRoom}>Create Room</button>
                    </div>
                    <br/>
                    <div>
                        <h2>Join Room</h2>
                        <label className="custom-field">
                            <input
                                type="text"
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                                placeholder="Room Number"
                            />
                        </label>

                        <button onClick={joinRoom}>Join Room</button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                </div>

            )}

            {!showSwipe && waiting && (
                <div className="cm-form waitingRoom">
                    <h3>Room: {room}</h3>
                    <p>{waitingMessage}</p>
                </div>
            )}

            {showSwipe && !waiting &&(
                <div className="GSwipeArea">
                    <h3 className="roomNumber">Room: {room}</h3>
                    <GroupSwipe socket={socket} username={username} room={room}/>
                </div>
            )}
        </div>
    );
}

export default Room;
