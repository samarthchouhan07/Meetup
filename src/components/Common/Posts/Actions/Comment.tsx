import { CgComment } from "react-icons/cg"
import { Blog } from "../../../../Context/Context";
import { formatNumber } from "../../../../utils/helper";
export const Comment:React.FC=()=>{
   const {setShowComment,commentLength}=Blog()
    return <button onClick={()=>setShowComment(true)} className="flex justify-center items-center gap-1 hover:font-bold hover:text-red-600">
      <CgComment/><span>{formatNumber(commentLength)}</span>
    </button>
}
//7:52:00