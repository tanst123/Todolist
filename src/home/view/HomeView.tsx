import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  GithubFilled,
  HomeFilled
} from "@ant-design/icons";
import "../style/style.scss";
import React, { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;
interface menuType  {
  key: string,
  icon: React.ReactNode,
  label: string
}
const arrLinks = [
  {
    key: "",
    icon: <HomeFilled />,
    label: "Home",
  },
  {
    key: "tiktok",
    icon: <GithubFilled />,
    label: "Tiktok",
  },
 
  {
    key: "todolist",
    icon: <UnorderedListOutlined />,
    label: "Todolist",
  },
  {
    key: "counter",
    icon: <PlusCircleOutlined />,
    label: "Counter",
  },
];

interface Props{
  // children: JSX.Element 
  children: React.ReactNode
}

const HomeView:React.FC<Props> = ({children}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigative = useNavigate()
  const handleClick:any= (item: menuType) => {
      navigative(`/${item.key}`)
  }
  return (
    <div className="home-view">
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider collapsible collapsed={collapsed}>
          <Menu theme="dark" onClick={handleClick} items={arrLinks} style={{ fontSize: "18px" }} />
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
