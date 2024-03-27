import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Blog } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
export const Search:React.FC=()=>{
    const [search,setSearch]=useState("");
    const {postData}=Blog();
    const searchData=postData && postData?.filter((post)=>post.title.toLowerCase().includes(search.toLocaleLowerCase()))
    const navigate=useNavigate();

    return <div className="absolute sm:relative right-4 left-4 top-20 sm:left-0 sm:top-0 ">
                <div className="flex z-10 ml-2 w-80 items-center gap-1 bg-gray-100 px-2 rounded-full relative">
                    <span className="text-2xl text-gray-400">
                        <CiSearch/>
                    </span>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search..." className="block p-2 w-60 rounded-full text-sm outline-none font-medium text-gray-900 dark:text-white"/>
                   {search!=="" && <div className="absolute right-0 left-0 top-full bg-white shadow rounded-md">
                    {searchData.length>0?(
                        <>
                            {searchData.map((post, i) => (
                            <div
                             key={i}
                             onClick={()=>{navigate(`/post/${post?.id}`);
                                           setSearch("")}
                                    } 
                            className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                                <h2 className="line-clamp-1 capitalize text-sm font-bold">{post.title}</h2>
                                <div className="text-xs  text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{__html:post.desc}}/>
                            </div>
                            ))}
                        </>
                    ):(
                        <p className="text-sm text-gray-500 p-3">No post found</p> 
                    )}

                    </div>}
                </div>
            </div>
}
//2:18:19