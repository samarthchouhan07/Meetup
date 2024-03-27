import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
export const useFetch=(collectionName:string)=>{
    const [data,setData]=useState<any[]>([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchData=()=>{
            const postRef=query(collection(db, collectionName),orderBy("created","desc"))
            onSnapshot(postRef,async(snapshot)=>{
                setData(
                    snapshot.docs.map((doc)=>({
                        ...doc.data(),
                        id:doc.id
                    }))
                )
                setLoading(false)
            })
        }
        fetchData()
    },[collectionName])

    return{data,loading } 
}
