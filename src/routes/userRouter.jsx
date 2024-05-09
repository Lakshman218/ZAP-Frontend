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
      
    ]
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