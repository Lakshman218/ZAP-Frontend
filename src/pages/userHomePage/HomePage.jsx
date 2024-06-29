import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomePosts from '../../components/homepost/HomePosts'
import MiniProfile from '../../components/userMiniProfile/MiniProfile'
import { getAllPosts } from '../../services/user/apiMethods'
import Header from '../../components/header/header'
import { toast } from 'sonner'
import Loader from '../../components/loader/loader'
import HomePostLoader from '../../components/loader/HomePostLoader'
import emptypost from "../../../public/images/userNopost.jpg"
  

function HomePage() {
  const selectedUser = (state) => state.auth.user;
  const user = useSelector(selectedUser);
  const userId = user._id || "";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      fetchposts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchposts = () => {
    setLoading(true);
    getAllPosts({ userId: userId })
      .then((response) => {
        const postDatas = response.data;
        setPosts(postDatas);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      });
  };

  return (
    <>
      {/* <div className="flex justify-between w-full"> */}
        

        <div className="flex flex-col mr-2 lg:ml-10" style={{width:'870px'}}>
          <div className="p-2 rounded-md  bg-white dark:bg-black">
            <Header />
          </div>
          
          
          {posts.length === 0 ? (
            <div className='flex flex-col justify-center items-center mt-4  text-black w-full h-auto'>
              {/* <img className='w-96' src={emptypost} alt="" />
              <p className='text-gray-500'>Build your connections and share your moments.</p> */}
            </div>
          ) : (
            <div className="w-full lg:px-10 p-4 py-4 mr-2 h-max rounded-md bg-white dark:bg-black">
              {posts.map((post) => {
                // console.log("post in inside home", post);
                return (
                  <div>
                    {loading && <HomePostLoader/> }
                    {!loading && 
                      <HomePosts key={post._id} post={post} fetchposts={fetchposts} />
                    }
                  </div>
                )
              })}
            </div>
          )}
        </div>
       
      {/* </div> */}
        <div className="hidden lg:flex fixed right-0">
          <MiniProfile fetchposts={fetchposts} />
        </div>
    </>
  );
}


export default HomePage 