import { createBrowserRouter } from "react-router-dom";
import Protect from "./protectedRoutes/protectedRoute";
import App from "../App";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Otp from "../pages/otpPage/otp";
import Profile from "../pages/profile/Profile";
import userHomePage from "../pages/homepage/userHomePage";

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
        element: <userHomePage />
      },
      {
        path: "/profile",
        element: <Profile />
      }
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
  }
])

export default appRouter