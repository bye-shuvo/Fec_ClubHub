import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./Overview.jsx";

const AdminDashboard = () => {
  const [sidebarTab, setSidebarTab] = useState("overview");
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  //UseEffect for enabling dark mode
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  useEffect(() => {
    if (!state?.accessToken) {
      navigate("/", { state: { triggerPopup: true } });
    }
  }, [state, navigate]);
  //RETURNING NULL FOR NO ACCESSTOKEN
  if (!state?.accessToken) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between font-all w-screen min-h-[100vh] dark:bg-charcoal bg-background -z-30 dark:text-white overflow-x-hidden">
        <Sidebar sidebarTab={sidebarTab} setSidebarTab={setSidebarTab} />
        {sidebarTab === "overview" && (
          <Overview data={state.presidentData} />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
