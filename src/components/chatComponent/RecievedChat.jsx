import React from 'react'
import { formatDistanceToNow } from "date-fns";

function RecievedChat({message}) {
  // console.log("messages in chat", message);
  return (
    <div className='w-full flex items-start'>
      <div>
        <div className=' mb-2 flex justify-start relative max-w-xl  '>
          {!message.attachment && (
            <div className='text-gray-700 bg-gray-50 rounded-t-lg rounded-l-lg px-4 py-2'>
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
              className="relative rounded-lg object-cover w-3/4 h-full"
            >
              <source
                src={message.attachment.filename}
              />
            </video>
          )}
        </div>
        <span className="text-xs flex font-normal text-gray-500 dark:text-gray-400">
          {message?.createdAt &&
            formatDistanceToNow(message?.createdAt, { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}

export default RecievedChat