import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./css/ChattingUI.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const socket = io.connect("http://localhost:3000");

function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [show, setCard] = useState(false);
  const [allUsers, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const location = useLocation();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, type: "left", sender: data.sender },
      ]);
    });

    socket.on("showUsers", (data) => {
      setUsers(data.message.filter((msg) => msg !== location.state.data));
    });

    socket.on("newUser", (data) => {
      if(data.message !== location.state.data) notify(data.user);
    });
  
    return () => {
      socket.off("receive_message");
      socket.off("showUsers");
      socket.off("newUser");
    };
  }, [location.state.data]);

  const notify = (user) => {
    if(user && user !== location.state.data)
    {
      toast.success(`${user} has joined the Chat`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition : Bounce,
      });
    }
  };

  useEffect(() => {
    if (location.state.data) {
      setCurrentUser(location.state.data);
      socket.emit("spreadUsers", { message: location.state.data });
    }
  }, [location.state.data]);

  function sendMessage() {
    if (message.trim()) {
      socket.emit("send_message", {
        message: message,
        sender: location.state.data,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, type: "right" },
      ]);
      document.getElementsByName("message")[0].value = "";
      setMessage("");
    }
  }

  function loggingOut() {
    socket.emit("disconnected", { exit: location.state.data });
  }


  return (
    <div className="mainContent">
      <div className="notice">Do not Refresh after starting conversation</div>
      <ToastContainer />
      <div className={!show ? "hamburger" : "hamburgerChange"} onClick={() => setCard(!show)}>
        <div className={!show ? "line1" : "line1Change"}></div>
        <div className={!show ? "line2" : "line2Change"}></div>
        <div className={!show ? "line3" : "line3Change"}></div>
      </div>
      <div className="chatContent">
        <div className="messageContent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "right" ? "rightContent" : "leftContent"}
            >
              <div className={msg.type === "right" ? "senderr" : "sender"}>
                {msg.sender}
              </div>
              <div
                className={
                  msg.type === "right" ? "rightMessage" : "leftMessage"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="inputField"
          placeholder="Type a Message"
          name="message"
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
        />
        <button type="submit" className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
      <Link to="/">
        <button type="submit" className="logoutButton" onClick={loggingOut}>
          Logout
        </button>
      </Link>
      <div className={show ? "onlineActive" : "onlineActiveHide"}>
        <div className={show ? "currentUser" : "currentUserHide"}>
          Welcome, {currentUser}
        </div>
        <div className="line"></div>
        <div className={show ? "onlineUsers" : "onlineUsersHide"}>
          Online Users
        </div>
        {[...allUsers].map((user, index) => (
          <div key={index} className={show ? "showUsers" : "hideUsers"}>
            {user}
          </div>
        ))}
      </div>
      {/* <img
        src={hamburger}
        className="burgerimage"
        onClick={() => setCard(!show)}
        alt=""
      /> */}
    </div>
  );
}

export default ChatApp;
