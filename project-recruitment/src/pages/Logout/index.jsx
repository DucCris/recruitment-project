import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helper/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../action/actionReducer";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookies();
  useEffect(() => {
    navigate("/login");
    dispatch(checkLogin(false));
  }, []);
  return <></>;
}
export default Logout;
