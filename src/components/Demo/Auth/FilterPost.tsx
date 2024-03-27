import { useParams } from "react-router-dom"
import { Blog } from "../../../Context/Context"
import { Loading } from "../../Loading/Loading"
import { PostCard } from "../../Common/Posts/PostCard"
export const FilterPost:React.FC=()=>{
    const{tag}=useParams()
    const {postData,postLoading}=Blog()
    const filterData=postData.filter((post)=>post.tags.includes(tag))
    return <section className="size my-[2rem]">
        <div>
            <h3 className="text-3xl pb-6 border-b mb-[3rem] border-black">
                {filterData.length?"Your interest is here!!":"There is no post with this tag"}</h3>
                {postLoading?<Loading/>:(
                    <div>
                        {filterData && filterData.map((post,i)=><PostCard post={post} key={i}/>)}
                    </div>
                )}
        </div>
    </section>
}