import moment from "moment"
import { Blog } from "../../../Context/Context"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { DropDown } from "../../../utils/DropDown"
import { useState } from "react"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase/firebase"
import { toast } from "react-toastify"

interface Comment_prop{
 comment:{
    userId:string,
    created:Date,
    commentText:string,
    commentId:string
 },
 postId?:string
}
export const Comment:React.FC<Comment_prop>=({comment,postId})=>{
    const {allUsers,currentUser}=Blog()
    const [drop,setDrop]=useState(false)
    const [more,setMore]=useState(false);
    const [isEdit,setIsEdit]=useState(false)
    const getUserData=allUsers.find((user)=>user?.id===comment?.userId)
    const {userId,commentText,created,commentId}=comment
    const [editComment,setEditComment]=useState("")
    const [loading,setLoading]=useState(false);

    const removeComment=async()=>{
        try {
            if(postId && commentId){
                const ref = doc(db, "posts", postId, "comments", commentId)
            await deleteDoc(ref)
            setDrop(false)
            toast.success("comment is removed")
            }
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    const editComment_function=()=>{
       setIsEdit(true)
       setDrop(false)
       setEditComment(commentText)
    }

    const handleEdit=async()=>{
        setLoading(true)
        try {
            if(postId && commentId){
                const ref= doc(db,"posts",postId,"comments",commentId)
                await updateDoc(ref,{
                    commentText:editComment,
                    created:Date.now(),
                    userId:currentUser?.uid,
                })
                setEditComment("");
                setIsEdit(false);
                setDrop(false);
                toast.success("comment has been updated")
            }
        } catch (error:any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return <section className="border-b hover:shadow-lg hover:shadow-blue-300 p-10">
        {!isEdit?(
            <>
       <div className="flex items-center gap-3">
          <img className="w-[2rem] h-[2rem] object-cover rounded-full" src={getUserData?.userImg||"/profile.jpg"}></img>
          <div className="flex-1  flex justify-between">
            <div>
                <h2 className="text-sm capitalize">{getUserData?.username}</h2>
                <p className="text-sm text-gray-400">{moment(created).fromNow()}</p>
            </div>
            <div className="relative">
                {currentUser && currentUser?.uid===userId && (
                    <>
                        <button onClick={()=>setDrop(!drop)} className="text-2xl hover:bg-green-200 hover:rounded-full">
                            <BiDotsHorizontalRounded/>
                        </button>
                        <DropDown showDrop={drop} size="w-[10rem]">
                            <Button click={editComment_function} title="Edit"/>
                            <Button click={removeComment} title="Delete"/>
                        </DropDown>
                    </>
                )}
            </div>
          </div>
       </div>
       <p className="py-4 text-md">{more?commentText:commentText.substring(0,170)}
         {commentText.length>100 && (
            <button onClick={()=>setMore(!more)} className="text-sm text-gray-500">{more?"..less" : "...more"}</button>
         )}
       </p>
       </>
       ):(
        <div className="bg-white shadows p-4">
            <input value={editComment} onChange={(e)=>setEditComment(e.target.value)} placeholder="update.." className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <div className="flex items-center mt-4 justify-start gap-2">
                <button onClick={()=>setIsEdit(false)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Cancel</button>
                <button onClick={handleEdit} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">{loading?"Updating":"Update"}</button>
            </div>
        </div>
       )}
    </section>
}

interface Button_props{
    click:()=>void
    title:string
}
const Button:React.FC<Button_props>=({click,title})=>{
    return (
        <button onClick={click} className={`p-2                              hover:bg-gray-100 hover:text-black w-full text-sm text-left
        ${title==="Delete"?"text-red-600 hover:bg-red-500 hover:text-white":"text-blue-800"}
    `}>{title}</button>
    )
}
//7:30:00