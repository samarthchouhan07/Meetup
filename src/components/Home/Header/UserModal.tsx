import { LiaUserSolid } from "react-icons/lia"
import { MdOutlineLocalLibrary } from "react-icons/md"
import { BiSpreadsheet } from "react-icons/bi"
import { HiOutlineChartBar } from "react-icons/hi"
import { LiaEditSolid } from "react-icons/lia"
import {Blog} from "../../../Context/Context"
import { Link, useNavigate } from "react-router-dom"
import { secretEmail } from "../../../utils/helper"
import { signOut } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { toast } from "react-toastify"

export const UserModal:React.FC<{setModal:React.Dispatch<React.SetStateAction<any>>}>=({setModal})=>{
    const {currentUser}=Blog() 
    const userModal=[
        {
            title:"Profile",
            icon:<LiaUserSolid/>,
            path:`/profile/${currentUser?.uid}`,
        },{
            title:"Library",
            icon:<MdOutlineLocalLibrary/>,
            path:"/library"
        },{
            title:"Stories",
            icon:<BiSpreadsheet/>,
            path:"/stories"
        },{
            title:"stats",
            icon:<HiOutlineChartBar/>,
            path:"/stats"
        }
    ]
    const  navigate =useNavigate()
    const logout=async()=>{
        try{
            await signOut(auth)
            navigate("/demo")
            toast.success("user is logged out successfully")
        }catch(error:any){
            toast.error(error.message)
        }
    }
    return <section className="absolute w-80 p-6 bg-black rounded-md z-50 text-gray-500 right-0 mt-8 border border-red-500 shadow-lg">
   <Link to={"/write"} className="flex md:hidden items-center gap-1 text-gray-500 hover:underline decoration-blue-500">
     <span className="text-2xl text-white">
       <LiaEditSolid/>
     </span>
     <span className="text-sm mt-1 text-white">
       Write Blogs
     </span>
   </Link>
   <div className="border-b border-gray-700">
     {userModal.map((link, i) => (
       <Link onClick={() => setModal(false)} key={i} to={link.path} className="flex items-center m-1 gap-2 hover:underline decoration-blue-500">
         <span className="text-xl">{link.icon}</span>
         <h2 className="text-xl">{link.title}</h2>
       </Link>
     ))}
   </div>
   <button onClick={logout} className="flex flex-col pt-3 text-lg hover:underline decoration-red-500 hover:text-red-500">
     Sign Out
     <span className="text-md">
       {secretEmail(currentUser?.email)}
     </span>
   </button>
 </section>

 
}
