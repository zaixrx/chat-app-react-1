import * as reactDom from "react-router-dom";

import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./Utils/PrivateRoute";

import { AuthenticationProvider } from "./Context/AuthenticationContext";
import Room from "./Pages/Room";

const { Routes, Route } = reactDom;

export default function App() {
  return (
    <AuthenticationProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route 
          path="room/:roomName"
          element={
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </AuthenticationProvider>
  )
}