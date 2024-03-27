import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
export const useSingleFetch=(collectionName:string,id:string|undefined,subCol:string)=>{
    const [data,setData]=useState<any[]>([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const getSingledata=()=>{
            if(id){
            const postRef=query(collection(db, collectionName,id,subCol));
            onSnapshot(postRef,(snapshot)=>{
                setData(
                    snapshot.docs.map((doc)=>({
                        ...doc.data(),
                        id:doc.id
                    }))
                );
                setLoading(false);
            });
        }
        };
        getSingledata();
    },[db,id]);

    return{data,loading }; 
}