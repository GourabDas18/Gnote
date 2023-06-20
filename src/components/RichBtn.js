
import { useState } from "react";
import { bold,unOrderedList,highLight,LinkBox,hyperlink} from "../actions/richFunction";
const RichBtn = (props) => {
    function titleContentChange (){
        props.setTitle(props.title.current.innerHTML);
        props.setContent(props.content.current.innerHTML);
    }

    const[linkBoxShow,SetLinkBoxShow]=useState(false);
    return (
        <div className="richDiv">
        <i class="fi fi-rr-bold" onPointerDown={()=>{bold();titleContentChange()}}></i>
        <i class="fi fi-rr-list" onPointerDown={()=>{unOrderedList();titleContentChange()}}></i>
        <i class="fi fi-rr-link-alt" onPointerDown={()=>{SetLinkBoxShow(true)}}></i>
        <i class="fi fi-rr-highlighter" onPointerDown={()=>{highLight();titleContentChange()}}></i>
        <LinkBox SetLinkBoxShow={SetLinkBoxShow} linkBoxShow={linkBoxShow} range={window.getSelection().getRangeAt(0)} titleContentChange={titleContentChange}/>
    </div>
    )

}

export default RichBtn;