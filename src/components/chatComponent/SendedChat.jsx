import React from 'react'

function SendedChat({message}) {
  return (
    <div className='w-full flex justify-end items-start'>
      <div className='w-full my-2 mb-2 flex justify-end relative max-w-xl px-4 py-2 text-gray-700 bg-blue-100 rounded-t-lg rounded-r-lg shadow'>
        {message.text}
      </div>
    </div>
  )
}

export default SendedChat