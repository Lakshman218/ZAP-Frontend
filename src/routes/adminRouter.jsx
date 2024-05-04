import Admin from "../pages/admin/Admin";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AdminLogin from "../pages/admin/login/adminLogin";

export const adminRouter = {
  path: "/admin",
  element: <Admin />,
  children: [
    {
      path: "/admin/",
      element: <AdminDashboard />
    }
  ]
}

export const adminLoginRouter = {
  path: "/admin/login",
  element: <AdminLogin />
}