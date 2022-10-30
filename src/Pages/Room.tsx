import * as react from "react";
import * as reactRouterDom from "react-router-dom";

import axios from "axios";

const { useState, useEffect } = react;
const { useParams } = reactRouterDom;

export default function Room() {
    const [roomData, setRoomData] = useState({
        id: 0,
        name: "",
    });
    const { roomName } = useParams();
    
    const chatLogs : HTMLInputElement = document.getElementById("chatLogs") as HTMLInputElement;
    const chatInput : HTMLInputElement = document.getElementById("chatInput") as HTMLInputElement;
    
    let chatSocket : WebSocket | null = null;
    
    const fetchRoomData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/rooms/${roomName}`);
            const data = await response.data;
            setRoomData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const connect = () => {
        chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomData.name}/`);

        chatSocket.onclose = function(e) {
            setTimeout(function() {
                console.log("Reconnecting");
                connect();
            }, 2000);
        };

        chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "chat_message") {
                const chatLog : HTMLElement = document.createElement('div');
                chatLog.innerHTML = data.message; 

                chatLogs.appendChild(chatLog);
                console.log(chatLog.innerHTML);
            }
        };
    
        chatLogs.scrollTop = chatLogs.scrollHeight;
    }
    
    const sendMessage = () => {
        if (chatInput.value.length === 0 || chatSocket === null) return;
        
        chatSocket.send(JSON.stringify({
            "message": chatInput.value,
        }));

        chatInput.value = "";
    }

    useEffect(() => {
        fetchRoomData();
    }, []);

    useEffect(() => {
        if (roomData.name === "") return;

        connect();
    }, [roomData])

    return (
        <main className="room"> 
            <h2>{roomData.name}</h2>
            <div id="chatLogs">

            </div>

            <input type="text" id="chatInput" placeholder="Type a message..."/>
            <button onClick={sendMessage}>Send</button>
        </main>
    )
}