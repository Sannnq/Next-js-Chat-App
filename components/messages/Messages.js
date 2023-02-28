import Socket from "../../pages/Socketio.js";
import React, { useState, useEffect } from "react";
import style from "./Messages.module.css";
import dynamic from "next/dynamic";

export default function Message(props) {
  const [message, setMessage] = useState("");
  const [field, setField] = useState([]);
  var me = props.user;

  // hook Effects to autoscroll to the bottom
  useEffect(() => {
    const scripted = document.createElement("script");
    scripted.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.body.appendChild(scripted);
    scripted.addEventListener("load", () => {
      $("#send").click(() => {
        setTimeout(() => {
          var scroll = $("#field").scrollTop();
          $("#field").scrollTop(scroll + 1080);
        }, 10);
      });
    });
  });

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleMessage = () => {
    if (message !== "") {
      Socket.emit("channel", { message: message, user: props.user });
      setMessage("");
    }
  };

  Socket.on("message", (data) => {
    setField([...field, data]);
  });

  const Submit = (e) => {
    e.preventDefault();
    Socket.emit("message", {
      user: props.user,
      mess: message,
    });
    e.target.reset();
  };

  return (
    <div className={style.main}>
      <div className={style.fieldset} id="field">
        {field.map((p) => {
          if (me != p.user) {
            return (
              <div className={style.other}>
                <div className={style.message_rec}>
                  <p>
                    <strong>{p.message}</strong>
                  </p>
                </div>
                <br />
                <div id={style.mess_reciever}>
                  <a>{"@" + p.user}</a>
                </div>
              </div>
            );
          } else {
            return (
              <div className={style.me}>
                <div className={style.message_sent}>
                  <p>
                    <strong>{p.message}</strong>
                  </p>
                </div>
                <br />
                <div id={style.mess_sender}>
                  <a>{"@" + p.user}</a>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className={style.form_sender}>
        <form onSubmit={Submit}>
          <input placeholder="express yourself..." onChange={changeMessage} />
          <button
            type="submit"
            className="btn btn-primary"
            id="send"
            onClick={handleMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
