import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUserDetails, getUserPost } from '../../services/user/apiMethods';
import { toast } from 'sonner';
import UserDetails from '../../components/userDetails/UserDetails';

function UserProfile() {  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    getUserDetails(userId)
      .then((response) => {
        console.log("userprofile response", response);
        setUser(response.data.user)
        setConnections(response.data.connections);
      })
      .catch((error) => {
        toast.error(error.message);
      })
    getUserPost(userId) 
      .then((response) => {
        const postsData = response.data;
        setPosts(postsData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  },[])

  return (
    <div className='w-full mr-2'>
      {loading && <p className='flex justify-center items-center font-semibold mt-10'>Loading</p> }
      {!loading && <UserDetails user={user} connections={connections} posts={posts} />}
    </div>
  )
}

export default UserProfile