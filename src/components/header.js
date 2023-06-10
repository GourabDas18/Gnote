import { useContext } from "react";
import logout from "../actions/logout";
import Logo from "./logo"
import { myContext } from "../App";
const Header =(props)=>{
    const {setNoteOpen,setTitleText,setNoteText,setWorkList,setPersonalList,setOtherList,setLoading} = useContext(myContext);
    return <div className="header">
        <Logo />
        <button className="addNote" onClick={()=>{setTitleText("Title");setNoteText("Note");setNoteOpen({status:true,type:"new"})}}>ADD NOTE <i class="fi fi-rr-layer-plus"></i></button>
        <button className="logOutBtn" onClick={()=>{logout(props.setUser,setWorkList,setPersonalList,setOtherList,setLoading)}}><i class="fi fi-rr-power"></i></button>
    </div>
}

export default Header;