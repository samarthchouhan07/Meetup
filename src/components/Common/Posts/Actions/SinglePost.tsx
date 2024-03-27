import { doc, getDoc, updateDoc ,increment} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebase";
import { Loading } from "../../../Loading/Loading";
import { toast } from "react-toastify";
import { Blog } from "../../../../Context/Context";
import { FollowBtn } from "../../../Home/UserToFollow/FollowBtn";
import { Recommended } from "./Recommended";
import { readTime } from "../../../../utils/helper";
import moment from "moment";
import { SavedPost } from "./SavedPost";
import { Actions } from "./Actions";
import { Like } from "./Like";
import { Comment } from "./Comment";
import { SharePost } from "./Sharepost";
import { Comments } from "../../Comments/Comments";

export const SinglePost: React.FC = () => {
    const {postId}=useParams()
    const [post,setPost]=useState<any>({})
    const [loading,setLoading]=useState<boolean>(false)
    const {currentUser}=Blog()
    const isInitialRender=useRef(true)
    useEffect(()=>{
      if(isInitialRender?.current){
        const incrementPageView=async()=>{
           try{
            if (postId) {
                const ref = doc(db, "posts", postId);
                await updateDoc(ref, {
                    pageViews: increment(1)
                });
            }
           }catch(error:any){
                toast.error(error.message)
           }
        }
        incrementPageView();
        isInitialRender.current=false
     }
    },[])
//8:45:35
    useEffect(()=>{
        const fetchPost=async()=>{
            if(!postId){ 
                return
            }
            setLoading(true)
            try{
                const postRef=doc(db,"posts",postId)
                const postSnapshot=await getDoc(postRef)
                if(postSnapshot.exists()){
                    const postData=postSnapshot.data()
                    if(postData?.userId){
                        const userRef=doc(db,"users",postData?.userId)
                        const getUser=await getDoc(userRef)
                        if(getUser.exists()){
                            const {created,...rest}=getUser.data()
                            setPost({...postData,...rest,id:postId})
                        }
                    }
                }else{
                    toast.error("Post not found");
                }
            }catch(error:any){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchPost()
    },[postId,post?.userId])
    const {title,desc,postImg,username,userId,created,userImg}=post
    const navigate=useNavigate();
    return(
        <>
            {loading?(
                <Loading/>
            ):(<>
                <section className="w-[90%] md:w-[80%] lg:[60%] mx-auto py-[3rem] relative">
                    <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
                    <div className="flex items-center justify-between gap-2 py-[2rem]">
                        <div className="flex items-center justify-center gap-2">
                            <img onClick={()=>navigate(`/profile/${userId}`)} src={userImg} className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer" alt="User Profile"/>
                            <div className="text-md  font-semibold ">
                                <div className="flex gap-2">
                                   <span className="">{username}</span>
                                   {currentUser && currentUser?.uid !== userId && <FollowBtn userId={userId} />}
                                </div>
                                <p className="text-xs text-blue-600">
                                   {readTime({__html:desc})} min read . 
                                   <span className="ml-1">{moment(created).fromNow()}</span>
                                </p>
                           </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        {postImg && <img className="w-full h-[400px] hover:bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 hover:rounded-3xl object-contain" src={postImg} ></img>}
                        <div className="flex items-center mt-6 mb-6 justify-between border px-8 rounded-full border-gray-200 hover:shadow-sm hover:shadow-blue-300">
                        <div className="flex items-center gap-5">
                           <Like postId={postId}/>
                           <Comment/>
                        </div>
                        <div className="flex items-center pt-2 gap-5">
                           {post && <SavedPost post={post}/>}
                           <SharePost/>
                           {currentUser?.uid && currentUser?.uid===userId && <Actions postId={postId} title={title} desc={desc}/>}
                        </div>
                    </div>
                        <div className="mt-6" dangerouslySetInnerHTML={{__html:desc}}/>
                    </div>
                </section>
                {post && <Recommended post={post} postId={postId}/>}
                <Comments postId={postId}/>
            </>
            )}
        </>
    );
};
