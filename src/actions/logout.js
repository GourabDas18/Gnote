import { auth } from "../firebaseConfig/firebaseConfig";

const logout =(setUser,setWorkList,setPersonalList,setOtherList,setLoading)=>{
    auth.signOut().then(()=>{
        setWorkList([]);
        setPersonalList([]);
        setOtherList([]);
        setUser({ login: false, details: "" });
        setLoading(true)
    })
}
export default logout;