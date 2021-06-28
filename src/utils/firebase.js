import React, { createContext } from 'react'
import app from 'firebase/app'

const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({ children }) => {
    if (!app.apps.length) {
      app.initializeApp({
        apiKey: "AIzaSyB7Vzr9T9fjvL8QWyR3Gko8ku3RJvWxMDQ",
        authDomain: "chatapp-2604c.firebaseapp.com",
        databaseURL: "https://chatapp-2604c-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "chatapp-2604c",
        storageBucket: "chatapp-2604c.appspot.com",
        messagingSenderId: "438557718193",
        appId: "1:438557718193:web:784da41c914dfa6b811490",
        measurementId: "G-H614FWZQB1"
      })
    }
    return (
      <FirebaseContext.Provider value={ app }>
        { children }
      </FirebaseContext.Provider>
    )
  }