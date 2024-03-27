import React from 'react';
import { readTime } from '../../../utils/helper';
import moment from 'moment';
import { SavedPost } from './Actions/SavedPost';
import { Blog } from '../../../Context/Context';
import { Actions } from './Actions/Actions';
import { useNavigate } from 'react-router-dom';

export interface Post {
  title:string
  desc:string
  created:Date
  postImg:string
  id:string
  userId:string
}

interface getUserData {
  userId:string
  username:string
}

interface PostCardProps {
  post:Post
  getUserData?:getUserData
}

export const PostCard:React.FC<PostCardProps>=({post,getUserData})=>{
  const {title,desc,created,id:postId,userId}=post;
  const{currentUser}=Blog()
  const navigate=useNavigate();
  const handleClick = () => {
    navigate(`/post/${postId}`);
  };
  return (
    <section className="flex flex-col gap-4 cursor-pointer border-b border-gray-400 py-2">
      <div onClick={handleClick} className="cursor-pointer">
        <p className="pb-2 font-semibold capitalize">{getUserData?.username}</p>
        <h2 className="text-xl font-semibold text-black hover:text-blue-700 hover:underline hover:font-bold line-clamp-2 leading-6 capitalize">{title}</h2>
        <div className="py-1 text-xs text-gray-500 line-clamp-2 leading-5" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-purple-600">
          {readTime({ __html: desc })} min read. Published:- {moment(created).format('DD/MM/YYYY')}
        </p>
        <div className="flex items-center gap-3">
          <SavedPost post={post} getUserData={getUserData} />
          {currentUser?.uid === userId && <Actions postId={postId} title={title} desc={desc}/>}
        </div>
      </div>
    </section>
  )
}
