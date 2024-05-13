import React, { useCallback, useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { FileInput, Label } from "flowbite-react";
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { addPost } from '../../services/user/apiMethods';
import { useSelector } from 'react-redux';

function AddPost({ closeAddPost }) {
  const selectedUser = (state) => state.auth.user || ""
  const user = useSelector(selectedUser)
  const userId = user._id || ""
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = useCallback((event) => {
    const files = event.target.files; 
    if(files && files.length > 0) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const selectedFiles = Array.from(files);
      const invalidFiles = selectedFiles.filter(file => !validImageTypes.includes(file.type))
      if(invalidFiles.length > 0) {
        toast.error("Please select only image files (JPEG, PNG, GIF)");
        return
      }
    }
    setSelectedFiles(files);
  }, []);

  const formik = useFormik({
    initialValues: {
      images: [],
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      images: Yup.array()
        .min(1, "At least one image is required")
        .required("Image file required"),
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async() => {
      const {title, description} = formik.values;
      const imageUrls = []
      for(const image of formik.values.images) {
        const response = await fetch(image)
        const blob = await response.blob()

        const formData = new FormData()
        formData.append("file", blob)
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET) 
        formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dpn5xsh8k/image/upload",
            formData
          )
          const imageUrl = res.data.url
          imageUrls.push(imageUrl)
        } catch (error) {
          console.log("Error uploading image:", error);
        }
      }
      addPost({ userId, imageUrls, title, description  })
       .then((response) => {
        const data = response.data
        if(response.status ===  200) {
          toast.info(data.message)
        } else {
          console.log(response.message);
            toast.error(data.message);
        }
       })
      .catch((error) => {
        toast.error(error?.message);
        console.log(error?.message);
      })
    }
  })

  const handleCancelClick = () => {
    formik.values.images = [];
    closeAddPost()
  }

  return (
    <div className=''>
      <Modal
        dismissible
        show={true}  
        onClose={handleCancelClick}
        className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur-md w-full"
      >
        <div className='p-4 sm:p-10'>
          <Modal.Header>Add Post</Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}
              className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
                <FileInput id="multiple-file-upload" multiple onChange={handleFileChange} />
              </div>

              {/* Render selected images */}
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium">Selected Images:</p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div key={index} className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
                        <img src={URL.createObjectURL(file)} alt={`Image ${index}`} className="w-full h-full object-cover" />
                        <p className="text-xs text-center">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formik.errors.images && (
                <p className="text-red-600 text-xs">
                  {formik.errors.images}
                </p>
              )}

              {/* Title Input */}
              <div className="relative z-0 w-full mb-5 group">
                <input 
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" 
                name="title" id="title" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
              </div>
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-600 text-xs">
                  {formik.errors.title}
                </p>
              )}

              {/* Description Input */}
              <div className="relative z-0 w-full mb-5 group">
                <textarea 
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description" 
                id="description" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required></textarea>
                <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
              </div>
              {formik.touched.description &&
              formik.errors.description && (
                <p className="text-red-600 text-xs">
                  {formik.errors.description}
                </p>
              )}

              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={closeAddPost}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
export default AddPost;
