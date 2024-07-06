import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ChatUsers from '../../components/chatComponent/ChatUsers'
import Messages from '../../components/chatComponent/Messages'
import NoChat from '../../components/chatComponent/NoChat'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { BASE_URL } from '../../constants/baseUrls' 
import { addConversation, getLastMessages, getUserConversations, getUserDetails } from '../../services/user/apiMethods'
import VideoCallModal from '../../components/chatComponent/VideoCallModal'
import ChatNavbar from '../../components/chatComponent/ChatNavbar'

function Chat() {

  const selectUser = (state) => state.auth.user
  const user  = useSelector(selectUser)
  const userId = user._id
  const socket = useRef()
  const navigate = useNavigate()
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  console.log("current chat person",currentChat);
  const [messages, setMessages] = useState([])
  const [lastMessages, setLastMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isGroup, setIsGroup] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [joinVideoCall, setJoinVideoCall] = useState(false);
  const [videoCallJoinRoomId, setVideoCallJoinRoomId] = useState("");
  const [isSharePost, setSharePost] = useState(null)
  const [callRequestedUser, setCallRequestedUser] = useState({
    name: "",
    profile: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const messageUserId = queryParams.get("userId");
  console.log("messageUserId in chat", messageUserId);

  const { shareUser, sharePost } = location.state || {};
  useEffect(() => {
    if(shareUser) {
      const userId = user._id
      const senderId = shareUser._id
      addConversation({senderId: userId, receiverId: senderId})
      .then((response) => {
        const userData = response.data;
        const existChat = conversations.filter((conver) => conver._id === userData._id)
        if(existChat.length === 0) {
          setConversations((prev) => [...prev, userData])
          console.log("");
        }
        setCurrentChat(userData)
        setSharePost(sharePost._id)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },[shareUser])
    
  useEffect(() => {

    socket.current = io(BASE_URL)

    getUserConversations(userId)
      .then((response) => {
        setConversations(response.data)
      })

    getLastMessages()
      .then((response) => {
        console.log("res for last msg", response.data);
        setLastMessages(response.data)
      })

    socket.current.on("getMessage", (data) => {
      const senderId = data.senderId
      console.log("get messag data", data);
      getLastMessages()
      getUserDetails(senderId)
        .then((response) => {
          console.log("res from userdetails", response.data);
          setArrivalMessage({
            sender: response.data.user,
            text: data.text,
            attachment: {
              type: data.messageType,
              filename: data.file,
            },
            createdAt: Date.now(),
          })
          console.log("arrivalMessage is",arrivalMessage);
        })
    })

    // socket.current.on("getMessage", (data) => {
    //   console.log("Received message:", data);
    //   setArrivalMessage(data); 
    // });

  }, [])

  useEffect(() => {
    ( arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender)) || 
    (currentChat?.members.find(
      (member) => member._id !== arrivalMessage?.sender
    ) && 
      setMessages((prev) => [...prev, arrivalMessage])
    )
    console.log("messages in useffect", messages)
    console.log("arrivalMessage in useffect", arrivalMessage)
  },[arrivalMessage, currentChat])

  useEffect(() => {
    socket?.current?.emit("addUser", user._id)
    socket?.current?.on("getUsers", (users) => {
      setOnlineUsers(users)
    })
  },[user])

  useEffect(() => {
    socket.current.on("videoCallResponse", (data) => {
      console.log("videoCallResponse",data);
      setVideoCallJoinRoomId(data.roomId);
      setCallRequestedUser({
        name: data.senderName,
        profile: data.senderProfile,
      });
      setJoinVideoCall(true);
    });
  },[socket])

  const handleJoinVidoCallRoom = () => {
    console.log("in video room", `/video-call/${videoCallJoinRoomId}/${userId}`);
    navigate(`/video-call/${videoCallJoinRoomId}/${userId}`);
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">

      {/* <ChatNavbar /> */}

      <ChatUsers 
        user={user}
        onlineUsers={onlineUsers}
        conversations={conversations}
        setConversations={setConversations}
        setCurrentChat={setCurrentChat}
        lastMessages={lastMessages}
      />

      {currentChat && (
        <Messages 
          messages={messages}
          setMessages={setMessages}
          user={user}
          onlineUsers={onlineUsers}
          currentChat={currentChat}
          socket={socket}
          shareUser={shareUser}
          isSharePost={isSharePost}
          setSharePost={setSharePost}
        />
      )}

      {!currentChat && (
        <NoChat />
      )}

      {joinVideoCall && (
        <VideoCallModal 
        show={joinVideoCall}
        onHide={() => setJoinVideoCall(false)}
        onAccept={handleJoinVidoCallRoom}
        onReject={() => {
          setVideoCallJoinRoomId("");
          setJoinVideoCall(false);
        }}
        caller={callRequestedUser}
        />
      )}

    </div>
  )
}

export default Chat