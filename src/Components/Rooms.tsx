import * as react from "react";
import axios from "axios";

const { useState, useEffect } = react;

type roomType = {
    id: 0,
    name: "",
}

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        const response = await axios.get("http://127.0.0.1:8000/rooms");
        const data = await response.data;    
    
        setRooms(data);
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="select-rooms">
            <div>Active rooms</div>
            <select multiple className="form-control" id="roomSelect">
                {rooms.map((room : roomType) => <option key={room.id}>{room.name}</option>)}
            </select>
        </div>
    )
}