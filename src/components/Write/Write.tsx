import React from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { Preview } from "./Preview";
import { Blog } from "../../Context/Context";
export const Write:React.FC=()=>{
    const [description,setDescription]=useState("")
    const[title,setTitle]=useState("");
    const  {publish,setPublish}=Blog()
    const handleDescription=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        setDescription(e.target.value);
    }
    return<section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-12">
    <div className="relative  w-full min-w-[200px]">
      <textarea
        onChange={(e) => setTitle(e.target.value)}
        rows={2}
        placeholder="Write your title here..."
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div className="relative mt-4 h-11 w-full min-w-[200px]">
      <textarea
        rows={20}
        value={description}
        onChange={handleDescription}
        placeholder="Write your story here..."
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div className="mt-96">
          <button onClick={()=>setPublish(true)} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
            post
          </button>
        </div>
    <div className={`${publish ? "visible opacity-100" : "invisible opacity-0"}`}>
      <Preview setPublish={setPublish} description={description} title={title} />
    </div>
  </section>
  
}