import { apiCall } from "./apiCalls";
import { connectionUrls, postUrls, userUrls } from "../endPoints";

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

// renew password

export const renewPassword = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.resetPassword, userData)
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

// google authentication

export const googleAuthenticate = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("userdata in api method", userData)
      apiCall("post", userUrls.googleAuth, userData)
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

// Add new post
export const addPost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Postdata in api", postData);
      apiCall("post", postUrls.addPost, postData)
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  })
} 

// get user post
export const getUserPost = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("in userpost apicall");
      const url = `${postUrls.getUserPosts}/${userId}`
      apiCall("get", url, null)
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

// get all posts
export const getAllPosts = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log("userid in getallpost",userId);
      apiCall("post", postUrls.getAllPosts, userId)
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

// delete post
export const deletePost = (postData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", postUrls.deletePost, postData)
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

// user edit profile
export const editProfile = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("userdata in api method", userData)
      apiCall("post", userUrls.editProfile, userData)
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

// get user suggustions to miniprofile
export const getUserSuggestions = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.userSuggestions, userId)
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

export const getUserSearch = (searchQuery) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.userSearch, searchQuery)
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

// get user details
export const getUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("getuserdetails", userId);
      apiCall("get", userUrls.getUserDetails+`/${userId}`)
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

// get user connections
export const getUserConnection = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.getConnection, userId)
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

// follow user
export const followUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.follow, data)
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

// unfollow user
export const unFollowUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.unFollow, data)
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

// reject follow request
export const rejectFollowRequest = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.rejectRequest, data)
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

// accept follow request
export const acceptFollowRequest = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.acceptRequest, data)
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