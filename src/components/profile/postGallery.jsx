import React, { useState } from 'react';
import ShowPost from '../homepost/ShowPost';

function PostGallery({ post, fetchposts }) {

  const [showPostModal, setShowPostModal] = useState(false)
  const handleModal = () => {
    setShowPostModal(!showPostModal)
  }
  const imageUrlArray = post.imgUrl; 
  // console.log("imageurl in postgallery", imageUrlArray);

  return (
    // <div>
    //   <div>
    //     {imageUrlArray.map((imageUrl, index) => (
    //       <div key={index}>
    //         <img style={{height: '256px'}} className=' w-full rounded-md' src={imageUrl} alt={`Post ${index}`} />
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="flex flex-wrap gap-4">
      {imageUrlArray.map((imageUrl, index) => (
        <div
          onClick={handleModal}
          key={index}
          style={{height: '286px'}}
          className="relative overflow-hidden w-full rounded-lg transition-transform duration-300 cursor-pointer"
        >
          <img
            className="w-full h-full rounded-md object-cover transition-transform duration-300 transform hover:scale-125"
            src={imageUrl}
            alt={`Post ${index}`}
          />
        </div>
      ))}

      {showPostModal && <ShowPost post={post} fetchposts={fetchposts} onClose={handleModal} /> }
    </div>

    // <div className="flex flex-wrap gap-4">
    // {imageUrlArray.map((imageUrl, index) => (
    //   <div
    //     key={index}
    //     style={{ height: '256px' }}
    //     className="relative overflow-hidden w-full rounded-lg transition-transform duration-300"
    //   >
    //     <img
    //       className="w-full h-full rounded-md object-contain transition-transform duration-300 transform hover:scale-125"
    //       src={imageUrl}
    //       alt={`Post ${index}`}
    //     />
    //   </div>
    // ))}
    // </div>
  );
}

export default PostGallery;
