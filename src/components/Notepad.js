import { useContext, useEffect, useState, useRef } from "react";
import { myContext } from "../App";
import { deleteNote, save, updateFunction } from "../actions/crud";
import RichBtn from "./RichBtn";
const Notepad = (props) => {
    const {noteOpen, setNoteOpen, user, workList, personalList, otherList, setWorkList, setPersonalList, setOtherList } = useContext(myContext);
    const [title, setTitle] = useState(noteOpen.type === "old" ? props.title : "");
    const [content, setContent] = useState(noteOpen.type === "old" ? props.content : "");
    const [noteType, setNoteType] = useState(props.type);
    const [isMount, setIsMount] = useState(true);
    const titleDivNote = useRef();
    const contentDivNote = useRef();
    useEffect(() => {
        if (isMount) {
            setIsMount(false);
            return;
        }
        //IF NOTE TYPE NEW, THEN SAVE THE NEW NOTE 
        { noteOpen.type === "new" ? save(user.details.uid, title, content, noteType, setNoteOpen, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) : updateFunction(user.details.uid, props.id, title, content, noteType, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList); }

    }, [content])

    useEffect(() => {
        if (isMount) {
            setIsMount(false);
            return;
        }
        //IF NOTE TYPE NEW, THEN SAVE THE NEW NOTE 
        { noteOpen.type === "new" ? save(user.details.uid, title, content, noteType, setNoteOpen, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) : updateFunction(user.details.uid, props.id, title, content, noteType, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList); }

    }, [title])

    useEffect(() => {
        if (isMount) {
            setIsMount(false);
            return;
        }
        //IF NOTE TYPE NEW, THEN SAVE THE NEW NOTE 
        { noteOpen.type === "new" ? save(user.details.uid, title, content, noteType, setNoteOpen, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) : updateFunction(user.details.uid, props.id, title, content, noteType, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList); }

    }, [noteType])

    // TITLE AND CONTENT ELEMENT SETTING //
    useEffect(() => {
        if (noteOpen.type === "old") {
            titleDivNote.current.innerHTML = props.title; contentDivNote.current.innerHTML = props.content;
        }
    }, [])
    
    return <div>
        <div className="noteBtn">
            <div className="richShowDiv">
                <i class="fi fi-rr-arrow-small-left" onClick={() => setNoteOpen({ status: false, type: "new" })}></i>
                <RichBtn title={titleDivNote} content={contentDivNote} setTitle={setTitle} setContent={setContent}/>
            </div>
            <div>
                <select className="select" value={noteType} onChange={(e) => { setNoteType(e.target.value) }}>
                    <option value={"work"}>WORK NOTE</option>
                    <option value={"personal"}>PERSONAL NOTE</option>
                    <option value={"other"}>OTHER NOTE</option>
                </select>
                {noteOpen.type === "old" ? <button onClick={() => { deleteNote(user.details.uid, props.id, noteType, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList, setNoteOpen) }}>DELETE</button> : null}
            </div>
        </div>
        <div className="noteBox">
            <div className="titleBox" ref={titleDivNote} contentEditable='true' data-placeholder="Title" id="title" onKeyUp={(e) => { setTitle(e.target.innerHTML) }}>{noteOpen.type === "old" ? props.title : "Title"}</div><br></br>
            <div className="notePaper" ref={contentDivNote} contentEditable='true' data-placeholder="Your Note" id="note" onKeyUp={(e) => { setContent(e.target.innerHTML) }}>{noteOpen.type === "old" ? props.content : "Note"}</div>
        </div>
    </div>

}

export default Notepad;