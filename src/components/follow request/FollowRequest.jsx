import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { acceptFollowRequest, getRequestedUsers, rejectFollowRequest } from '../../services/user/apiMethods';
import { toast } from 'sonner';
import Requests from './Requests';

function FollowRequest() {

  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getRequestedUsers({ userId }).then((response) => {
        // console.log("request to follow",response.data);
        setRequests(response.data.requests);
        setLoading(false);
      });
    }, 2000);
  }, []);

  const handleAcceptRequest = (requestedUser) => {
    // console.log(requestedUser);
    acceptFollowRequest({ userId, requestedUser }).then((response) => {
      setRequests(response.data.connections);
      // console.log(response.data.connections);
      toast.info("Request Accepted");
    });
  };
  const handleReject = (requestedUser) => {
    rejectFollowRequest({ userId, requestedUser }).then((response) => {
      setRequests(response.data.connections);
      toast.info("Request Rejected");
      // console.log(response.data.connections);
    });
  };

  return (

    <div className=''>
      <div>
        {requests.map((request) => {
          console.log("in request", request);
          return (
            <Requests 
              user={user}
              key={request._id}
              request={request}
              handleAcceptRequest={handleAcceptRequest}
              handleReject={handleReject}
            />
          );
        })}
      </div>
    </div>
  )
}

export default FollowRequest