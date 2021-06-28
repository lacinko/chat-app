import React from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export const UserContainer = (props) => {
  let renderedUserEmail = false;

  const getAuthor = (author) => {
    if (!renderedUserEmail) {
      renderedUserEmail = true;
      return <p className="author">{author}</p>;
    }
  };

  return (
    <div className="user-container">
      <Header>
        <Link to="/">
          <button>Back To Chat</button>
        </Link>
      </Header>
      {props.messagesLoaded ? (
        <div className="messages-container">
          {props.messages.map((msg) => {
            if (msg.user_id === props.userID) {
              return (
                <div key={msg.id} className="message">
                  {getAuthor(msg.author)}
                  <p>{msg.msg}</p>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <h2>Loading messages, please wait!</h2>
      )}
    </div>
  );
};
