import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Demo } from "./components/Demo/Demo";
import { HomeHeader } from "./components/Home/Header/HomeHeader";
import { DemoHeader } from "./components/Demo/DemoHeader";
import { BlogContext } from "./Context/Context";
import { ToastContainer } from 'react-toastify';
import { Profile } from "./components/Home/Profile/Profile";
import { Write } from "./components/Write/Write";
import { SinglePost } from "./components/Common/Posts/Actions/SinglePost";
import { EditPost } from "./components/Common/Posts/Actions/EditPost";
import { FilterPost } from "./components/Demo/Auth/FilterPost";
export const App:React.FC=()=>{
  const {currentUser}: any=useContext(BlogContext)
  return (
      <>
      {currentUser?<HomeHeader/>:<DemoHeader/>}
      <ToastContainer />
            <Routes>
              <Route path="profile/:userId" element={<Profile/>}></Route>
              <Route path="/" element={currentUser?<Home/>:<Navigate to="/demo"/>}/>
              <Route path="/demo" element={!currentUser?<Demo/>:<Navigate to="/"/>}/>
              <Route path="/write" element={<Write/>}/>
              <Route path="*" element={<Navigate to={currentUser? "/" :"/demo"}/>}/>
              <Route path="/post/:postId" element={<SinglePost/>}/>
              <Route path="/editPost/:postId" element={<EditPost/>}/>
              <Route path="/filter/:tag" element={<FilterPost/>}/>
          </Routes>
      </>
  );
};