import { useRef, useState } from "react";
export const bold=()=>{
    document.execCommand("bold",true);
}

export const unOrderedList=()=>{
    document.execCommand("insertUnorderedList")
}

export const highLight=()=>{
    if(!document.execCommand( "hiliteColor", false, "#ff5722")){
        document.execCommand( "backColor", false, "#ff5722")
    }
}


export const LinkBox=(props)=>{
    const urlDiv = useRef();
    const hyperlink=()=>{
        window.getSelection();
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(props.range);
        document.execCommand( "createLink", false, urlDiv.current.textContent );
        props.SetLinkBoxShow(false);
        props.titleContentChange();
    }
    
    return(
        <div className="linkBoxDiv" style={props.linkBoxShow?{display:"flex"}:{display:"none"}}>
            <p>Link: </p>
            <div contentEditable="true" ref={urlDiv}></div>
            <span><button onClick={()=>{ hyperlink()}} style={{color: "darkorange",fontWeight: "bold"}}>Save</button><button onClick={()=>{props.SetLinkBoxShow(false)}}>Close</button></span>
        </div>
    )
}