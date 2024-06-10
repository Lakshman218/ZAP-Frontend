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
  getEditPost: "/post/get-edit-post",
  addPost: "/post/add-post",
  editPost: "/post/edit-post",
  deletePost: "/post/delete-post",
  savePost: "post/save-post",
  getSavedPosts: "post/user-saved-post",
  reportPost: "/post/report-post",
  likePost: "/post/like-post",
  getAllPostComments: "/post/get-post-comments",
  addComment: "/post/add-comment",
  replyComment: "/post/reply-comment",
  deleteComment: "/post/delete-post-comment",
  deleteReplyComment: "/post/delete-post-replyComment",
  commentsCount: "/post/get-comments-count",
  handleComment: "/post/handle-comment",
  handleLike: "/post/handle-like",
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
  userBlock: "/admin/user-block",
  userList: "/admin/get-users",
  postList: "/admin/get-posts",
  reportList: "/admin/get-reports",
  postBlock: "/admin/post-block",
  getDetails: "/admin/get-details"
}