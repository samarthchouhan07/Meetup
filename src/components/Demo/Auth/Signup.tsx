import { useState } from "react";
import { Input } from "../../../utils/Input";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { doc, getDoc ,setDoc} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { object,string } from "zod";
import { Loading } from "../../Loading/Loading";


interface SignUpInterface{
   setModal:React.Dispatch<React.SetStateAction<any>>
}

export const Signup: React.FC<SignUpInterface> = ({ setModal }) => {
    const [loading,setLoading]=useState(false)
    const SignUpSchema = object({
        username: string(),
        email: string().email(),
        password: string().min(6),
        repassword: string().min(6)
    })
    const [form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        repassword:""
})
const navigate=useNavigate()
const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        SignUpSchema.parse(form)
      toast.success("Form submitted successfully!");
      setLoading(true)
      const {user}=await createUserWithEmailAndPassword(auth,form.email,form.password);
      const ref=doc(db,"users",user.uid);
      const userDoc=await getDoc(ref);
      if(!userDoc.exists()){
          await setDoc(ref,{
              userId:user.uid,
              username:user.email,
              email:user.email,
              UserImg:"",
              bio:"",
              created:Date.now()
          })
          navigate("/")
          toast.success("user created")
          setModal(false);
          setLoading(false);
      }
    } catch (error) {
        toast.error("Validation failed");
      }
    }
    

    return (
        <div className="flex flex-col mt-40 justify-center items-center h-full">
        <h1 className="text-3xl font-bold mb-8">Sign up with MeetUp</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <Input form={form} setForm={setForm} type="text" title="username" />
                <Input form={form} setForm={setForm} type="email" title="email" />
                <Input form={form} setForm={setForm} type="password" title="password" />
                <Input form={form} setForm={setForm}vt- type="password" title="repassword" />
                    <div className="flex justify-center mt-6">
                    <button className={`w-auto md:w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-full text-sm px-5 py-2.5
                        ${loading?<Loading/>:""}
                    `}>
                        Sign up
                    </button>
                    </div>
            </form>
        </div>
    )

}