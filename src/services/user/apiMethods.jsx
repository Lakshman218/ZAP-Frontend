import { apiCall } from "./apiCalls";
import { userUrls } from "../endPoints";

// User Register

export const postRegister = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.register, userData)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      resolve({staus: 500, message: "Something wrong"})
    }
  })
}

// OTP verification
export const postOTP = (otp) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.registerOtp, otp)
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    } catch (error) {
      resolve({status:500, message: "something wrong"})
    }
  })
} 

// resent otp
export const postResendOTP = (email) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("postresendotp");
      apiCall("post", userUrls.resendOtp, email)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      resolve({status: 500, message: "Something wrong"})
    }
  })
}

// login

export const postLogin = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      resolve({status: 500, message: "Something wrong"})
    }
  })
}

// forgotOTP

export const forgotOTP = (otp) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall('post', userUrls.forgotOtp, otp)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      resolve({status: 500, message: "Something wrong"})
    }
  })
}

// forgot password

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall('post',userUrls.forgotPassword, email)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      resolve({status: 500, message: "Something wrong"})
    }
  })
}