
import './App.css';
import React from 'react';
import Notes from './components/Notes';
import LoginView from './components/login';
import { createContext, useState } from 'react';
import { useEffect } from "react";
import { auth, db } from './firebaseConfig/firebaseConfig';
import { child, get, ref } from 'firebase/database';
export const myContext = createContext("");
function App() {

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var data = { displayName: user.displayName, uid: user.uid, email: user.email };
        setUser({ login: true, details: data });
        get(child(ref(db), "USER/" + user.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((data) => {
              switch (data.val().type) {
                case "work":
                  if (workList.length > 0) {
                    if (workList.filter((item) => { return item.id === data.val().id }).length < 1) {
                      workList.push(data.val());
                      setWorkList([...workList]);
                    }
                  } else {
                    workList.push(data.val());
                    setWorkList([...workList]);
                  }
                  break;
                case "personal":
                  if (personalList.length > 0) {
                    if (personalList.filter((item) => { return item.id === data.val().id }).length < 1) {
                      personalList.push(data.val());
                      setPersonalList([...personalList]);
                    }
                  } else {
                    personalList.push(data.val());
                    setPersonalList([...personalList]);
                  }

                  break;
                case "other":
                  if (otherList.length > 0) {
                    if (otherList.filter((item) => { return item.id === data.val().id }).length < 1) {
                      otherList.push(data.val());
                      setOtherList([...otherList]);
                    }
                  } else {
                    otherList.push(data.val());
                    setOtherList([...otherList]);
                  }

                  break;
                default:
                  break;
              }
            })

          }
        }).then(() => {
          setTimeout(() => {
            setLoading(false)
          }, 2500)
        })
      }
    })
  }, [])
  const [currentNoteGroup, setCurrentNoteGroup] = useState("workList");
  const [noteFromWhichGroup, setNoteFromWhichGroup] = useState();
  const [noteText, setNoteText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [workList, setWorkList] = useState([]);
  const [personalList, setPersonalList] = useState([]);
  const [otherList, setOtherList] = useState([]);
  const [user, setUser] = useState({ login: false, details: "" });
  const [noteOpen, setNoteOpen] = useState({ status: false, type: "new" });
  const [loading, setLoading] = useState(true);

  return (
    <myContext.Provider value={{ loading, setLoading, currentNoteGroup, setCurrentNoteGroup, noteText, setNoteText, titleText, setTitleText, workList, setWorkList, personalList, setPersonalList, otherList, setOtherList, user, setUser, noteOpen, setNoteOpen, noteFromWhichGroup, setNoteFromWhichGroup }}>
      <div>
        {user.login ? <Notes /> : <LoginView />}
      </div>
    </myContext.Provider>
  );
}

export default App;