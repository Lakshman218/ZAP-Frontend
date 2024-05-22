import { useFormik } from 'formik';
import * as Yup from "yup";
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../services/user/apiMethods';
import { loginSuccuss } from '../../utils/context/reducers/authSlice';
import { toast } from 'sonner';
import CropImage from '../imageCrop/CropImage';
import axios from 'axios';

function UserEditProfile({user, handleEditModal}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState(user.profileImg || '');

  const formik = useFormik({
    initialValues: {
      image: user.profileImage,
      userName: user.userName,
      name: user.name,
      bio: user.bio,
      gender: user.gender,
      phone: user.phone,
    },
    validationSchema: Yup.object({
      userName: Yup.string()
    .trim()  // Trims leading and trailing whitespace
    .test(
      'no-whitespace', 
      'UserName should not contain spaces', 
      value => !/\s/.test(value)  // Checks for whitespace within the string
    )
    .required('UserName is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Invalid phone number')
    .required('Phone number is required')
    }),
    onSubmit: async(values) => {
      const userId = user._id
      const {userName, name, phone, bio, gender} = values
      let imageUrl 
      try {
        if(profileImage!== user.profileImg) {
          console.log("imageurl", imageUrl);
          const response = await fetch(profileImage);
          const blob = await response.blob();
          const formData = new FormData()
          formData.append("file", blob)
          formData.append("upload_preset", "tzxkty8m")
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dpn5xsh8k/image/upload",
            formData
          );
          imageUrl = res.data.secure_url;
        } else {
          imageUrl = user.profileImg
        }

        await editProfile({
          userId,
          image: imageUrl,
          userName,
          name,
          bio,
          gender,
          phone,
        }).then((response) => {
          const userData = response.data
          console.log("res in edit", response.data);
          dispatch(loginSuccuss({user: userData}))
          toast.info("Profile updated succussfully")
          handleEditModal()
          navigate('/profile')
        })
        .catch((error) => {
          toast.error(error.message)
          console.log(err);
        })
      } catch (error) { 
        console.error("Error updating profile:", error);
        // toast.error("Failed to update profile");
        return
      }
    },
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
        formik.setFieldValue('image', reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(user.profileImg);
      formik.setFieldValue('image', user.profileImg);
    }
  };


  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-blur-md'>
      <div className='flex justify-center items-center h-full '> {/* Center the content vertically */}
        <div className='bg-white p-10 space-y-4 w-full md:mx-80 rounded-md'> {/* Increased padding and max-width */}
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-xl'>Edit Profile</h2>
            <div >
            <button 
            onClick={handleEditModal}
            className=" text-white px-2 py-2 rounded">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
              </svg>
            </button>
          </div>
          </div>
          <div className='max-w-md mx-auto'>
            <form onSubmit={formik.handleSubmit}>

              {/* Profile Photo Upload */}
              <div className="mb-5 flex flex-col items-center justify-center">
                <input type="file" id="profilePhoto" accept="image/*" onChange={handleFileChange} className="hidden" />
                {profileImage && (
                  <div className="h-40 w-40 rounded-full overflow-hidden mt-2 ">
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  </div>
                )}
                <label htmlFor="profilePhoto" className="cursor-pointer mt-2">Change Profile Photo</label>
              </div>
              
              <div className="relative z-0 w-full mb-5 group">
                  <input 
                  type="text" 
                  name="userName" 
                  id="userName" 
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  {formik.touched.userName && formik.errors.userName && (
                    <p className="text-red-600 text-xs">{formik.errors.userName}</p>
                  )}
                  <label for="userName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserName</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                  <input 
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                  <input
                  value={formik.values.bio} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  type="text" name="bio" id="bio" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="bio" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bio</label>
              </div>
              {/* <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
              </div> */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input 
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                    {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-600 text-xs">{formik.errors.phone}</p>
                  )}
                    <label for="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    {/* <input type="text" name="gender" id="gender" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> */}
                    <label for="gender" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                    {/* <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Gender
                  </label> */}
                  <select
                    id="gender"
                    className="bg-white mt-1 border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              
            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditProfile