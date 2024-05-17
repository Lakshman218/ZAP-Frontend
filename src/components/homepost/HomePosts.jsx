import React from 'react'

function HomePosts({post}) {
  const imageUrlArray = post.imgUrl; 
  const postTitle = post.title; 
  const postDescription = post.description
  const userId = post.userId; 
  const profileImg = userId.profileImg; 
  const userName = userId.userName;

  // console.log("post data in homepost",post);
  return (

    <div className="w-full lg:px-10 lg:p-0 mb-8 mr-2 h-max rounded-md border-none shadow-md bg-white border">
      
      <div className='flex justify-start items-center'>
        <div className="flex items-center justify-center bg-gray-200 rounded-full max-h-12 max-w-12">
          <img className='rounded-full w-full' src={profileImg} alt="" />
        </div>
        <div className='lg:ml-4 ml-2 font-medium lg:text-xl mb-2'>
          <p className='text-black'>{userName}</p>
        </div>
      </div>
    
      <div className=" lg:p-4 sm:p-0"> 
        <div id="controls-carousel" className="relative w-full bg-gray-200 " >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              <div className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" data-carousel-item>
                  {imageUrlArray.map((imageUrl, index) => {
                    return <img src={imageUrl} alt={`post ${index}`} />
                  })}
              </div>
          </div>
        
          <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                  </svg>
                  <span className="sr-only">Previous</span>
              </span>
          </button>
          <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="sr-only">Next</span>
              </span>
          </button>
        </div>
        
        <div className='text-gray-200  py-1 mt-2 flex gap-3'>
        <svg className="w-6 h-6 text-black darktext-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 22">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
        </svg>

        <svg className="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 22">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
        </svg>

        <svg className="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 22">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"/>
        </svg>

        </div>
        <div className='text-black block py-2'>
          <p>{postTitle}</p>
          <p className='text-sm ml-2'>{postDescription}</p>
        </div>
      </div>

    </div>
  )
}

export default HomePosts
