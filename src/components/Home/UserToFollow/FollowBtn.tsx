import { useEffect, useState } from "react"
import { Blog } from "../../../Context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import { useSingleFetch } from "../../hooks/useSingleFetch";

export const FollowBtn:React.FC<{userId:string}>=({userId})=>{
    const [isFollowed,setIsFollowed]=useState(false);
    const  {currentUser}=Blog();
    const {data}=useSingleFetch("users",currentUser?.uid,"follows")

    useEffect(()=>{
        if(data && currentUser){
          setIsFollowed(data && data.findIndex((item)=>item.userId===userId)!==-1);
        }
      },[data,currentUser,userId]);
    const handleFollow=async()=>{
        try{
            if(currentUser){
                const followRef=doc(db,"users",currentUser?.uid,"follows",userId)
                const followerRef=doc(db,"users",userId,"followers",currentUser?.uid);
                if(isFollowed){
                    await deleteDoc(followRef)
                    await deleteDoc(followerRef)
                    toast.success("User is unfollowed");
                }else{
                    await setDoc(followRef,{
                        userId:userId
                    })
                    await setDoc(followerRef,{
                        userId:userId
                    })
                    toast.success("User is followed");
                }
            }
        }catch(error:any){
            toast.error(error.message)
        }
    }
    return <div>
        <button  onClick={handleFollow} className="">
           {isFollowed?
            <div className={`px-3 py-[0.2rem] rounded-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800`}>
              Unfollow
            </div>
           :
            <div className={`px-3 py-[0.2rem] rounded-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800`}>
                Follow
            </div>}
        </button>
    </div>
}
//5:42:45.