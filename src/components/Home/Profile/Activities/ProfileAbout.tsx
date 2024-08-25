import { User } from "firebase/auth"
import { Blog } from "../../../../Context/Context"

interface UserData extends User{
    bio:string,
    username:User,
    userId:string
}

export const ProfileAbout:React.FC<{getUserData:UserData|undefined,setEditModal:React.Dispatch<React.SetStateAction<any>>}>=({getUserData,setEditModal})=>{
   const {currentUser}=Blog()
   return <div>
        <p className="text-lg font-bold line-clamp-1">
            User:- {getUserData?.email}
        </p>
        <p className="text-lg font-semibold">    
            Bio :- {getUserData?.bio||getUserData?.email+" haven't uploaded bio :("}
        </p>
        <div>
            {currentUser?.uid===getUserData?.userId?
            (<button onClick={()=>{setEditModal(true)}} className="mt-6 relative w-24 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                Edit
            </button>):null}
        </div>
    </div>
}