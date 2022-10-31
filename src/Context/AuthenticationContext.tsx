import axios from "axios";
import * as react from "react";
import jwtDecode from "jwt-decode";

import * as reactDom from "react-router-dom";

const { createContext, useState } = react;
const { useNavigate } = reactDom;

const AuthenticationContext = createContext(Object());

export function AuthenticationProvider ( { children } : any ) {
    const navigate = useNavigate();
    const tokens = localStorage.getItem("tokens");

    const [user, setUser] = useState(tokens ? jwtDecode(JSON.parse(tokens).access) : null);
    const [authenticationToken, setAuthenticationToken] = useState(tokens ? JSON.parse(tokens) : null);
    
    const login = async (e : any) : Promise<any> => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/signin/", {
                username: e.target.username.value,
                password: e.target.password.value
            });
            
            const data = await response.data;
    
            setAuthenticationToken(data);
            setUser(jwtDecode(data.access));

            localStorage.setItem("tokens", JSON.stringify(data));

            navigate("/");

            return data;
        } catch (error : any) {
            const message = `Error: ${error.response.statusText}`
    
            console.log("Error: ", message);
    
            return message;
        }
    }

    const userInfo = {
        user: user,
        loginFunction: login
    }
    
    return ( 
        <AuthenticationContext.Provider value={userInfo}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext;