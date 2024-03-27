import { Blog } from "../../../Context/Context"
import { BsGraphUpArrow } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { readTime } from "../../../utils/helper";
export const Trending:React.FC=()=>{
    const {postData}=Blog();
    const getTrending=postData && postData?.sort((a,b)=>b.pageViews-a.pageViews)
    return <div className="border-b border-gray-600">
       <div className="size py-[2rem]">
           <div className="flex items-center gap-3 font-semibold">
              <span>
                <BsGraphUpArrow/>
              </span>
              <h2>Trending</h2>
           </div>
           <div className="grid grid-cols-card gap-3">
              {getTrending && getTrending.slice(0,5).map((trend,i)=>(
                <Trend trend={trend} key={i} index={i}/>
            ))}
           </div>
       </div>
    </div>
}

interface Trend_props{
    trend:{
        title:string
        created:Date
        desc:string
        postId:string
    }
    index:number
}
const Trend:React.FC<Trend_props>=({trend,index})=>{
    const navigate=useNavigate();
    return <main className="flex gap-4 w-full">
        <span className="text-gray-400 text-4xl mt-4">{index+1}</span>
        <div className="py-6 flex flex-col gap-3">
           <div onClick={()=>navigate(`/post/${trend.postId}`)} className="flex flex-col gap-4 cursor-pointer">
              <p className="w-full md:w-[18rem] text-sm font-bold line-clamp-2 hover:text-blue-500 hover:underline decoration-blue-500">{trend.title}</p>
              <p>{moment(trend?.created).format("DD/MM/YYYY ")}
                 {readTime({__html:trend.desc})} min read.
              </p>
           </div>
        </div>
    </main>
}