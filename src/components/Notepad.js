import { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import { deleteNote, save, updateFunction } from "../actions/crud";
const Notepad = (props) => {
    const { noteOpen, setNoteOpen, user, workList, personalList, otherList, setWorkList , setPersonalList, setOtherList} = useContext(myContext);
    const [title, setTitle] = useState(noteOpen.type === "old"?props.title:"");
    const [content, setContent] = useState(noteOpen.type === "old"?props.content:"");
    const [noteType, setNoteType] = useState(props.type);
    const [isMount, setIsMount] = useState(true);
    useEffect(() => {
        if(isMount){
            setIsMount(false);
            return;
        }
         //IF NOTE TYPE NEW, THEN SAVE THE NEW NOTE 
        {noteOpen.type === "new" ? save(user.details.uid,title,content,noteType,setNoteOpen,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) : updateFunction(user.details.uid, props.id, title,content,noteType,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList);}

    }, [content])

    useEffect(() => {
        if(isMount){
            setIsMount(false);
            return;
        }
        //IF NOTE TYPE NEW, THEN SAVE THE NEW NOTE 
        {noteOpen.type === "new" ? save(user.details.uid,title,content,noteType,setNoteOpen,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) : updateFunction(user.details.uid, props.id, title,content,noteType,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList);}

    }, [title])

    useEffect(() => {
        if(isMount){
            setIsMount(false);
            return;
        }
        //IF NOTE TYPE NEW, THEN SAVE THE NEW NOTE 
        {noteOpen.type === "new" ? save(user.details.uid,title,content,noteType,setNoteOpen,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) : updateFunction(user.details.uid, props.id, title,content,noteType,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList);}

    }, [noteType])

    return <div>
        <div className="noteBtn">
            <i class="fi fi-rr-arrow-small-left" onClick={() => setNoteOpen({status:false,type: "new"})}></i>
            <div>
                <select className="select" value={noteType} onChange={(e)=>{setNoteType(e.target.value)}}>
                    <option value={"work"}>WORK NOTE</option>
                    <option value={"personal"}>PERSONAL NOTE</option>
                    <option value={"other"}>OTHER NOTE</option>
                </select>
                {noteOpen.type === "old" ? <button onClick={()=>{deleteNote(user.details.uid,props.id,noteType,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList, setNoteOpen)}}>DELETE</button> : null}
            </div>
        </div>
        <div className="noteBox">
            <div className="titleBox" contentEditable='true' data-placeholder="Title" id="title" onKeyUp={(e) => { setTitle(e.target.innerHTML) }}>{noteOpen.type === "old"?props.title:"Title"}</div><br></br>
            <div className="notePaper" contentEditable='true' data-placeholder="Your Note" id="note" onKeyUp={(e) => { setContent(e.target.innerHTML) }}>{noteOpen.type === "old"?props.content:"Note"}</div>
        </div>
    </div>

}

export default Notepad;