import { useFetch } from "../../hooks/useFetch";
import { Loading } from "../../Loading/Loading";
import { PostCard } from "./PostCard";

export const Posts: React.FC = () => {
    const {data,loading}=useFetch("posts")
    return(
        <section className="flex flex-col gap-10">
            {loading?<Loading/>:data.map((post,i)=><PostCard post={post} key={i}/>)}
        </section>
    )
}
//4:34:18