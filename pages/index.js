import Socket from "./Socketio";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
//import messages from "../components/messages/Messages";
import { setCookies, useCookies } from "react-cookie";
import style from "../styles/Home.module.css";

export default function Home() {
  const [Users, setUsers] = useState("");
  const [Logged, setLogged] = useState(0);
  var username = Users;

  const setUser = (e) => {
    setUsers(e.target.value);
  };

  const form = (e) => {
    if (Users !== "") {
      setLogged(1);
    } else {
      window.alert("Choisissez un pseudonyme");
    }
  };

  const Messages = dynamic(() => import("../components/messages/Messages"));
  const Navbar = dynamic(() => import("../components/navbar/Navbar"));
  return (
    <div className="main" style={{ left: "50%" }}>
      {!Logged ? (
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
