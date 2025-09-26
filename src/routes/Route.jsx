import { createBrowserRouter } from "react-router-dom";
import Club from "../components/club/Club.jsx";
import Home from "../components/Home.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Club />,
    path: "/clubs/:name",
  },
  {
    element: <AdminDashboard />,
    path: "/admin/dashboard",
  },
]);

export default router;
