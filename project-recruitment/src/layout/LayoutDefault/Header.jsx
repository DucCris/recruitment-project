import { Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../helper/cookie";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
function Header() {
  const token = getCookie("token");

  const navLinkActive = (e) => {
    return e.isActive ? " layoutDefault__navbar text-white " : "text-dark";
  };
  return (
    <>
      <header className="layoutDefault__header">
        <div>
          <Link to="/" className="layoutDefault__logo text-white ">
            ITerCV
          </Link>
        </div>
        <div className="layoutDefault__navbar">
          <div>
            <NavLink to="/" className={navLinkActive}>
              Home
            </NavLink>
          </div>
          {token && (
            <Button icon={<UserOutlined />}>
              <NavLink to="/admin" className="text-decoration-none">
                Admin
              </NavLink>
            </Button>
          )}
          {token ? (
            <>
              <Button type="primary" icon={<LogoutOutlined />}>
                <NavLink
                  className="text-decoration-none text-white"
                  to="/logout"
                >
                  Logout
                </NavLink>
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" icon={<LoginOutlined />}>
                <NavLink
                  to="/login"
                  className="text-decoration-none"
                  style={{ color: "#fff" }}
                >
                  Login
                </NavLink>
              </Button>
              <Button>
                <NavLink to="/register" className="text-decoration-none">
                  Register
                </NavLink>
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
export default Header;
