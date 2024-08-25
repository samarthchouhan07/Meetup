import { Posts } from "../Common/Posts/Posts"
import { Follow } from "./UserToFollow/Follow"

export const Home:React.FC=()=>{
    return <section className="size flex flex-col md:flex-row gap-20 relative">
    <div className="flex-1 py-10 mb-16">
      <Posts />
    </div>
    <div className="md:w-84 p-7 border-l border-gray-300 hidden md:block">
      <h3>Here are your mates.!</h3>
      <Follow />
    </div>
  </section>
  
}