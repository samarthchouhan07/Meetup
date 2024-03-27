import { FcLike } from "react-icons/fc"
import { FcLikePlaceholder } from "react-icons/fc"
import { useEffect, useState } from "react"
import { Blog } from "../../../../Context/Context"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../../../firebase/firebase"
import { toast } from "react-toastify"
import { useSingleFetch } from "../../../hooks/useSingleFetch"
interface Like_props{
        postId?:string
}
export const Like:React.FC<Like_props>=({postId})=>{
    const {currentUser,setAuthModal}=Blog()
    const [isLiked,setIsLiked]=useState(false)
    const {data}=useSingleFetch("posts",postId,"likes")

    useEffect(()=>{
       setIsLiked(data && data.findIndex((user)=>user.id===currentUser?.uid)!==-1)
    },[data])

    const handleLike=async()=>{
        try{
           if(currentUser && postId){
            const likeRef=doc(db,"posts",postId,"likes",currentUser?.uid)
            if(isLiked){
                await deleteDoc(likeRef)
            }else{
                await setDoc(likeRef,{
                    userId:currentUser?.uid
                })
            }
        }else{
            setAuthModal(true)
        }
        }catch(error:any){
            toast.error(error.message)
        }
    }
    return <button onClick={handleLike} className={`flex justify-center items-center gap-1 hover:text-red-400`}>
        {isLiked?<FcLike />:<FcLikePlaceholder/>}
        <span>{data?.length}</span>
    </button>
}