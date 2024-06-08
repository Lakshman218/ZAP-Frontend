import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomePosts from '../../components/homepost/HomePosts'
import MiniProfile from '../../components/userMiniProfile/MiniProfile'
import { getAllPosts } from '../../services/user/apiMethods'
import Header from '../../components/header/header'
import { toast } from 'sonner'
import Loader from '../../components/loader/loader'

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
    setLoading(true)
    getAllPosts({ userId: userId })
     .then((response) => {
        const postDatas = response.data;
        // console.log("postdatas for like",postDatas);
        setPosts(postDatas);
      })
     .catch((error) => {
        toast.error(error.message);
      });
      setLoading(false)
  };

  return (
    <>
      {/* <div className="flex justify-between w-full"> */}
        {loading && <Loader/> }
        {!loading &&
        <div className="flex flex-col mr-2 lg:ml-5" style={{width:'870px'}}>
          <div className="p-2 rounded-md  bg-white">
            <Header />
          </div>
          <div className="w-full lg:px-10 p-4 py-4 mr-2 h-max rounded-md bg-white">
            {posts.map((post) => {
              // console.log("post in inside home", post);
              return <HomePosts key={post._id} post={post} fetchposts={fetchposts} />;
            })}
          </div>
        </div>
        }
      {/* </div> */}
        <div className="hidden lg:flex fixed right-0">
          <MiniProfile />
        </div>
    </>
  );
}


export default HomePage 