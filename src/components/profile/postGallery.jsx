import React from 'react'

function PostGallery() {
  return (
    <div className='p-4'>
      <div>
        
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
              <img className='h-auto max-w-full rounded-lg' src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
          </div>
          <div>
            <img className='h-auto max-w-full rounded-lg' src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
          </div>
          <div>
              <img className='h-auto max-w-full rounded-lg' src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
          </div>
          <div>
              <img className='h-auto max-w-full rounded-lg' src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
          </div>
          <div>
              <img className='h-auto max-w-full rounded-lg' src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
          </div>
          <div>
              <img className='h-auto max-w-full rounded-lg' src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
          </div>
      </div>

    </div>
  )
}

export default PostGallery