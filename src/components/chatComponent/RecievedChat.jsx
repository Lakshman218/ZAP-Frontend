import React from 'react'

function RecievedChat({message}) {
  return (
    <div className='w-full flex items-start'>
      <div className='w-full mb-2 flex justify-start relative max-w-xl px-4 py-2 text-gray-700 bg-gray-50 rounded-t-lg rounded-l-lg'>
        {message.text}
      </div>
    </div>
  )
}

export default RecievedChat