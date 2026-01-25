import {useState, useEffect } from "react";
import {getAccessToken, isTokenExpired, logout} from '../../services/api.js'
import '../../styles/Toolbar.css'
import Login from '../Login.jsx'
import SignUp from "../Signup.jsx";

export default function Toolbar() {

    const [isAuth, setIsAuth] = useState(false);
    const [login, showLogin] = useState(false);
    const [signup, showSignup] = useState(false);


    useEffect(() => {
        const token = getAccessToken();
        setIsAuth(token && !isTokenExpired(token));
    }, []);

    const handleLogout = () => {
        logout();
        setIsAuth(false);
    };



    return (

        <>
            <header className="toolbar">
                <div className="toolbar-left">
                    <a className="logo" href="/">AlgoViz</a>
                </div>
                <div>
                    {isAuth ? (
                        <>
                            <span>Logged in</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => showLogin(true)}>Login</button>
                            <button onClick={() => showSignup(true)}>Sign Up</button>
                        </>
                    )}
                </div>
            </header>
            {login && (<Login onClose={() => showLogin(false)}
                onSuccess={() => {
                    showLogin(false);
                    setIsAuth(true);
                }}/>)
            }
            
            {signup && (<SignUp 
            onClose={() => showSignup(false)}
            onSuccess={() => {
                    showSignup(false);
                    setIsAuth(true);
                }}
                />)}
        </>
    );
}