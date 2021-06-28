import React, { useContext, useState } from "react";
import { Header } from "./Header";
import { FirebaseContext } from "../utils/firebase";
import "firebase/auth";

export const LoginContainer = (props) => {
  const firebase = useContext(FirebaseContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    error: "",
  });

  const signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setUserInfo((prevVal) => ({
          ...prevVal,
          error: "Error signing up.",
        }));
      });
  };

  const onLogin = () => {
    props.history.push("/");
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((res) => {
        onLogin();
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          signup();
        } else {
          setUserInfo((prevVal) => ({
            ...prevVal,
            error: "Error logging in",
          }));
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo((prevVal) => ({
      ...prevVal,
      error: "",
    }));
    if (userInfo.email && userInfo.password) {
      login();
    } else {
      setUserInfo((prevVal) => ({
        ...prevVal,
        error: "Please fill in both field.",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <Header />
      <form onSubmit={handleSubmit}>
        <p>
          Please, log in into the app. Or make a new account by entering your
          email and password.
        </p>
        <input
          type="text"
          name="email"
          placeholder="Please, enter your username"
          onChange={handleChange}
          value={userInfo.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Please, enter your password."
          onChange={handleChange}
          value={userInfo.password}
        />
        <p className="login-container__error">{userInfo.error}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
