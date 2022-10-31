import { useContext } from "react";
import AuthenticationContext from "../Context/AuthenticationContext";

export default function Login() {
    const { loginFunction, user } = useContext(AuthenticationContext);
    
    return (
        <main className="login">
            <form onSubmit={loginFunction}>
                {user ? user.username : ""}

                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="text" name="password" id="password" placeholder="Password" />
            
                <button type="submit">Login</button>
            </form>
        </main>
    )
}