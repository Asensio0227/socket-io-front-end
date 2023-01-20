import React, {useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function Chat ({ socket, username, room }){
  const [currentMsg, setCurrentMsg] = useState('');
  const [msgList, settMsgList] = useState([]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const getData = {
        room: room,
        author: username,
        message: currentMsg
      };
      await socket.emit("send_message", getData);
      settMsgList((list) => [...list, getData]);
      setCurrentMsg('');
    }
  }

  useEffect(()=>{
    socket.on("receive_message", (data) => {
      settMsgList((list) => [...list, data]);
    })
  },[socket])

  return (
    <section className='chat-window'>
      <div className="chat-header">
        <p>live chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {
            msgList.map((item, index) => {
              return (
                <article
                  className='message'
                  key={index}
                  id={username === item.author ? "you" : "other"}
                >
                  <div className="message-content">
                    <p>{item.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{item.author}</p>
                    <p>{item.time}</p>
                  </div>
                </article>
              )
            })
         }
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder='hey'
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
          onClick={sendMsg}
          onKeyPress={(e) => e.key === "Enter" && sendMsg()}
        />
        <button
        onClick={sendMsg}
        >
          &#9658;
        </button>
      </div>
    </section>
  )
};

export default Chat
