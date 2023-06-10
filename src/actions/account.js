import { db, provider } from "../firebaseConfig/firebaseConfig";
import { ref, set, get ,child} from "firebase/database";
import { auth } from "../firebaseConfig/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
const account = (data, type, setUser,setWorkList,setPersonalList,setOtherList,setLoading,workList, personalList, otherList) => {
  if (type === "login") {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => { alert("Login Succesfully") })
      .then(() => {
        var data = { displayName: auth.currentUser.displayName, uid: auth.currentUser.uid, email: auth.currentUser.email };
        setUser({ login: true, details: data });
      })
      .catch((error) => alert(error.message))
  }
  else if(type==="googlesign"){
    signInWithPopup(auth,provider)
    .then((userCredential)=>{
      var data = { displayName: userCredential.user.displayName, uid: userCredential.user.uid, email: userCredential.user.email };
      setUser({ login: true, details: data });
      get(child(ref(db), "USER/" + userCredential.user.uid)).then((snapshot) => {
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
        }, 1500)
      })
    })
    .catch((error)=>{console.log(error)})
  }
  else {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        updateProfile(user.user, { displayName: data.name });
        set(ref(db, "USER/" + user.user.uid), data).then(() => alert("Account Created"))
      })
      .catch((error) => alert(error.message))
  }

}

export default account;