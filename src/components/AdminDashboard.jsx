import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (!state?.accessToken) {
      navigate("/", { state: { triggerPopup: true } });
    }
  }, [state, navigate]);

  //RETURNING NULL FOR NO ACCESSTOKEN
  if (!state?.accessToken) {
    return null;
  }

  return <div>This is a admin page</div>;
};

export default AdminDashboard;
