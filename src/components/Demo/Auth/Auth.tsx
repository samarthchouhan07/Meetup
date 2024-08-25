import {Modal} from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import {MdFacebook} from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { signInWithPopup } from "firebase/auth";
import { provider,auth,db } from "../../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Auth:React.FC<{modal:boolean,setModal:React.Dispatch<React.SetStateAction<boolean>>}>=({modal,setModal})=>{
    const [createUser,setCreateUser]=useState(false);
    const [signreq,setSignreq]=useState("");
    const navigate=useNavigate();

    const googleAuth= async()=>{
        try{
           const createUser=await signInWithPopup(auth,provider);
           const newUser=createUser.user;

           const ref=doc(db,"users",newUser.uid)
           const userDoc=await getDoc(ref)
           if(!userDoc.exists()){
            await setDoc(ref,{
                userId:newUser.uid,
                username:newUser.displayName,
                email:newUser.email,
                userImg:newUser.photoURL,
                bio:""
            });
            navigate("/");
            toast.success("User have been signed in")
            setModal(false)
           }
        }catch(error:any){
           toast.error(error.message);
        }
    }
    return (<Modal modal={modal} setModal={setModal}>
        <section className={`z-50 fixed top-0 bottom-0 left-0 md: overflow-auto right-0 bg-white shadow-md gray-300 ${modal?"visible opacity-100":"invisible opacity-0"}`}>
          <div className="z-55 text-black flex flex-col justify-center items-center">
    <button onClick={()=>{
        setModal(false)
    }} className="absolute top-8 right-8 text-2xl hover:opacity-50">
        <LiaTimesSolid/>
    </button>
       {signreq===""?(
        <>
        <h2 className="flex flex-col text-2xl pt-20 justify-center items-center gap-12">
            Welcome to MeetUp!!
        </h2>
        <div>
            <Button click={googleAuth} icon={<FcGoogle />} text={`${createUser ? "Sign up":"Sign in"} with Google`}/>
            <Button icon={<MdFacebook className="text-xl text-blue-600"/>} text={`${createUser ? "Sign up" : "Sign in "} with Facebook`} click={()=>{
                setSignreq(createUser?"sign-up":"sign-in")
            }} />
            <Button icon={<AiOutlineMail/>} text={`${createUser ? "Sign up" : "Sign in "} with Email`} click={()=>{
                setSignreq(createUser?"sign-up":"sign-in")
            }}/>
        </div>
        <div className="mt-3">
            <p>
                {createUser ? "Already have an account" : "No account?"}
                <button onClick={() => {
                    setCreateUser(!createUser)
                }} className="text-blue-500 hover:text-blue-800 font-bold ml-1">
                    {createUser ? "Sign In" : "Create One"}
                </button>
            </p> 
        </div>
    </>
    ):signreq==="sign-in"?(
        <Signin/>
     ):signreq==="sign-up"?(
        <Signup setModal={setModal}/>
     ):null}
        </div>
            <div>
                <p className="md:w-120 mx-auto text-center text-md mt-3">
                   Wanna Make Some Blogs!?
                </p>
            </div>
        </section>
    </Modal>
    )
}

const Button:React.FC<{icon:JSX.Element, text:string,click?:()=>void}>=({icon,text,click})=>{
    return <div className="flex mt-6 justify-center">
        <button onClick={click} className="flex items-center gap-10 sm:w-80 border border-black px-3 py-2 rounded-full">
           {icon} 
           <div className="hidden sm:inline sm:ml-2 md:ml-4 lg:ml-6">
            {text}
            </div>
        </button>
    </div>
}

//1:37:34