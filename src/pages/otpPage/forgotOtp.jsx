import React, { useRef, useState } from 'react'
import otpImg from '../../../public/images/otpImg.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { forgotOTP, postResendOTP } from '../../services/user/apiMethods'


function ForgotOtp() {
  const navigate = useNavigate()
  const [getOtp, setOtp] = useState("")
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleResendOTP = () => {
    postResendOTP({email: email})
      .then((response) => {
        toast.success("OTP has been resend to" + response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otp = getOtp || ""
    console.log("otp:", otp );
    if(otp.trim().length !==4 || otp == "") {
      toast.error("invalid OTP")
      return
    }

    forgotOTP({otp: otp}) 
      .then((response) => {
        console.log("In response");
        const data = response.data
        if(response.status == 200) {
          toast.success(data.message)
          navigate("/renew-password")
        } else {
          toast.error(data.message)
        }
      })
      .catch((error) => {
        toast.error(error?.message)
      })
  }

  return (
    <div className='flex  justify-center h-screen bg-white'>
      {/* left side */}
      <div className='flex items-center justify-center md:w-1/2 flex-col md:flex-row'>
        <div className='max-w-md w-full p-8 shadow-lg'>
          <h2 className='text-2xl font-semibold text-start mb-2'>Enter Your OTP</h2>
          <h2 className=' text-start mb-6'>OTP has been send to your email</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <input type="text" 
                value={getOtp}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-xl py-2 px-2 text-2xl text-center focus:outline-none focus:border-blue-500"
                autoComplete="off'
              />
            </div>
            <div className='flex px-2 items-center justify-between mb-4'>
              <div className='w-full'>
                <button 
                onClick={handleResendOTP}
                className='w-6/12 hover:font-semibold hover:shadow-md border py-1.5 px-4 rounded'>
                  Resend OTP
                </button>
              </div>
            </div>
            <button 
            type='submit'
            className='w-full bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline'
            >Verify</button>
          </form>
        </div>
      </div>
      {/* right side */}
      <div className='hidden md:flex md:w-1/2 items-center bg-white'>
        <div className='p-20'>
          <img className='w-full p-20' src={otpImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default ForgotOtp