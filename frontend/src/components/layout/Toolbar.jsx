import React from "react";
import '../../styles/Toolbar.css'

export default function Toolbar() {

    return (

        <>
            <header className="toolbar">
                <div className="toolbar-left">
                    <a className="logo" href="/">AlgoViz</a>
                </div>
                <div className="toolbar-right">
                    <button className="login-btn">Login</button>
                </div>
            </header>
        </>
    );
}