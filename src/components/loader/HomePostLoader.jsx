import React from 'react'

function HomePostLoader() {
  return (
    <div className="w-full lg:px-10 lg:p-0 mb-8 mr-2 h-max rounded-md border-none shadow-md bg-white border animate-pulse">
    <div className='w-10/12 ml-12'>
      <div className='flex justify-between items-center mx-2'>
        {/* user details */}
        <div className='flex cursor-pointer'>
          <div className="flex items-center justify-center bg-gray-300 rounded-full w-11 h-11 overflow-hidden"></div>
          <div className='ml-2 mb-1'>
            <div className='h-6 bg-gray-200 rounded w-24 mb-1'></div>
            <div className='h-4 bg-gray-200 rounded w-20'></div>
          </div>
        </div>
        <div className='relative'>
          {/* edit or delete post */}
          <div className='flex cursor-pointer'>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
  
      <div className="lg:px-4 lg:py-2 sm:p-0">
        <div className="relative w-full bg-gray-200 dark:bg-gray-800 rounded-md">
          <div className="relative pb-[100%] overflow-hidden rounded-md">
            <div className="absolute inset-0 h-full w-full bg-gray-300"></div>
          </div>
        </div>
      </div>
  
      <div className='text-gray-200 flex justify-between mx-2'>
        {/* like, comment, share */}
        <div className='py-1 mt-0 flex gap-3'>
          <div className='group relative'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
          </div>
          <div className='group relative'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
          </div>
          <div className='group relative'>
            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
          </div>
        </div>
  
        {/* save post */}
        <div className='py-1 mt-0 flex cursor-pointer relative group'>
          <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <div className='h-4 bg-gray-200 rounded w-24'></div>
          </div>
        </div>
      </div>
  
      <div className='text-black block pb-2 ml-2'>
        <div className='font-semibold h-6 bg-gray-200 rounded w-32 mb-1'></div>
        <div className='text-sm h-4 bg-gray-200 rounded w-48'></div>
      </div>
    </div>
  </div>
  )
}

export default HomePostLoader