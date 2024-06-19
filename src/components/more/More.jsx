import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { pswdInitialValues, pswdValidationSchema } from '../../utils/validations/changePswdValidation'
import { initialValues, validationSchema } from '../../utils/validations/renewPasswordValidation'
import { changePassword, renewPassword } from '../../services/user/apiMethods'
import { toast } from 'sonner'
import VerifyEmailForEmail from './VerifyEmailForEmail'
import VerifyEmailForPswd from './VerifyEmailForPswd'


function More() {
  const selectedUser = (state) => state.auth.user
  const user = useSelector(selectedUser)
  const [showPassword, setShowPassword] = useState(false);
  
  const submit = (values, { resetForm }) => {
    const userId = user._id
    const { currentPassword, newPassword } = values
    changePassword({userId: userId, currentPassword:currentPassword, newPassword: newPassword})
    .then((response) => {
      console.log("in res");
      if(response.status === 200) {
        toast.success("Password updated succussfully")
        resetForm()
        }
      })
      .catch((error) => {
      console.log("in err");
        toast.error(error.message)
        console.log(err);
      })
  }

  const [isverifyEmailModal, setVerifyEmailModal] = useState(false)
  const verifyEmailPopup = () => {
    setVerifyEmailModal(!isverifyEmailModal)
  }
  
  const [isverifyEmailPswdModal, setVerifyEmailPswdModal] = useState(false)
  const verifyEmailPswdPopup = () => {
    setVerifyEmailPswdModal(!isverifyEmailPswdModal)
  }

  const [isForgotPswd, setForgotPswd] = useState(false)
  const handleForgotPswd = () => {
    setForgotPswd(!isForgotPswd)
  }

  const resetPasswordSubmit = (values, {resetForm}) => {
    console.log("values for reset", values);
    renewPassword(values)
      .then((response) => {
        toast.success(response?.data?.message)
        resetForm()
        handleForgotPswd()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className="ml-5">
      <div className="h-5/6 my-4 w-8/12 col-span-8 fixed   rounded-xl bg-white border:none  sm:px-8 ">
        <div className="pt-4">
          <h1 className="py-2 text-lg font-semibold">Account settings</h1>
          <div className='flex items-center justify-between gap-3 mt-4 rounded-md '>
            <div className="flex cursor-pointer">
              <img className="flex w-14  h-14 rounded-full bg-black" src={user.profileImg} alt=""/>
            </div>
            <div className="flex-1 flex-col w-auto ms-1 mb-0 cursor-pointer">
              <p className="text-lg font-semibold text-black truncate dark:text-white">{user.userName}</p>
              <Link to={'/profile'} className='text-xs font-semibold text-sky-500 truncate dark:text-white  hover:text-sky-600'>Edit Profile</Link>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-6" />
        <p className="py-2 text-sm font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600 text-sm">
            Your email address is <strong>{user.email}</strong>
          </p>
          <button 
            onClick={verifyEmailPopup}
            className="inline-flex text-sm font-semibold text-green-600 underline decoration-2">
            Change
          </button>
        </div>
        <hr className="mt-4 mb-6" />
        { !isForgotPswd && ( <div>
          <p className="py-2 text-sm font-semibold">Change Your Password</p>
          <Formik
            initialValues={pswdInitialValues}
            validationSchema={pswdValidationSchema}
            onSubmit={submit}
          >
            <Form>
              <div className="flex items-center">
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <div>
                    <label htmlFor="currentPassword">
                      <span className="text-gray-500 text-xs">Current Password</span>
                      <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="***********"
                        />
                      </div>
                      <div className="h-4 mt-1">
                        <ErrorMessage name="currentPassword" component="div" className="text-red-600 text-xs" />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="newPassword">
                      <span className="text-gray-500 text-xs">New Password</span>
                      <div className="relative max-w-60 flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          className="w-full max-w-60 flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="***********"
                        />
                      </div>
                      <div className="h-4 mt-1">
                        <ErrorMessage name="newPassword" component="div" className="text-red-600 text-xs" />
                      </div>
                    </label>
                  </div>
                </div>
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg className="mt-5 ml-2 h-6 w-6 cursor-pointer text-xs font-semibold text-gray-600 underline decoration-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 28 28">
                      <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                      <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                  ) : (
                    <svg className="mt-5 ml-2 h-6 w-6 cursor-pointer text-xs font-semibold text-gray-600 underline decoration-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 28 28">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                  )}
                </span>
              </div>
              <p className="mt-2 text-xs">
                Can't remember your current password.{" "}
                <button
                  onClick={verifyEmailPswdPopup}
                  type='button'
                  className="text-xs font-semibold text-sky-500 hover:text-sky-600 underline decoration-1"
                >
                  Forgot Password
                </button>
              </p>
              <button 
                type='submit'
                className="mt-4 rounded-lg text-xs bg-sky-500 hover:bg-sky-600 px-4 py-2 text-white">
                Save Password
              </button>
            </Form>
          </Formik>
        </div> )}

        { isForgotPswd && ( <div>
          <p className="py-2 text-sm font-semibold">Reset Your Password</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={resetPasswordSubmit}
          >
            <Form>
              <div className="flex items-center">
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <div>
                    <label htmlFor="password">
                      <span className="text-gray-500 text-xs">New Password</span>
                      <div className="relative max-w-60 flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="w-full max-w-60 flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="***********"
                        />
                      </div>
                      <div className="h-4 mt-1">
                        <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">
                      <span className="text-gray-500 text-xs">Confirm Password</span>
                      <div className="relative max-w-60 flex overflow-hidden rounded-md border-2 transition focus-within:border-green-600">
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className="w-full max-w-60 flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                          placeholder="***********"
                        />
                      </div>
                      <div className="h-4 mt-1">
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-xs" />
                      </div>
                    </label>
                  </div>
                </div>
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg className="mt-5 ml-2 h-6 w-6 cursor-pointer text-xs font-semibold text-gray-600 underline decoration-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 28 28">
                      <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                      <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                  ) : (
                    <svg className="mt-5 ml-2 h-6 w-6 cursor-pointer text-xs font-semibold text-gray-600 underline decoration-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 28 28">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                  )}
                </span>
              </div>
              <p className="mt-2 text-xs">
                Don't want to reset your password.{" "}
                <button
                  onClick={handleForgotPswd}
                  type='button'
                  className="text-xs font-semibold text-sky-500 hover:text-sky-600 underline decoration-1"
                >
                  Go back
                </button>
              </p>
              <button
                type='submit' 
                className="mt-4 rounded-lg text-xs bg-sky-500 hover:bg-sky-600 px-4 py-2 text-white">
                Reset Password
              </button>
            </Form>
          </Formik>
        </div> )}
        <hr className="mt-4 mb-4" />

        <div className="mb-6">
          <p className="py-2 text-sm font-semibold">Delete Account</p>
          <p className="inline-flex items-center text-xs rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2 text-xs">
            Make sure you have taken a backup of your account in case you ever
            need to get access to your data. We will completely wipe your data.
            There is no way to access your account after this action.
          </p>
          <button className="ml-auto mb-10 text-xs font-semibold text-rose-600 underline decoration-2">
            Continue with deletion
          </button>
        </div>
      </div>
      
        {isverifyEmailModal && <VerifyEmailForEmail onClose={verifyEmailPopup} user={user} /> }
        {isverifyEmailPswdModal && <VerifyEmailForPswd onClose={verifyEmailPswdPopup} handleForgotPswd={handleForgotPswd} /> }
      
    </div>
  )
}

export default More