import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChatUsers from '../../components/chatComponent/ChatUsers'
import Messages from '../../components/chatComponent/Messages'
import NoChat from '../../components/chatComponent/NoChat'
import { useSelector } from 'react-redux'

function Chat() {
  const selectUser = (state) => state.auth.user
  const user  = useSelector(selectUser)
  const userId = user._id
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([])
  const [lastMessages, setLastMessages] = useState([])

  

  return (
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">

      <ChatUsers 
        user={user}
        conversations={conversations}
        setConversations={setConversations}
        setCurrentChat={setCurrentChat}
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