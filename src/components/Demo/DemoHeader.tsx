import {Link} from "react-router-dom";
import Logo from "./Logo";
import { Auth } from "./Auth/Auth";
import { useEffect, useState } from "react";
import { Blog } from "../../Context/Context";
export const DemoHeader:React.FC=()=>{
    const[isActive,setIsActive]=useState(false)
    const{authModal,setAuthModal}=Blog();
    useEffect(()=>{
        const scrollMe=()=>{
            window.scrollY>50?setIsActive(true):setIsActive(false)
        }
        window.addEventListener("scroll",scrollMe)
    })
    return <div>
        <header className="bg-black w-full sticky z-50">
            <div className="size h-[70px] flex items-center justify-between">
                <Link to="/">
                  <Logo/>
                </Link>
                <div className="flex items-center gap-5">
                    <div className="relative">
                       <button onClick={()=>{
                        setAuthModal(true)
                       }} className="hidden text-sm sm:flex text-white items-center gap-5">Sign in</button>
                       <Auth modal={authModal} setModal={setAuthModal}/>
                    </div>
                    <button onClick={()=>setAuthModal(true)} className={`bg-black text-white rounded-full px-3 p-2 text-sm font-medium ${isActive?"bg-green-700":"bg-black"}`}>Get Started</button>
                </div>
            </div>
        </header>
    </div>
}
//29:30