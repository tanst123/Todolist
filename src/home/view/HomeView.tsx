import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  GithubFilled,
} from "@ant-design/icons";
import "../style/style.scss";
import React, { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;

const arrLinks = [
  {
    key: 1,
    icon: <GithubFilled />,
    label: <Link to="/tiktok">Tiktok</Link>,
  },
  {
    key: 2,
    icon: <UnorderedListOutlined />,
    label: <Link to="/todolist">Todolist</Link>,
  },
  {
    key: 3,
    icon: <PlusCircleOutlined />,
    label: <Link to="/counter">Counter</Link>,
  },
];

interface Props{
  // children: JSX.Element 
  children: React.ReactNode
}

const HomeView:React.FC<Props> = ({children}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className="home-view">
      {/* <ul>
                {arrLinks.map((arrLink, index) => (
                    <li key={index}>
                         <Link to={arrLink.to}>{arrLink.label}</Link>
                    </li>
                ))}
            </ul> */}
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider collapsible collapsed={collapsed}>
          <Menu theme="dark" items={arrLinks} style={{ fontSize: "18px" }} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, backgroundColor: "#fff" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content className="home-view__content">{children}</Content>
          <Footer style={{ backgroundColor: "#fff" }}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomeView;
