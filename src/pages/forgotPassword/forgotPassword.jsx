import React from 'react'
import forgotpswdIng from "../../../public/images/forgotpswdImg.jpg"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { toast } from "sonner";
import { forgotPassword } from '../../services/user/apiMethods';

function ForgotPassword() {
  const navigate = useNavigate()
  const initialValues = {
    email: ""
  };
  

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
     .email("Invalid email address")
     .required("Email is required"),
  })

  const submit = (values) => {
    console.log("here");
    forgotPassword({email: values.email}) 
      .then((response) => {
        const data = response.data  
        toast.success(data.message)
        navigate(`/forgot-otp?email=${data.email}`)
      })
      .catch((error) => {
        toast.error(error?.message)
        console.log(error?.message);
      })
  }

  return (
    <div className="flex flex-col md:flex-row justify-center bg-white h-screen">
      {/* Left side: Login form */}
      <div className="flex items-center justify-center md:w-1/2 ">
        <div className="max-w-md w-full p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

          <Formik 
            initialValues={initialValues}
            validationSchema={emailValidationSchema}
            onSubmit={submit}
            >
            <Form>
              <div className="mb-4">
                <label className="block text-gray-500 text-xs font-semibold mb-2" htmlFor="email">Email</label>
                <Field 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" name="email" type="email" placeholder="Enter your email" autoComplete="off" />
                <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
              </div>
              {/* signIn button */}
              <div className="flex items-center justify-between mb-6">
                <button 
                className="w-full bg-gray-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit">Sent OTP</button>
              </div>
            </Form>
          </Formik>

          <div className="text-center mt-4">
            Get back to login?{' '}
            <Link to="/login" className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline">
              Click here
            </Link>
          </div>
        </div>
      </div>
      {/* Right side: Image */}
      <div className='hidden md:flex md:w-1/2 items-center bg-white'>
        <div className='p-14'>
          <img className='w-full p-10' src={forgotpswdIng} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword