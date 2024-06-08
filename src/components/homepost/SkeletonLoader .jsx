import React from 'react'
import "../homepost/SkeletonLoader.css"
function SkeletonLoader () {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex cursor-pointer'>
        <div className="flex items-center justify-center skeleton rounded-full w-12 h-12"></div>
        <div className='mb-1'>
          <div className='skeleton lg:ml-4 ml-2 w-24 h-6 rounded'></div>
          <div className='skeleton lg:ml-4 ml-2 w-16 h-4 rounded mt-1'></div>
        </div>
      </div>

      <div className='relative'>
        <div className='flex cursor-pointer'>
          <div className='skeleton w-6 h-6 rounded'></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader 