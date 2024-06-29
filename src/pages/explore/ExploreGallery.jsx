import React from 'react'

function ExploreGallery({ post }) {
  const imageUrlArray = post.imgUrl;
  return (
    <div className="flex flex-wrap gap-4 lg:w-full w-10/12">
      {imageUrlArray.map((imageUrl, index) => (
        <div  
          key={index}
          style={{height: '256px'}}
          className="relative overflow-hidden w-full transition-transform duration-300"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-125"
            src={imageUrl}
            alt={`Post ${index}`}
          />
        </div>
      ))}
    </div>
  );
}

export default ExploreGallery