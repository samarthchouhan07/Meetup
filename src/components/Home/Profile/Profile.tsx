import { useState } from "react"
import { ProfileAbout } from "./Activities/ProfileAbout"
import { ProfileHome } from "./Activities/ProfileHome"
import { ProfileLists } from "./Activities/ProfileLists"
import { Modal } from "../../../utils/Modal"
import { AiOutlineClose } from "react-icons/ai"
import Profile_img from "../../../../public/profile.jpg"
import { IoSettingsSharp } from "react-icons/io5"
import { EditProfile } from "./EditProfile"
import { Blog } from "../../../Context/Context"
import { useParams } from "react-router-dom"
import { useSingleFetch } from "../../hooks/useSingleFetch"

export const Profile:React.FC=()=>{
   const {allUsers}=Blog();
   const {userId}=useParams();
   const {currentUser}=Blog()
  const activities=[
      {
        title:"Home",
        comp:ProfileHome   
      },{
        title:"Interest?",
        comp:ProfileLists
      },{
        title:"About",
        comp:ProfileAbout
      }
  ]
  const[currentActive,setCurrentActive]=useState(activities[0]);
  const [modal,setModal]=useState(false);
  const[editModal,setEditModal]=useState(false)
  const {data:follows}=useSingleFetch("users",userId,"follows")
  const {data:followers}=useSingleFetch("users",userId,"followers")
  //5:45:45
  const getUserData=allUsers.find((user)=>user.id===userId)
  return (
    <section className="flex flex-col -mt-8 md:flex-row md:space-x-8 py-10 md:py-16 px-4 md:px-8 lg:px-12">
      <div className="flex-1">
        <div className="flex mt-10 flex-col gap-4">
          <h2 className="text-3xl sm:text-5xl italic font-bold">
            {getUserData?.username}
          </h2>
          <div className="flex gap-3">
            <p className="text-gray-500 text-xl sm:text-lg hover:underline decoration-blue-600">
              Followers: <span className="font-bold">{followers.length}</span>
            </p>
            <p className="text-gray-500 text-xl sm:text-lg hover:underline decoration-blue-600">
              Following: <span className="font-bold">{follows.length}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-around mt-5 border-b border-gray-300 pb-5">
          {activities.map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrentActive(item)}
              className={`text-md font-semibold ${
                currentActive.title === item.title
                  ? "text-blue-800"
                  : "text-gray-500 hover:text-blue-800"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <currentActive.comp getUserData={getUserData} setEditModal={setEditModal} />
        <button
          onClick={() => setModal(true)}
          className="fixed top-32 right-0 w-8 h-8 md:hidden"
        >
          <IoSettingsSharp />
        </button>
      </div>
      <div className="relative md:w-1/3">
        <Modal modal={modal} setModal={setModal}>
             <div
          className={`flex-1 w-full border-l border-gray-400 p-8 z-1 fixed right-0 bottom-0 top-0  bg-white md:sticky ${
            modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"
          }`}
        >
          <div className="pb-4 text-right">
            <button onClick={() => setModal(false)} className="inline-block md:hidden">
              <AiOutlineClose />
            </button>
          </div>
          <div className="sticky border-b border-gray-400 flex flex-col justify-center">
            <img
              src={getUserData?.userImg || Profile_img}
              className="w-14 h-14 object-cover rounded-full cursor-pointer "
              alt="User Profile"
            />
            <h1 className="font-bold py-2">{getUserData?.username || "Username"}</h1>
            <p className="text-gray-500 text-sm">
              {getUserData?.bio}
            </p>
            <div>
                {currentUser?.uid===getUserData?.userId && <button
                onClick={() => {setEditModal(true)}} className="relative w-24 mt-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  Edit Profile
                </button>}
            </div>
          </div>
        </div>
        </Modal>
        {editModal && (
          <EditProfile
            getUserData={getUserData}
            editModal={editModal}
            setEditModal={setEditModal}
          />
        )}
      </div>
    </section>
  );
}
//2:43:00