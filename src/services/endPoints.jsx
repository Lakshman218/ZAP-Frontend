export const userUrls = {
  register: "/register",
  registerOtp: "/verifyOTP",
  resendOtp: "/resendOTP",
  login: "/login",
  forgotPassword: "/forgot-password",
  forgotOtp: "/forgot-otp",
  resetPassword: "/reset-password",
  googleAuth: "/google-auth",
  getUserDetails: "/user-details",
  editProfile: "/edit-profile",
  userSuggestions: "/user-suggestions",
  userSearch: "/user-search"
}

export const postUrls = {
  getUserPosts: "/post/get-user-post",
  getAllPosts: "/post/get-post",
  addPost: "/post/add-post",
  editPost: "/post/edit-post",
  deletePost: "/post/delete-post",
}

export const connectionUrls = {
  follow: "/connection/follow",
  unFollow: "/connection/unFollow",
  acceptRequest: "/connection/accept-request",
  rejectRequest: "/connection/reject-request",
  requestedUsers: "/connection//get-requested-users",
  getConnection: "/connection/get-connection",
}

export const adminUrls = {
  login: "/admin/login",
}