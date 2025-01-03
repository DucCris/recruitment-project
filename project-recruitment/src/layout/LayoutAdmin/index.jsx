import { useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./LayoutAdmin.scss";

import MenuSider from "./MenuSider";
import Header from "./Header";
const { Sider, Content } = Layout;

function LayoutAdmin() {
  const isLogin = useSelector((state) => state.loginReducer);
  console.log(isLogin);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout className="layoutAdmin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Sider
            className="layoutAdmin__sider"
            theme="light"
            collapsed={collapsed}
            breakpoint="lg"
            onBreakpoint={(e) => setCollapsed(e)}
          >
            <MenuSider />
          </Sider>
          <Content className="layoutAdmin__content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;
