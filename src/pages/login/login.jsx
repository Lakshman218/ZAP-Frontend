import React, { useEffect } from 'react';
import loginimage from "../../../public/images/loginImg.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, validationSchema } from '../../utils/validations/loginValidation';
import { useDispatch, useSelector } from 'react-redux';
import { googleAuthenticate, postLogin } from '../../services/user/apiMethods';
import { toast } from 'sonner';
import { loginSuccuss } from '../../utils/context/reducers/authSlice';
import {auth, provider} from "../../utils/firebase/config"
import {signInWithPopup} from "firebase/auth"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  },[user, navigate])

  const submit = (values) => {
    postLogin(values)
      .then((response) => {
        const data = response.data
        if(response.status == 200) {
          toast.info(data.message)
          dispatch(loginSuccuss({user: data}))
          navigate('/')
        } else {
          toast.error(data.message)
          console.log(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
        console.log(error?.message);
      })
  }

  const handlegoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
         console.log("userdata from firebase",data);
      

        const userData = {
          userName: data.user.displayName,
          email: data.user.email,
          profileImg: data.user.photoURL,
        };

        console.log("user details",userData);
   
        googleAuthenticate({userData})
          .then((response) => {
            const data = response.data
            if(response.status == 200) {
              toast.info(data.message)
              dispatch(loginSuccuss({user: data}))
              navigate('/')
            } else {
              toast.error(data.message) 
              console.log(response.message);
            }
          })
          .catch((error) => {
            toast.error(error?.message);
            console.log(error?.message);
          })
      })
  }

  return (
    <div className="flex flex-col md:flex-row justify-center bg-white h-screen">
      {/* Left side: Login form */}
      <div className="flex items-center justify-center md:w-1/2 hover:scale-105 transition-transform duration-500">
        <div className="max-w-md w-full p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-5">Welcome Back!</h2>

          <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
            >
            <Form className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <Field 
                  type="email" 
                  name="email" 
                  id="email" 
                  autoComplete="off"
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                />
                <label 
                  htmlFor="email" 
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
              </div>
              
              <div className="relative z-0 w-full mb-1 group">
                <Field 
                  type="password" 
                  name="password" 
                  id="password" 
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                  placeholder=" " 
                  autoComplete="off" // Add this line
                />
                <label 
                  htmlFor="password" 
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
              </div>

              {/* forgot password */}
              <div className='text-sm mb-2 text-black flex justify-end mb-6'>
                <Link to="/forgot-password" className='hover:underline hover:text-red-600'>
                  Forgot Password
                </Link>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <button 
                className="w-full bg-gray-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit">Sign In</button>
              </div>
            </Form>
          </Formik>

          <div className="text-center mb-3">
            <span className="text-gray-600">Or</span>
          </div>
          {/* google signIn button */}

          <button 
            type="button" 
            onClick={handlegoogleSignUp}
            className="bg-white font-medium justify-center w-full active:bg-blueGray-50 text-blueGray-700  px-4 py-3 rounded-md outline-grey focus:outline-none mr-3 mb-5  uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150">
            <img
              alt="..."
              className="w-5 mr-1"
              src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
            />
            <span>Sign In with Google</span>
          </button>

          <div className="text-center mt-4">
            Don't have an account?{' '}
            <Link to={'/signup'} className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline ">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* Right side: Image */}
      <div className='hidden md:flex md:w-1/2 items-center bg-white'>
        <div className='p-14'>
          <img 
            className='w-full p-10 ' // Add hover effect here
            src={loginimage} 
            alt="" 
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
