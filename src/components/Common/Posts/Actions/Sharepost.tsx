import { DropDown } from "../../../../utils/DropDown"
import { useState } from "react"
import { BiLink } from "react-icons/bi";
import { CgShare } from "react-icons/cg";
import {FacebookShareButton,LinkedinShareButton,TwitterShareButton} from "react-share";
import { FaFacebook,FaTwitter,FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";

export const SharePost:React.FC=()=>{
    const [showDrop,setShowDrop]=useState(false);
    const path=window.location.href
    const copyLink=async ()=>{
        try {
            await navigator.clipboard.writeText(path)
            toast.success("Copied to  clipboard")
        } catch (error:any) {
            toast.error(error.message)
            setShowDrop(false)
        }
    }
    return <div className="relative">
        <button onClick={()=>setShowDrop(!showDrop)} className="flex items-center justify-center gap-1 hover:font-bold hover:text-green-600">
           <CgShare/> Share
        </button>
        <DropDown showDrop={showDrop} size="w-[12rem]">
           <Button click={copyLink} title="Copy link" icon={<BiLink/>}></Button>
           <TwitterShareButton url={path}>
              <Button title="Share on Twitter" icon={<FaTwitter/>}></Button>
           </TwitterShareButton>
           <FacebookShareButton url={path}>
              <Button title="Share on Facebook" icon={<FaFacebook/>}></Button>
           </FacebookShareButton>
           <LinkedinShareButton url={path}>
               <Button title="Share on linkedIn" icon={<FaLinkedin/>}></Button>
           </LinkedinShareButton>
        </DropDown>
    </div>
}

interface Button_props{
    click?:()=>void,
    title:string,
    icon:JSX.Element
}
const Button:React.FC<Button_props>=({click,title,icon})=>{
    return <button onClick={click} className="p-2  hover:text-blue-800 hover:font-bold hover:underline decoration-blue-800 w-full text-sm text-left flex items-center gap-2 cursor-pointer">
        <span className="text-[1.2rem]">{icon}</span>
        {title}
    </button>
}
//7:56:36