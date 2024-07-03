import React from 'react'
import { formatDistanceToNow } from "date-fns";
import VoicePlayer from './VoicePlayer ';

function SendedChat({message}) {
  return (
    <div className='w-full flex justify-end items-start'>
      <div>
        <div className='flex justify-end relative max-w-xl my-2 mb-2'>
          {!message.attachment && (
            <div className=' flex justify-end relative max-w-xl px-4 py-2 text-gray-700 bg-blue-100 rounded-t-lg rounded-r-lg shadow'>
              {message.text}
            </div>
          )}
          {message.attachment && message.attachment.type === "image" && (
            <img
              src={message.attachment.filename}
              alt=""
              className="relative rounded-lg object-cover w-2/4 h-full"
            />
          )}
          {message.attachment && message.attachment.type === "video" && (
            <video
              controls
              className="relative rounded-lg object-cover w-2/4 h-full"
            >
              <source
                src={message.attachment.filename}
              />
            </video>
          )}
          {message.attachment && message.attachment.type === "audio" && (
            <VoicePlayer 
              src={message.attachment.filename}
            />
          )}
        </div>
        <span className="text-xs flex font-normal text-gray-500 dark:text-gray-400 justify-end px-2">
          {message?.createdAt &&
            formatDistanceToNow(message?.createdAt, { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}

export default SendedChat