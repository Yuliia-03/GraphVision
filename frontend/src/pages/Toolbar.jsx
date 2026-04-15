import { useState, useEffect, useRef } from "react";
import { isLoggedIn, logout } from "../services/api.js";
import "../styles/Toolbar.css";
import Login from "../components/Login.jsx";
import SignUp from "../components/Signup.jsx";
import { useTheme } from "../contexts/ThemeContext";

export default function Toolbar() {
    const {theme, toggleTheme} = useTheme();
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
        window.location.href = "/saved_graph";
        setOpenMenu(false);
    };


    return (
        <>
            <header className={`toolbar ${theme}`}>
                <div className="toolbar-left">
                    <a className="logo" href="/">AlgoViz</a>
                </div>

                <div className="toolbar-right" ref={menuRef}>

                    <div className="theme-switch">
                        <span className="theme-label">
                            {theme === "dark" ? "Dark mode" : "Light mode"}
                        </span>

                        <input
                            type="checkbox"
                            id="theme-toggle"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                        />

                        <label htmlFor="theme-toggle" className="switch">
                            <span className="theme-slider" />
                        </label>
                    </div>

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
