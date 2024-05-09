import React from 'react';

function AddPost() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      {/* Transparent background overlay */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* Box in the center */}
        <div className="bg-white rounded-lg p-8 relative">
          {/* Close button */}
          <button className="absolute top-0 right-0 p-2" onClick={() => console.log('Close')}>
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Content */}
          <h2 className="text-xl font-bold mb-4">Upload a Post</h2>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Select</button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
