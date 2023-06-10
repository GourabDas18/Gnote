import { useContext } from "react";
import { myContext } from "../App";
import loadingGif from "../Images/load.gif"
const NoteList = () => {

    const { loading, workList, personalList, setNoteOpen, otherList, setNoteText, currentNoteGroup, setTitleText, setNoteFromWhichGroup } = useContext(myContext);

    const noteclick = (title, content, noteid, list) => {
        setTitleText(title)
        setNoteText(content)
        setNoteOpen({ status: true, type: "old", id: noteid })
        setNoteFromWhichGroup(list)
    }
    return loading === true ? (<div className="loadDiv"><img src={loadingGif} className="loading"></img>loading ...</div>) : (<div className="noteList">
        {currentNoteGroup === "workList" ? workList.map((item) => (<div className="stickyNotes" key={item.id} onClick={() => noteclick(item.title, item.content, item.id, "work")}><div>{item.title}</div><div>{item.content}</div></div>)) : null}

        {currentNoteGroup === "personalList" ? personalList.map((item) => (<div className="stickyNotes" onClick={() => noteclick(item.title, item.content, item.id, "personal")}><div>{item.title}</div><div>{item.content}</div></div>)) : null}

        {currentNoteGroup === "otherList" ? otherList.map((item) => (<div className="stickyNotes" onClick={() => noteclick(item.title, item.content, item.id, "other")}><div>{item.title}</div><div>{item.content}</div></div>)) : null}
    </div>)
}

export default NoteList;