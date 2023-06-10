import { auth } from "../firebaseConfig/firebaseConfig"
import { useContext } from "react";
import { myContext } from "../App";
const Weather=()=>{
    const {user, setUser} = useContext(myContext);
    return <div style={{color: '#d3d3d3'}}>
       <p>Hi,<br></br>
       <h2>{user.details.displayName}</h2>
       </p> 
    </div>
}
export default Weather;