import { createBrowserRouter } from "react-router-dom";
import Protect from "./protectedRoutes/protectedRoute";
import App from "../App";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Otp from "../pages/otpPage/otp";
import Profile from "../pages/profile/Profile";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";
import ForgotOtp from "../pages/otpPage/forgotOtp";
import RenewPassword from "../pages/forgotPassword/renewPassword";
import { adminLoginRouter, adminRouter } from "./adminRouter";
import HomePage from "../pages/userHomePage/HomePage";
import UserProfile from "../pages/userProfile/UserProfile";
import Chat from "../pages/chat/Chat";
import Notification from "../components/notification/Notification";
import More from "../components/more/More";
import Explore from "../pages/explore/Explore";
import Notifications from "../components/notification/Notifications";
import ProtectedVideoCall from "../components/chatComponent/ProtectedVideoCall";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <App/>  
      </Protect>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/user-profile/:userId",
        element: <UserProfile />,
      },
      {
        path: "/notifications",
        // element: <Notification/>
        element: <Notifications />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/more",
        element: <More />
      },
    ]
  },
  {
    path: "/chat",
    element: (
      <Protect>
        <Chat/>,
      </Protect>
    ),
  },
  {
    path: "/video-call/:roomId/:userId",
    element: <ProtectedVideoCall />
  },
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/forgot-otp",
    element: <ForgotOtp />
  },
  {
    path: "/renew-password",
    element: <RenewPassword />
  },

  adminRouter,
  adminLoginRouter,
])

export default appRouter