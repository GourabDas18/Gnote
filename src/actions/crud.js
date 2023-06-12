import { update, ref, child, set , remove} from "firebase/database";
import { db } from "../firebaseConfig/firebaseConfig";


const contentModify=(content)=>{
   content = content.replaceAll("<div>","<br />");
   content = content.replaceAll("</div>","");
   return content;
}

export const updateFunction = (uid, id, title, content, type, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) => {
 var modifyContent = contentModify(content)
   set(child(ref(db), "USER/" + uid + "/" + id), {
      id: id,
      title: title,
      content: modifyContent,
      type: type
   })
      .then(() => {


if (type==="work"){
   if(workList.filter((element)=>{return element.id===id})<1){
      workList.push({ id: id, content: modifyContent, title: title, type: type }); 
      setWorkList([...workList]);
   }else{
      workList.forEach(element => {
         if(element.id === id){ element.content = modifyContent; element.title = title; element.type = type; }
      });
      setWorkList([...workList]);
   }
}else{
   if(workList.filter((item)=> {return item.id===id}).length>0){
      workList = workList.filter((element)=>{ return element.id!==id})
      setWorkList([...workList]);
   }
}

if (type==="personal"){
   if(personalList.filter((element)=>{return element.id===id})<1){
      personalList.push({ id: id, content: modifyContent, title: title, type: type }); 
      setPersonalList([...personalList]);
   }else{
      personalList.forEach(element => {
         if(element.id === id){ element.content = modifyContent; element.title = title; element.type = type; }
      });
      setPersonalList([...personalList]);
   }
}else{
   if(personalList.filter((item)=> {return item.id===id}).length>0){
      personalList = personalList.filter((element)=>{ return element.id!==id})
      setPersonalList([...personalList]);
   }
}

if (type==="other"){
   if(otherList.filter((element)=>{return element.id===id})<1){
      otherList.push({ id: id, content: modifyContent, title: title, type: type }); 
      setOtherList([...otherList]);
   }else{
      otherList.forEach(element => {
         if(element.id === id){ element.content = modifyContent; element.title = title; element.type = type; }
      });
      setOtherList([...otherList]);
   }
}else{
   if(otherList.filter((item)=> {return item.id===id}).length>0){
      otherList = otherList.filter((element)=>{ return element.id!==id})
      setOtherList([...otherList]);
   }
}
      })
      .catch((err) => { alert(err) })
}

export const save = (uid, title, content, type, setNoteOpen, setWorkList, setPersonalList, setOtherList, workList, personalList, otherList) => {
   var id = new Date().getTime().toString();
   const updates = {};
  var modifyContent = contentModify(content)
   updates["USER/" + uid + "/" + id] =
   {
      id: id,
      title: title,
      content: modifyContent,
      type: type
   }

   update(ref(db), updates).then(() => {
      setNoteOpen({ status: true, type: "old", id: id })
      if (type === "work") {
         setWorkList([{ id: id, content: modifyContent, title: title, type: type }, ...workList])
      } else if (type === "personal") {
         setPersonalList([{ id: id, content: modifyContent, title: title, type: type }, ...personalList])
      } else {
         setOtherList([{ id: id, content: modifyContent, title: title, type: type }, ...otherList])
      }
   })
}

export const deleteNote = (uid,id,type,setWorkList, setPersonalList, setOtherList, workList, personalList, otherList, setNoteOpen)=>{
 var confirmation = window.confirm("Are you confirm to delete the note ?")
 if(confirmation){
   remove(ref(db,"USER/"+uid+"/"+id)).then(()=>{
      setNoteOpen({status:false,type: "new"});

   if(type==="work"){
      workList = workList.filter((element)=>{return element.id!==id});
      setWorkList([...workList]);

   }else if(type==="personal"){
      personalList = personalList.filter((element)=>{return element.id!==id});
      setPersonalList([...personalList]);

   }else if(type==="other"){
      otherList = otherList.filter((element)=>{return element.id!==id});
      setOtherList([...otherList]);
   }
    })
    .catch(err => alert(err));
    alert("Note Deleted Succesfully");
    
 }
}