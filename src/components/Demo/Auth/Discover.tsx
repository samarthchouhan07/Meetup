import React from "react";
import { discover } from "../../../data";
import { useNavigate } from "react-router-dom";


export const Discover:React.FC=()=>{
  const navigate=useNavigate();
    return (
      <div className="sticky top-0 bg-white w-full shadow-md py-4 px-6">
      <div className="pb-4">
        <h2 className="text-black font-medium text-3xl font-serif w-full sm:w-120 sm:text-xl">
          Discover
        </h2>
        <div className="my-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-3 flex-wrap">
          {discover.map((item, i) => (
            <button
              onClick={()=>navigate(`/filter/${item.toLocaleLowerCase()}`)}
              className="bg-gray-200 hover:shadow-md hover:shadow-blue-500 rounded-full px-3 py-1 text-sm hover:underline focus:outline-none focus:ring focus:ring-blue-400"
              key={i}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="text-blue-400 text-sm py-2 hover:underline hover:text-blue-800 focus:outline-none focus:ring focus:ring-blue-400">
          Show More
        </button>
      </div>
    </div>
    
      );
}
// 1:26:00