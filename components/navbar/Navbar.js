import Socket from "../../pages/Socketio";
import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import dynamic from "next/dynamic";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Navbar(props) {
  let me = props.user;
  return (
    <header className="d-flex justify-content-center py-3 bg-primary">
      <div className="dropdown text-center" id={style.Contain}>
        <a
          href="#"
          className="d-block text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="chater.png"
            alt="mdo"
            width="32"
            height="32"
            className="rounded-circle"
          />
        </a>
        <p className={style.user}>{"@" + me}</p>
      </div>
    </header>
  );
}
