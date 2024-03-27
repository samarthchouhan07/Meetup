import React from "react";

interface InputInterface{
    form:any;
    setForm:React.Dispatch<React.SetStateAction<any>>;
    type:string;
    title:string;
}

export const Input:React.FC<InputInterface>=({form,setForm,type,title})=>{
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    return(
        <div className="flex flex-col gap-2">
          <div className="peer w-80 h-full text-blue-gray-700 font-sans font-normal focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2 rounded-[7px] border-blue-gray-200 focus:border-gray-900">
            <input onChange={handleChange} type={type} placeholder={title} name={title} value={form[title]} className="h-10 w-full text-center"/>
          </div>
        </div>
    )
}
//1:51:49