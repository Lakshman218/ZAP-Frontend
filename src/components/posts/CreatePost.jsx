import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Cropper from 'react-easy-crop';
import Loader from '../loader/loader';
import  { addPost } from "../../services/user/apiMethods"
import { Share2 } from 'lucide-react';


function getCroppedImg(imageSrc, crop) {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // For CORS image handling
      image.src = url;
    });

  return createImage(imageSrc).then((image) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Image crop failed.");
          return;
        }
        blob.name = "cropped.jpeg";
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, 'image/jpeg');
    });
  });
}

function CreatePost({ closeAddPost }) {
  const selectedUser = (state) => state.auth.user || "";
  const user = useSelector(selectedUser);
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const navigate = useNavigate();

  const resetState = () => {
    formik.resetForm();
    setImageSrc(null);
    setCroppedImage(null);
  };

  const postinitialValues = {
    images: [],
    title: "",
  }

  const postvalidationSchema = Yup.object({
    images: Yup.array()
      .min(1, "At least one image is required")
      .required("Image file required"),
    title: Yup.string()
      .trim() // Trim leading and trailing spaces
      .required("Title is required")
      .matches(/^\S+.*\S$/, "Title cannot contain only spaces"),
  })

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Please select only image files (JPEG, PNG, GIF)");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  

  const formik = useFormik({
    initialValues: postinitialValues ,
    validationSchema: postvalidationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values for add post", values);
      setLoading(!loading)
      const { title, images } = values;
      const imageUrls = [];
    
      try {
        // Convert the data URL to a Blob
        const response = await fetch(images[0]);
        const blob = await response.blob();
    
        const formData = new FormData();
        formData.append("file", blob, "cropped.jpeg");
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    
        const cloudinaryResponse = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
        imageUrls.push(cloudinaryResponse.data.url);
    
        const postResponse = await addPost({ userId, imgUrl: imageUrls, title });
        if (postResponse.status === 200) {
          toast.info(postResponse.data.message);
          resetState();
          resetForm();
          setLoading(!loading)
          closeAddPost();
          navigate('/');
        } else {
          toast.error(postResponse.data.message);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while uploading the image or creating the post");
        setLoading(false);
      }
    },
  });

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImageUrl);
      formik.setFieldValue('images', [croppedImageUrl]); // Set the images field in Formik
    } catch (e) {
      toast.error('Crop failed.');
    }
  }, [croppedAreaPixels, imageSrc, formik]);

  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-blur-md'>
      <div className='flex justify-center items-center h-full'>
        <div className='dark:bg-black bg-white p-10 space-y-4 w-full md:mx-80 rounded-md max-h-[90vh] overflow-y-auto'> {/* Increased max height */}
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-xl text-gray-800 dark:text-white'>Create new post</h2>
            <button onClick={closeAddPost} className="text-white px-2 py-2 rounded">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
            </button>
          </div>

          {loading && 
            <div className='max-w-md flex flex-col justify-center items-center mx-auto h-[70vh]'>
              <Loader/>
              <p className='mt-6 flex justify-center'>Uploading...</p>
            </div>
          }

          {!loading && 
            <div className='max-w-md mx-auto h-[70vh]'> {/* Increased height */}
              {!imageSrc ? (
                <div className='flex flex-col items-center justify-center h-full border border-dashed border-gray-400 p-4'>
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l9 9m0 0l9-9m-9 9V2"></path> */}
                    <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
                  </svg>
                  <p className='text-gray-500 text-sm mb-2'>Select Image From Choose File</p>
                  <label className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                    Choose File
                    <input type='file' className='hidden' onChange={handleFileChange} />
                  </label>
                </div>
              ) : (
                !croppedImage ? (
                  <div className='relative h-full w-full'>
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-white flex justify-center'>
                      <button
                        onClick={showCroppedImage}
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'
                      >
                        Crop
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={formik.handleSubmit} className='flex flex-col items-center h-full'>
                    <img src={croppedImage} alt='Cropped' className='max-h-[55vh] object-contain' /> {/* Adjusted max height */}
                    <input
                      type='text'
                      name='title'
                      placeholder='Write a caption..'
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className='mt-4 p-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 w-full'
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="text-red-500">{formik.errors.title}</div>
                    )}
                    <button
                      type='submit'
                      className='mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >
                      Share
                    </button>

                    {/* <div> 
                        <div
                              class="mt-4 flex justify-center items-center border-2 border-radius border-white-200 overflow-hidden p-1 rounded-full shadow-lg"
                            >
                              <button
                                type='submit'
                                class="bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group w-28 h-10 inline-flex transition-all duration-300 overflow-visible p-1 rounded-full group"
                              >
                                <div
                                  class="w-full h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-1 rounded-full hover:shadow-none duration-300"
                                >
                                  <div
                                    class="w-full h-full text-xl gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#f4f4f4,#fefefe)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] duration-200 items-center text-[18px] font-medium gap-4 inline-flex overflow-hidden px-4 py-2 rounded-full black group-hover:text-blue-600"
                                  >
                                    <Share2 size={14}/>
                                    <span class="ml-2 text-sm">Share</span>
                                  </div>
                                </div>
                              </button>
                            </div>
                      </div> */}
                  </form>
                )
              )}
            </div>
          }

        </div>
      </div>
    </div>
  );
}


export default CreatePost