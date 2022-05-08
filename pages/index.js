import socket from "./socketio";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
//import messages from "../components/messages/Messages";
import { setCookies, useCookies } from "react-cookie";
import style from "../styles/Home.module.css";

export default function home() {
  const [cookie, setCookie] = useCookies(["user"]);
  const [logged, setLogged] = useState(0);
  var username = cookie.user;

  const setUser = (e) => {
    setCookie("user", e.target.value);
  };

  const form = (e) => {
    setLogged(1);
  };

  const Messages = dynamic(() => import("../components/messages/Messages"));
  const Navbar = dynamic(() => import("../components/navbar/Navbar"));
  return (
    <div className="main" style={{ left: "50%" }}>
      {!logged ? (
        <div className="registration-form">
          <form onSubmit={form}>
            <div className="title">
              <span>
                <p className="">Sign In</p>
              </span>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control item"
                id="username"
                placeholder="Choose a username..."
                onChange={setUser}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-block create-account"
                onClick={form}
              >
                Set username
              </button>
            </div>
          </form>
          <div className="social-media">
            <a>Randomly join one of our 100+ servers.</a>
            <br />
            <a>Meet +1m people around the world. </a>
            <br />
            <a>Start Now!</a>
          </div>
        </div>
      ) : (
        <div className={style.Main}>
          <Navbar user={username} />
          <Messages user={username} />
        </div>
      )}
    </div>
  );
}
