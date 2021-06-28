import React, { useContext, useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import { LoginContainer } from "./components/LoginContainer";
import { ChatContainer } from "./components/ChatContainer";
import { UserContainer } from "./components/UserContainer";
import { FirebaseContext } from "./utils/firebase";
import "firebase/auth";
import "firebase/database";

function App(props) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  const firebase = useContext(FirebaseContext);

  const handleSubmitMessage = (msg) => {
    const data = {
      msg,
      author: user.email,
      user_id: user.uid,
      timestamp: Date.now(),
    };
    firebase.database().ref("messages/").push(data);
  };

  const onMessage = (snapshot) => {
    const messages = Object.keys(snapshot.val()).map((key) => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    setMessages(messages);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        props.history.push("/login");
      }
    });
    firebase
      .database()
      .ref("/messages")
      .on("value", (snapshot) => {
        onMessage(snapshot);
      });
    if (!messagesLoaded) {
      setMessagesLoaded(true);
    }
  }, []);
  return (
    <div className="App">
      <Route path="/login" component={LoginContainer} />
      <Route
        exact
        path="/chat-app"
        render={() => (
          <ChatContainer
            messagesLoaded={messagesLoaded}
            onSubmit={handleSubmitMessage}
            user={user}
            messages={messages}
          />
        )}
      />
      <Route
        path="/users/:id"
        render={({ history, match }) => (
          <UserContainer
            messages={messages}
            messagesLoaded={messagesLoaded}
            userID={match.params.id}
          />
        )}
      />
    </div>
  );
}

export default withRouter(App);
