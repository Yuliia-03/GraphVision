import { useState, useEffect, useRef } from "react";
import { isLoggedIn, logout } from "../services/api.js";
import "../styles/Toolbar.css";
import Login from "../components/Login.jsx";
import SignUp from "../components/Signup.jsx";

export default function Toolbar() {
    const [isAuth, setIsAuth] = useState(isLoggedIn);
    const [login, showLogin] = useState(false);
    const [signup, showSignup] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("pointerdown", handleClickOutside, true);
        return () => document.removeEventListener("pointerdown", handleClickOutside, true);
    }, []);

    const handleLogout = () => {
        logout(); 
        setIsAuth(false);
        setOpenMenu(false);
    };

    const goToSavedGraphs = () => {
        window.location.href = "/save_graph";
        setOpenMenu(false);
    };


    return (
        <>
            <header className="toolbar">
                <div className="toolbar-left">
                    <a className="logo" href="/">AlgoViz</a>
                </div>

                <div className="toolbar-right" ref={menuRef}>
                    {isAuth ? (
                        <div className="profile-wrapper">
                            <button onClick={goToSavedGraphs}>📊 Saved Graphs</button>
                            <button onClick={handleLogout}> Logout</button>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => showLogin(true)}>Login</button>
                            <button onClick={() => showSignup(true)}>Sign Up</button>
                        </>
                    )}
                </div>
            </header>

            {login && (
                <Login
                    onClose={() => showLogin(false)}
                    onSuccess={(token) => {
                        localStorage.setItem("accessToken", token); // <- store token
                        setIsAuth(true);
                        showLogin(false);
                    }}
                />
            )}

            {signup && (
                <SignUp
                    onClose={() => showSignup(false)}
                    onSuccess={(token) => {
                        localStorage.setItem("accessToken", token); // <- store token
                        setIsAuth(true);
                        showSignup(false);
                    }}
                />
            )}
        </>
    );
}