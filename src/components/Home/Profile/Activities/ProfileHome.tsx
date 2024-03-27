import { PostCard } from "../../../Common/Posts/PostCard";
import { Loading } from "../../../Loading/Loading";
import { useFetch } from "../../../hooks/useFetch"

interface getUserData{
    userId:string,
    username:string
}
export const ProfileHome:React.FC<{getUserData:getUserData}>=({getUserData})=>{
    const {data,loading}=useFetch("posts")
    const userPost=data && data?.filter((post)=>post.userId===getUserData?.userId);
    return <div className="flex relative flex-col gap-5 mb-16">
    {userPost.length === 0 && ( 
      <p className="text-gray-500">{getUserData?.username} has no posts</p>
    )}
    {loading ? (
      <Loading />
    ) : (
      userPost.map((post, i) => <PostCard post={post} key={i} />)
    )}
  </div>
}