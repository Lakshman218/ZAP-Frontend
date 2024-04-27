import React, { useEffect } from 'react';
import loginimage from "../../../public/images/loginImg.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, validationSchema } from '../../utils/validations/loginValidation';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../services/user/apiMethods';
import { toast } from 'sonner';
import { loginSuccuss } from '../../utils/context/reducers/authSlice';

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

  return (
    <div className="flex justify-center h-screen bg-white">
      {/* Left side: Login form */}
      <div className="flex items-center justify-center w-1/2">
        <div className="max-w-md w-full p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back!</h2>

          <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
            >
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                <Field 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" name="email" type="email" placeholder="Enter your email" autoComplete="off" />
                <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
                <Field 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="password" name="password" type="password" placeholder="Enter your password" autoComplete="off" />
                <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <button 
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit">Sign In</button>
              </div>
            </Form>
          </Formik>

          <div className="text-center mb-4">
            <span className="text-gray-600">Or</span>
          </div>

          <button type="button" className="shadow-md border justify-center w-full text-black bg-white hover:bg-[#4285F4]/90 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path fillRule="evenodd" fill="#FF5733" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="text-center mt-4">
            Don't have an account?{' '}
            <Link to={'/signup'} className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* Right side: Image */}
      <div className='flex items-center justify-center w-1/2 bg-white'>
        <div className='p-14'>
          <img className='w-full p-10' src={loginimage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
