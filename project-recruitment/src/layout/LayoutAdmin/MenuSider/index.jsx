import {
  ContainerOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      label: (
        <Link className="text-decoration-none" to="/admin">
          Dashboard
        </Link>
      ),
      icon: <DashboardOutlined />,
      key: "db-1",
    },
    {
      label: (
        <Link className="text-decoration-none" to="/info-company">
          Information
        </Link>
      ),
      icon: <UserOutlined />,
      key: "inf-1",
    },
    {
      label: (
        <Link to="/job-manager" className="text-decoration-none">
          Manage Job
        </Link>
      ),
      icon: <UnorderedListOutlined />,
      key: "mj-1",
    },
    {
      label: (
        <Link to="cv-manage" className="text-decoration-none">
          Manage CV
        </Link>
      ),
      icon: <ContainerOutlined />,
      key: "mc-1",
    },
  ];
  return (
    <>
      <Menu mode="inline" items={items} defaultSelectedKeys={["db-1"]} />
    </>
  );
}
export default MenuSider;
