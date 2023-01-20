import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username,setUsername] = useState(""); 
  const [room, setRoom] = useState(""); 
  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  }

  return (
    <section className="App">
      {
        !showChat
          ? (
            <article className="joinChatContainer">
              <h3>Join A Chat</h3>
              <input
                type="text"
                placeholder='mthee...'
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <input
                type="text"
                placeholder='room ID...'
                onChange={(e) => {
                  setRoom(e.target.value)
                }}
              />
              <button
                onClick={joinRoom}
              >
                Join A Room
              </button>
            </article>
          ) : (
            <Chat socket={socket} username={username} room={room} />
          )
      }
    </section>
  );
}

export default App;
