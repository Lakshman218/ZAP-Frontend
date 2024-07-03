import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatUsers from '../../components/chatComponent/ChatUsers'
import Messages from '../../components/chatComponent/Messages'
import NoChat from '../../components/chatComponent/NoChat'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { BASE_URL } from '../../constants/baseUrls' 
import { getLastMessages, getUserConversations } from '../../services/user/apiMethods'

function Chat() {
  const selectUser = (state) => state.auth.user
  const user  = useSelector(selectUser)
  const userId = user._id
  // const socket = useRef()
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([])
  const [lastMessages, setLastMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([]);
    
  useEffect(() => {

    // socket.current = io(BASE_URL)

    getUserConversations(userId)
      .then((response) => {
        setConversations(response.data.filteredConversations)
      })

    getLastMessages()
      .then((response) => {
        console.log("res for last msg", response.data.lastMessages);
        setLastMessages(response.data.lastMessages)
      })

  }, [])


  return (
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">

      <ChatUsers 
        user={user}
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
          currentChat={currentChat}
        />
      )}

      {!currentChat && (
        <NoChat />
      )}

    </div>
  )
}

export default Chat