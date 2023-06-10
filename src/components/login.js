import React from 'react';
import Logo from './logo';
import { useState } from "react";
import account from '../actions/account';
import { useContext } from "react";
import { myContext } from "../App";
const LoginView = () => {
    const {setUser,setWorkList,setPersonalList,setOtherList,setLoading,workList, personalList, otherList} = useContext(myContext);
    const [stateData, setStateData] = useState({
        logintype: "login"
    });
    const [eye, setEye] = useState("off");
    const [inputValuetext, setinputValuetext] = useState("", []);
    const [inputValuePass, setinputValuePass] = useState("", []);
    const [inputValueName, setinputValueName] = useState("", []);
    function logintypeChange() {
        if (stateData.logintype === "signup") {
            setStateData({
                logintype: "login"
            })
            setinputValuetext("");
            setinputValuePass("");
            setinputValueName("");
        } else {
            setStateData({
                logintype: "signup"
            })
            setinputValuetext("");
            setinputValuePass("");
            setinputValueName("");
        }
    }
    function eyeChange() {
        if (eye === "off") {
            setEye("on")
        } else {
            setEye("off")
        }
    }

    return <div className='loginContainer'>

        <div className='loginInfoDiv'>
            <Logo />
            <p> Capture your thoughts, anytime, anywhere with our note app. </p>
            <p>Our note app is the perfect tool for keeping track of your daily tasks, important reminders, and creative ideas. With a simple and intuitive interface, you can easily organize your notes and access them from any device.</p>
        </div>

        <div className='loginDiv'>
            <form onSubmit={(e)=>{e.preventDefault();account({name: inputValueName,email:inputValuetext,password:inputValuePass,notes:{}},stateData.logintype,setUser)}}>
            {stateData.logintype === "login" ? <p>Login</p> : <p>Sign up</p>}
            {stateData.logintype === "login" ? "" : <input type="text" required="true" placeholder='Name' value={inputValueName} onChange={e=>{setinputValueName(e.target.value)}}></input>}
            <input type="email" required="true" placeholder='Email' value={inputValuetext} onChange={e=>{setinputValuetext(e.target.value)}}></input>
            <div><input type={eye === "on" ? "text" : "password"} required="true" value={inputValuePass} placeholder='Password' onChange={e=>{setinputValuePass(e.target.value)}}></input><span onClick={() => eyeChange()}>{eye === "on" ? <i class="fi fi-rr-eye"></i> : <i class="fi fi-rr-eye-crossed"></i>}</span></div>
            <button type='submit'>{stateData.logintype === "login" ? "Login" : "Sign up"}</button>
            <span>{stateData.logintype === "login" ? "Didnot have an account ?" : "Already have an account ?"}<span onClick={() => logintypeChange()}>{stateData.logintype === "login" ? "Create Account" : "Login Now"}</span></span>
            </form>
            {stateData.logintype === "login" ?<div className='googleBtn' onClick={()=>account({name: inputValueName,email:inputValuetext,password:inputValuePass,notes:{}},"googlesign",setUser,setWorkList,setPersonalList,setOtherList,setLoading,workList, personalList, otherList)}>G - Continue with Google</div>:null}
            
        </div>
    </div>
}

export default LoginView;