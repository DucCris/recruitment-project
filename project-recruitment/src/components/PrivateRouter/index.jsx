import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helper/cookie";

function PrivateRouter() {
  const isLogin = getCookie("status");
  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}
export default PrivateRouter;
