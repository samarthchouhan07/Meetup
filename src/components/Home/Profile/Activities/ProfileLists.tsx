import { useSingleFetch } from "../../../hooks/useSingleFetch"
import { Blog } from "../../../../Context/Context"
import { Loading } from "../../../Loading/Loading"
import { PostCard } from "../../../Common/Posts/PostCard"

interface getUserData{
    userId:string,
    username:string
}
export const ProfileLists:React.FC<{getUserData:getUserData}>=({getUserData})=>{
    const {currentUser}=Blog()
    const {data,loading}=useSingleFetch("users",currentUser?.uid,"savePost")

    return <div className="flex flex-col gap-8 mb-8">
    {currentUser && currentUser && currentUser?.uid === getUserData?.userId ? (
      <>
        {data.length === 0 && (
          <p className="text-gray-600">
            <span className="font-semibold">{getUserData?.username}</span>{" "}
            has no interest in Posts
          </p>
        )}
        {loading ? (
          <Loading />
        ) : (
          data &&
          data.map((post, i) => <PostCard getUserData={getUserData} post={post} key={i} />)
        )}
      </>
    ) : (
      <PrivateLists username={getUserData?.username} />
    )}
  </div>
  
}

const PrivateLists:React.FC<{username:string}>=({username})=>{
   return <div className="flex flex-col justify-center items-center gap-12 text-center">
   <p>
     <span className="font-bold text-md text-gray-700">{username}'s interests are private</span>
   </p>
 </div>
 
}