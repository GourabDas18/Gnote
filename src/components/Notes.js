import Notepad from "./Notepad";
import Header from "./header"
import Weather from "./weather";
import { useContext } from "react";
import {myContext} from "../App";
import NoteList from "./NoteList";

const Notes =()=>{

const {noteOpen,noteText,titleText,setUser,currentNoteGroup,setCurrentNoteGroup,noteFromWhichGroup} = useContext(myContext);

    return <div className="noteDiv">
      <Header setUser={setUser}/>
      <div className="noteMain">
        <Weather />
        <div className="workContainer">
          <div className="workSlider">
            <button style={currentNoteGroup==="workList"?{}:{background :"#444343"}} onClick={()=>setCurrentNoteGroup("workList")}>WORK</button>
            <button style={currentNoteGroup==="personalList"?{}:{background :"#444343"}} onClick={()=>setCurrentNoteGroup("personalList")}>PERSONAL</button>
            <button style={currentNoteGroup==="otherList"?{}:{background :"#444343"}} onClick={()=>setCurrentNoteGroup("otherList")}>OTHER</button>
          </div>
          {noteOpen.status?<Notepad title={titleText} content={noteText} id={noteOpen.id} type={noteOpen.type === "old"?noteFromWhichGroup:"work"} />:<NoteList />}
        </div>
      </div>
    </div>
}

export default Notes;

// NOTE
// TITLE
// ARRAY 3 TE
// USER