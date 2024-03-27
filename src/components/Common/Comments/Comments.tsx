import { useState,useEffect } from "react"
import { Modal } from "../../../utils/Modal"
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../../Context/Context";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { Loading } from "../../Loading/Loading";
import { db } from "../../../firebase/firebase";
import { Comment } from "./Comment";
import { useSingleFetch } from "../../hooks/useSingleFetch";

import { updateDoc } from "firebase/firestore";
interface Comments_prop{
    postId?:string
}
export const Comments:React.FC<Comments_prop>=({postId})=>{
    const {currentUser,allUsers,showComment,setShowComment,setCommentLength}=Blog()
    const [comment,setComment]=useState("")
    const getUserData=allUsers.find((user)=>user.id===currentUser?.uid)
    const {data,loading}=useSingleFetch("posts",postId,"comments");
    
    
    const writeComment=async()=>{
       try {
         if(comment===""){
            toast.error("inputs must be filled")
         }
         if(postId){
            const commentRef=collection(db,"posts",postId,"comments")
            const docRef = await addDoc(commentRef,{
                commentText:comment,
                created:Date.now(),
                userId:currentUser?.uid,
                commentId:''
            })
            await updateDoc(docRef,{commentId:docRef.id});
            toast.success("comment is added")
            setComment("");
            
         }
       } catch (error:any) { 
         toast.error(error.message)
       }
    }

    useEffect(()=>{
        if(data){
            setCommentLength(data.length)
        }
    },[data])
    return <Modal modal={showComment} setModal={setShowComment} >
        <section className={`fixed inset-0 z-50 bg-white w-[22rem] shadows p-5 overflow-y-auto ${showComment?"visible-opacity-100":"hidden"}`}>
           <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Comments ({data.length})</h1>
            <button onClick={()=>setShowComment(false)} className="text-xl hover:text-red-800">
                <LiaTimesSolid/>
            </button>
           </div>
           {currentUser && (
            <div className="shadows p-3 my-5 overflow-hidden">
                <div className="flex items-center gap-2">
                    <img className="w-[2rem] h-[2rem] object-cover rounded-full" src={getUserData?.userImg||"/profile.jpg"}></img>
                    <h3 className="capitalize text-sm font-bold">{getUserData?.username}</h3>
                </div>
                <div className="relative w-full mt-4 min-w-[200px] h-15">
                    <input value={comment} onChange={(e)=>setComment(e.target.value)}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                    placeholder=" " /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                      Add Commment
                    </label>
                </div>
                <div className="mt-4">
                    <button onClick={()=>setComment("")} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-full text-sm px-5 py-2 text-center me-2 mb-2">Cancel</button>
                    <button onClick={writeComment} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded-full text-sm px-5 py-2 text-center me-2 mb-2">Send</button>
                </div>
             </div>
           )}
           {data && data.length===0 ? <p>this post has no comments</p>: 
            <div className="border-t py-4 mt-8 flex flex-col gap-8">
                {data && data.map((comment,i)=>(loading?<Loading/>:<Comment comment={comment} postId={postId} key={i}/>))}
           </div> }
        </section>
    </Modal>
}