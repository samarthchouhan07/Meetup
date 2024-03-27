import { useEffect, useState } from "react"
import { Post } from "../PostCard"
import { Blog } from "../../../../Context/Context"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../../../../firebase/firebase"
import { toast } from "react-toastify"
import { useSingleFetch } from "../../../hooks/useSingleFetch"
interface getUserData{
    userId:string,
    username:string
}
export const SavedPost:React.FC<{post?:Post,getUserData?:getUserData}>=({post})=>{
    const {currentUser,setAuthModal}=Blog()
    const [isSaved,setIsSaved]=useState(false)
    const {data}=useSingleFetch("users",post?.userId,"savePost")
    useEffect(()=>{
       setIsSaved(data && data.find((item)=>item.id===currentUser?.uid))
    },[])
    const handleSave=async()=>{
        try {
            if(currentUser && post?.id){
                const saveRef=doc(db,"users",currentUser?.uid,"savePost",post.id)
                if(isSaved){
                    await deleteDoc(saveRef)
                    toast.success("Post have been unSaved")
                }else{
                    await setDoc(saveRef,{
                        ...post
                    })
                    toast.success("Post has been Saved")
                }
                setIsSaved(!isSaved)
            }else{
                setAuthModal(true)
            }
        } catch (error) {}
    }

    return<div>
    <button onClick={handleSave} className={`
      ${isSaved ? "text-green-600 text-md font-semibold hover:text-blue-600 hover:underline decoration-green-600" : "text-blue-600 text-md font-semibold hover:text-blue-600 hover:underline decoration-blue-600"}
    `}>
      save post +
    </button>
  </div> 

}