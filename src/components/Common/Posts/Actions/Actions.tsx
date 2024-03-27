import { BsThreeDots } from "react-icons/bs"
import { DropDown } from "../../../../utils/DropDown"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Blog } from "../../../../Context/Context"
import { toast } from "react-toastify"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../../firebase/firebase"

interface PostCardProps{
    postId?:string
    title:string
    desc:string
}
export const Actions:React.FC<PostCardProps>=({postId,title,desc})=>{
    const [showDrop,setShowDrop]=useState(false);
    const {setUpdateData,currentUser}=Blog()
    const navigate = useNavigate();
    const handleClick=()=>{
        setShowDrop(!showDrop)
    }
    const handleEdit=()=>{
        navigate(`/editPost/${postId}`)
        setUpdateData({title,desc})
    }
    const handleRemove=async()=>{
        try {
            if(postId && currentUser){
                const ref=doc(db,"posts",postId)
                const likeRef=doc(db,"posts",postId,"likes",currentUser?.uid)
                const commentRef=doc(db,"posts",postId,"comments",currentUser?.uid)
                const savedPostRef=doc(db,"users",currentUser?.uid,"savedPost",postId)
                await deleteDoc(likeRef)
                await deleteDoc(savedPostRef)
                await deleteDoc(commentRef)
                await deleteDoc(ref)
                toast.success("post has been removed")
                navigate("/")
            }
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    return <div className="relative ">
        <button onClick={handleClick}>
           <BsThreeDots className="text-2xl "/>
        </button>
        <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
            <Button click={handleEdit} title="Edit Story"></Button>
            <Button click={handleRemove} title="Delete Story"></Button>
        </DropDown>
        
    </div>
}
 
interface ButtonProps{
    click?:()=>void
    title:string
}
const Button:React.FC<ButtonProps>=({click,title})=>{
    return <button onClick={click} className={`p-2 hover:bg-gray-100 hover:text-black w-full text-sm text-left
        ${title==="Delete Story"?"text-red-600":""}`
        }>
        {title}
    </button>
}
//8:20:50