import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { Loading } from "../components/Loading/Loading";
import { collection, QueryDocumentSnapshot, getDocs } from "firebase/firestore";

import { Dispatch, SetStateAction } from 'react';
import { useFetch } from "../components/hooks/useFetch";

type SetPublish = Dispatch<SetStateAction<boolean>>;
interface context_interface{
    currentUser:User|null,
    allUsers:any[],
    userLoading:boolean,
    publish:boolean,
    setPublish:React.Dispatch<React.SetStateAction<any>>,
    showComment:boolean,
    setShowComment:React.Dispatch<React.SetStateAction<boolean>>,
    commentLength: number;
    setCommentLength: React.Dispatch<React.SetStateAction<number>>;
    updateData: {
        title?: string;
        desc?: string;
      };
      setUpdateData: React.Dispatch<React.SetStateAction<{ title: string; desc: string }>>;
      title:string
      setTitle:React.Dispatch<React.SetStateAction<any>>
      description:string
      setDescription:React.Dispatch<React.SetStateAction<any>>
      postData:any[]
      postLoading:boolean
      authModal:boolean
      setAuthModal:React.Dispatch<React.SetStateAction<boolean>>
}

export const BlogContext=createContext<context_interface>({currentUser:null,allUsers:[],updateData:{},postData:[],authModal:false,setAuthModal:()=>{},postLoading:false,setUpdateData:()=>{},userLoading:true,publish:false,setPublish:()=>{},showComment:false,setShowComment:()=>{},commentLength:0,setCommentLength:()=>{},title:"",setTitle:()=>{},description:"",setDescription:()=>{}})

export const Context: React.FC<{children:ReactNode}>=({children})=>{
    const [loading,setLoading] = useState<boolean>(true)
    const [currentUser,setCurrentUser] = useState<User|null>(null)
    const [allUsers,setAllUsers] = useState<any[]>([])
    const [userLoading,setUserLoading]=useState(true)
    const [showComment,setShowComment]=useState(false)
    const [commentLength,setCommentLength]=useState(0)
    const [publish, setPublish]: [boolean, SetPublish] = useState(false);
    const [updateData,setUpdateData]=useState({})
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")
    const[authModal,setAuthModal]=useState(false);

    useEffect(()=>{
        setLoading(true)
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        });
        return ()=>unsubscribe()
    },[])

    useEffect(()=>{
        const getUsers=async()=>{
                const querySnapshot=await getDocs(collection(db,"users"));
                const usersData=querySnapshot.docs.map((doc:QueryDocumentSnapshot)=>({ 
                    ...doc.data(),
                    id:doc.id
                }))
                setAllUsers(usersData)
                setUserLoading(false)
        }
        getUsers()
    },[])

    const {data:postData,loading:postLoading}=useFetch("posts");
    return(
        <BlogContext.Provider value={{currentUser,postData,postLoading,allUsers,title,setTitle,description,setDescription,userLoading,publish,setPublish,showComment,setShowComment,commentLength,setCommentLength,updateData,setUpdateData,authModal,setAuthModal}}>
            {loading?<Loading/>:children}
        </BlogContext.Provider>
    )
}

export const Blog = () => useContext(BlogContext)