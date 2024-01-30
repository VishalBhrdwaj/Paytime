import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const Users = ({balance}) => {
    const [loading,setLoading]=useState(true);

    const [users, setUsers] = useState([{
        firstName: "Harkirat",
        lastName: "Singh",
        _id: 1
    }]);
   
    const [searchUser,setSearchUser]=useState("");
    const getUsers=async()=>{
       
        const response=await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+searchUser,{headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }})
        setUsers(response.data?.users)
        setLoading(false)
    } 

    useEffect(()=>{
        getUsers();
    },[searchUser])

    return <>
        <div className="font-bold mt-6 text-lg mb-5">
            Your Contacts
        </div>
        <div className="my-2">
            <input onChange={(e)=>setSearchUser(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user)=> <User key={user._id} balance={balance} user={user} />)}
        </div>
    </>
}

function User({user,balance}) {
    const navigate=useNavigate();

    const sendMoney=(userId,name)=>{
            navigate("/send?id="+userId+"&name="+name+"&balance="+balance);
    }
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user?.username?.charAt(0)}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user?.firstname} {user?.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={()=>sendMoney(user?._id,user?.firstname)} label={"Send Money"} />
        </div>
    </div>
}