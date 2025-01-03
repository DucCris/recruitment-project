import logoAdmin from "../../image/logoAdmin.png";
import logoFold from "../../image/logo-fold.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
function Header(props) {
  const { collapsed, setCollapsed } = props;
  return (
    <>
      {" "}
      <header className="layoutAdmin__header">
        <div
          className={
            "layoutAdmin__logo " + (collapsed && "layoutAdmin__logo--collapsed")
          }
        >
          <img src={collapsed ? logoFold : logoAdmin} />
        </div>
        <div className="layoutAdmin__nav">
          <div
            className="layoutAdmin__nav-left"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div className="layoutAdmin__nav-right">
            <Link to="/">
              <Button className="layoutAdmin__nav-home" icon={<HomeOutlined />}>
                Home
              </Button>
            </Link>
            <Link to="/logout">
              <Button
                className="layoutAdmin__nav-logout"
                icon={<LogoutOutlined />}
              >
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
