import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Room from "./Pages/Room";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room/:roomName" element={<Room />} />
      </Routes>
    </Router>
  )
}