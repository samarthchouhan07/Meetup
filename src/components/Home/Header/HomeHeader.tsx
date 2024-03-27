import { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import Logo from "../../Demo/Logo";
import { Link, useLocation } from "react-router-dom";
import { Search } from "./Search";
import { Modal } from "../../../utils/Modal";
import Profile_img from"../../../../public/profile.jpg"
import { UserModal } from "./UserModal";
import { Loading } from "../../Loading/Loading";
import { Blog } from "../../../Context/Context";

export const HomeHeader=()=>{
  const {allUsers,userLoading,currentUser}=Blog()
  const[modal,setModal]=useState(false)
  const {pathname}=useLocation();
  const getUserData=allUsers.find((user)=>user.id===currentUser?.uid)


  return (
      <header className="bg-black border-b border-gray-200">
        {userLoading && <Loading />}
        <div className="container mx-auto h-[70px] flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Logo />
            </Link>
            <Search />
          </div>
          <div className="flex items-center gap-3 sm:gap-7">
            {pathname === "/write" ? null : (
              <Link
                to={"/write"}
                className="hidden md:flex items-center gap-1 text-gray-500 hover:underline decoration-gray-500"
              >
                <span className="text-2xl text-white">
                  <LiaEditSolid />
                </span>
                <span className="text-sm mt-1 text-white">Write Blogs</span>
              </Link>
            )}
            
            <div className="flex items-center relative">
              <img
                onClick={() => {
                  setModal(true);
                }}
                src={getUserData?.userImg ? getUserData.userImg : Profile_img}
                className="w-9 h-9 rounded-full object-cover cursor-pointer"
                alt="User Profile"
              />
              <span className="text-white cursor-pointer">
                <MdKeyboardArrowDown
                  onClick={() => {
                    setModal(true);
                  }}
                />
              </span>
              <Modal modal={modal} setModal={setModal}>
                <div className={`${modal ? "visible opacity-100" : "invisible opacity-0"} absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-all duration-300`}>
                  <UserModal setModal={setModal} />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </header>
   );
    
}