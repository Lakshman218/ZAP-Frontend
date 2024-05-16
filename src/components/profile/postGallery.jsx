import React from 'react';

function PostGallery({ post }) {
  const imageUrlArray = post.imgUrl; 
  console.log("imageurl in postgallery", imageUrlArray);

  return (
    <div className=''>
      <div>
        {imageUrlArray.map((imageUrl, index) => (
          <div key={index}>
            <img className='h-full w-full rounded-lg ' src={imageUrl} alt={`Post ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostGallery;
