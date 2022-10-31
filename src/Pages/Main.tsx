import { useNavigate } from "react-router-dom";

import Rooms from "../Components/Rooms"

export default function Main() {

    const navigate = useNavigate();
    const handleRoomConnect = () => {
        const roomName : string = (document.getElementById("roomInput") as HTMLInputElement).value;
        
        if (roomName === "") return;

        navigate(`room/${roomName}`)
    }

    return (
        <main className="main">
            <Rooms />
            <div className="room-connect">
                <input type="text" className="form-control" id="roomInput" placeholder="Room name" />
                <button type="button" onClick={handleRoomConnect} className="btn btn-success">Connect</button>
            </div>
        </main>
    )
}