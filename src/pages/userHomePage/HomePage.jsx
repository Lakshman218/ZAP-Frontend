import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomePosts from '../../components/homepost/HomePosts'
import MiniProfile from '../../components/userMiniProfile/MiniProfile'
import { getAllPosts } from '../../services/user/apiMethods'
import Header from '../../components/header/header'
import { toast } from 'sonner'

function HomePage() {
  const selectedUser = (state) => state.auth.user;
  const user = useSelector(selectedUser);
  const userId = user._id || "";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      fetchposts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchposts = () => {
    getAllPosts({ userId: userId })
     .then((response) => {
        const postDatas = response.data;
        // console.log("postdatas in homepage", postDatas);
        setPosts(postDatas);
        // console.log("post in home", posts);
      })
     .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {/* <div className="flex justify-between w-full"> */}
        <div className="flex flex-col mr-2 lg:ml-5" style={{width:'870px'}}>
          <div className="p-2 rounded-md  bg-white">
            <Header />
          </div>
          <div className="w-full lg:px-10 p-4 py-4 mr-2 h-max rounded-md bg-white">
            {posts.map((post) => {
              // console.log("post in inside home", post);
              return <HomePosts key={post._id} post={post} />;
            })}
          </div>
        </div>
      {/* </div> */}
        <div className="hidden md:flex fixed right-0">
          <MiniProfile />
        </div>
    </>
  );
}


export default HomePage 