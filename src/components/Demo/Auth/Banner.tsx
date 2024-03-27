import { Blog } from "../../../Context/Context"
export const Banner:React.FC=()=>{
   const {setAuthModal}=Blog()
   return<div className="bg-gray-900 border-b border-black">
   <div className="size py-40 flex flex-col items-start gap-[1rem]">
      <h1 className="italic  font-extrabold text-white text-3xl sm:text-5xl">WELCOME TO MEETUP! </h1>
      <p className="text-white text-md font-medium italic underline decoration-green-500 w-full sm:w-120 sm:text-xl">
           Explore MeetUp and Blogify your feelings,knowledge,thoughts!
      </p>
      <button onClick={()=>setAuthModal(true)} className="text-white italic rounded-full w-40 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
        Start Blogging!
      </button>
   </div>
</div> 
}
//1:15:00










