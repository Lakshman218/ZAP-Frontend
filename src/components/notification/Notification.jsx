import React from 'react'

function Notification({onClose}) {
  return (
    <div className='fixed w-screen h-screen top-0  left-56 z-50 bg-black bg-opacity-30 backdrop-blur-md ml-12'>
      <div className="fixed w-96 h-screen top-0 flex flex-col  bg-white">
      
        <div className='flex justify-between'>
          <div className="flex-grow flex items-center ml-2">
            <p className="font-semibold text-xl">Notifications</p>
          </div>
          <div className="flex justify-end p-2">
            <button 
            onClick={onClose}
            className=" text-white px-2 py-2 rounded">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center items-start  h-14 p-2 border-t border-gray-400 ">
          
        </div>
        {/* search result */}
        

      </div>
    </div>
  )
}

export default Notification