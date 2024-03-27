import { useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Blog } from "../../../Context/Context";
import { FollowBtn } from "./FollowBtn";
import { useNavigate } from "react-router-dom";
export const Follow:React.FC=()=>{
    const {data}=useFetch("users");
    const {currentUser}=Blog();
    const [count,setCount]=useState(2)
    const navigate=useNavigate();
    const users=data && data?.slice(0,count).filter((user)=>user.userId!==currentUser?.uid);
    return (
        <>
        {data && users?.map((user,i)=>{
            const {username,bio,userImg,userId}=user
            return <div key={i} className="flex items-center justify-center gap-2 my-4">
                <div onClick={()=>navigate("/profile"+"/"+userId)} className="flex-1 flex items-center gap-2 cursor-pointer">
                    <img className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer" src={userImg}></img>
                    <div  className="flex flex-col gap-1">
                        <h2 className="font-bold">{username}</h2>
                        <span className="text-sm text-gray-500 line-clamp-2 leading-3">{bio||"This user has no bio"}</span>
                    </div>
                </div>
                 <FollowBtn userId={userId}/>
            </div>
        })}
        {data?.length < 10 && (<button onClick={() => {
           if (users.length < data?.length) {
              setCount((prev) => prev + 3);
           }
        }} className="mb-3 text-blue-400 hover:text-blue-600 hover:underline decoration-blue-600">See More?</button>)}
        </>
    )
}
//8:23:10