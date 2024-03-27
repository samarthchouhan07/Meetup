import { useEffect, useState } from "react";
import { Blog } from "../../../../Context/Context";
import { doc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
export const EditPost:React.FC=()=>{
    const [description,setDescription]=useState("")
    const [title,setTitle]=useState("")
    const {updateData}=Blog()
    const [loading,setLoading]=useState(false)
    const {pathname}=useLocation()
    const postId=pathname.split("/")[2]
    const navigate=useNavigate()
  
    const handleEdit=async()=>{
      try{
        setLoading(true)
        const ref=doc(db,"posts",postId)
        await updateDoc(ref,{
          title:title,
          desc:description,
        })
        navigate(`/post/${postId}`)
        toast.success("Post has been updated")
      }catch(error){
        toast.error("Error updating post")
      }finally{
        setLoading(false)
      }
    }
  
    useEffect(()=>{
      if(updateData){
        setTitle(updateData.title??"")
        setDescription(updateData.desc??"")
      }
    },[updateData])
  
    return(
      <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-12">
        <div className="relative min-w-[200px]">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
            placeholder="Update your title here..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="relative mt-4 min-w-[200px]">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={20}
            placeholder="Update your story here..."
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mt-4">
          <button onClick={handleEdit} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
            {loading?"Updating..":"Update"}
          </button>
        </div>
      </section>
    );
  };
  