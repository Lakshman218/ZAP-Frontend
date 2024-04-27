import React from 'react'
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import loginimage from "../../../public/images/socialImg.png"
import { initialValues, validationSchema } from '../../utils/validations/registerValidation';
import { useDispatch } from 'react-redux';
import { postRegister } from '../../services/user/apiMethods';


function Signup() {
  // const dispatch = useDispatch()
  const navigate =  useNavigate()
  const submit = (values) => {
    postRegister(values)
    .then((response) => {
      const data = response.data
        if(response.status === 200) {
          toast.success(data.message)
          // navigate(`/otp?email=${data.email}`)
          navigate('/otp')
        } else {
          toast.error(data.message)
        }
      })
      .catch((error) => {
        toast.error(error?.message)
      })
  }

  return (
    <div className='flex justify-center h-screen bg-white'>
      {/* left side */}
      <div className='flex items-center justify-center w-1/2'>
        <div className=' max-w-md w-full shadow-md p-6'>
          <h2 className='text-2xl font-semibold text-center mb-6 mt-2'>Get Started Now</h2>

          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
          >

            <Form>
              <div className='mb-4'>
                <label className='block text-gray-700 text-xs font-semibold mb-1' htmlFor="email">Email</label>
                <Field className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="text" id="email" name='email' placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-xs font-semibold mb-2' htmlFor="userName">userName</label>
                <Field className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="text" id="userName" name='userName' placeholder="Enter your userName" />
                <ErrorMessage name="userName" component="div" className="text-red-600 text-xs" />
              </div>
              {/* <div className='mb-4'>
                <label className='block text-gray-700 text-xs font-semibold mb-1' htmlFor="name">Name</label>
                <Field className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="text" id="name" name='name' placeholder="Enter your name" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
              </div> */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-xs font-semibold mb-1' htmlFor="password">Password</label>
                <Field className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="password" id="password" name='password' placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
              </div>
              <div className='mb-6'>
                <label className='block text-gray-700 text-xs font-semibold mb-1' htmlFor="confirmPassword">Confirm Password</label>
                <Field className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none' type="password" id="confirmPassword" name='confirmPassword' placeholder="Confirm password" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs" />
              </div>
              <div className='flex items-center justify-between mb-3'>
                <button className='w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none' type='submit' >SignUp</button>
              </div>
            </Form>

          </Formik> 
          
          <div className="text-center mb-3">
            <span className="text-gray-600">Or</span>
          </div>
          
          <button type="button" className="shadow-md border justify-center w-full text-black bg-white hover:bg-[#4285F4]/90 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path fillRule="evenodd" fill="#FF5733" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="text-center mt-4">
            Have an account?{' '}
            <Link to="/login" className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline">
              SignIn
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className='flex items-center justify-center w-1/2 bg-white'>
        <div className='p-20'>
          <img className='w-full p-20' src={loginimage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Signup