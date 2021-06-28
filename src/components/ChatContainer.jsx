import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { FirebaseContext } from "../utils/firebase";
import "firebase/auth";
import "../styles/ChatContainer.css";

export const ChatContainer = (props) => {
  const firebase = useContext(FirebaseContext);

  const [message, setMessage] = useState("");
  const mounted = useRef();
  const previousMessages = useRef();
  let messageContainer = useRef(undefined);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const scrollToTheBottom = () => {
    if (messageContainer.current) {
      console.log("Tu?");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      scrollToTheBottom();
      mounted.current = true;
      previousMessages.current = props.messages;
      console.log("compomentDidMount");
    } else {
      if (previousMessages.length !== props.messages.length) {
        scrollToTheBottom();
      }
    }
  }, [props.messages]);

  const getAuthor = (msg, nextMsg) => {
    if (!nextMsg || nextMsg.author !== msg.author) {
      return (
        <p className="author">
          <Link to={`/users/${msg.user_id}`}>{msg.author}</Link>
        </p>
      );
    }
  };

  const handleSubmit = () => {
    props.onSubmit(message);
    setMessage("");
  };
  return (
    <div className="chat-container">
      <Header>
        <button onClick={handleLogout}>Logout</button>
      </Header>
      {props.messagesLoaded ? (
        <div
          className="message-container"
          ref={(element) => (messageContainer = element)}
        >
          {props.messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`message ${props.user.email === msg.author && "mine"}`}
            >
              <p>{msg.msg}</p>
              {getAuthor(msg, props.messages[idx + 1])}
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-container">
          <h4>Loading messages, please wait!</h4>
        </div>
      )}
      <div className="chat-input">
        <textarea
          placeholder="Add your message"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>SEND</button>
      </div>
    </div>
  );
};
