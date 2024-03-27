import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { readTime } from "../../../../utils/helper";
import moment from "moment";
import { useNavigate } from "react-router-dom";
interface Post{
    tags:string[],
}

interface RecommendedProps{
    post:Post,
    postId?:string
}

export const Recommended:React.FC<RecommendedProps>=({post,postId})=>{
    const {data}=useFetch("posts")
    const [commonTags,setCommonTags]=useState<any[]>([])

    useEffect(()=>{
        let recommendedPost:any[]=[]
        data && data.forEach((post)=>{
            if(post.id===postId){
                return
            }
            const postTag=post.tags;
            const commonTags=postTag.filter((tag:string)=>
              post?.tags?.includes(tag)
            )
            if(commonTags.length>0){
               recommendedPost.push({
                ...post,commonTags
               })
            }
        })
        recommendedPost.sort(()=>Math.random()*-0.5);
        const minRecommendation = 4;
        const slicePost=recommendedPost.slice(0,minRecommendation)
        setCommonTags(slicePost)
    },[data,post]);

    return <section className="bg-gray-100">
         <div className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]">
             <h2 className="text-xl font-bold">Recommends</h2>
             <div className="flex flex-col gap-4 my-3">
                    {commonTags.length<1?(
                        <p>No Recommends</p>
                    ):(
                        commonTags.map((post)=>(
                            <div key={post.id}>
                                <Post post={post}/>
                            </div>
                        ))
                    )}
                </div>
         </div>
    </section>
};

interface Post{
    title:string
    desc:string
    created:Date
    postImg:string
    id:string
    userId:string,
}
interface post_Post{
    post:Post
}

const Post:React.FC<post_Post>=({post})=>{
    const {title,desc,created,postImg,id:postId,userId}=post
    const {data}=useFetch("users")
    const navigate=useNavigate();
    const foundUser=data && data.find((user)=>user.id===userId);
    const {username="",userImg=""}=foundUser||{}
    return <div onClick={()=>navigate(`/post/${postId}`)} className="rounded-xl shadow-lg hover:shadow-blue-600 p-4 bg-white mb-4">
        <div className="w-full cursor-pointer ">
              {postImg && <img className="w-full h-[200px] object-contain" src={postImg}></img> }
           <div className="flex gap-2 py-3">
               <img className="w-[2rem] h-[2rem] object-cover rounded-full" src={userImg}></img>
               <h3 className="text-sm font-semibold capitalize mt-1">{username}</h3>
           </div>
           <h2 className="font-extrabold text-blue-700 hover:text-blue-800 hover:underline decoration-blue-800 leading-5 line-clamp-2">
               {title}
           </h2>
           <div className="line-clamp-2 my-3 text-gray-500 leading-5" dangerouslySetInnerHTML={{__html:desc}}/>
           <p className="text-xs text-blue-600">
              {readTime({__html:desc})} min read .
              <span className="ml-3">Published: {moment(created).format("DD/MM/YYYY")}</span>
           </p>
        </div>
    </div> 
}