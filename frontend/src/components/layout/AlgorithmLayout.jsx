import React from "react";


export default function Algorithmlayout({sandbox, controls}) {

    return(
        <div className="container-fluid vh-100">

            <div className="col-8 border-end p-0">{sandbox}</div>
            <div className="col-4 p-3">{controls}</div>
        </div>
    );

}