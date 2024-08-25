
import React, { useState } from "react";
import { Input } from "../../../utils/Input";
import { object, string } from "zod";
import {toast} from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../../firebase/firebase"
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Loading/Loading";

export const Signin:React.FC=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [form,setForm]=useState({
        email:"",
        password:""
    })
    const SigninSchema=object({
        email:string().email(),
        password:string().min(6)
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            SigninSchema.parse(form);
            await signInWithEmailAndPassword(auth,form.email,form.password)
            toast.success("Signed in successfully!!")
            navigate("/");
            setLoading(false)
        } catch (error) {
            toast.error("Signin failed!!");
            setLoading(false)
        }
    };
    
    return (
        <div className="flex flex-col mt-40 justify-center items-center h-full">
        <h1 className="text-3xl font-bold mb-8">Sign in with MeetUp</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <Input form={form} setForm={setForm} type="email" title="email" />
                <Input form={form} setForm={setForm} type="password" title="password" />
                    <div className="flex justify-center mt-6">
                    <button className={`w-auto md:w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-full text-sm px-5 py-2.5 
                        ${loading?<Loading/>:""}
                    `}>
                        Sign in
                    </button>
                    </div>
            </form>
        </div>
    )
}
//56:30