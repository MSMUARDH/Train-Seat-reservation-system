import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Home from "../../pages/Home";
const { Header, Content, Footer } = Layout;

const Navigation = () => {
  const [key, setKey] = useState(1);

  const navigationItem = ["Home", "About", "some"];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          onSelect={(e) => setKey(e.key)}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: navigationItem[index],
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {key == 1 && <Home />}
          {/* { key ==2 && } */}
          {/* { key ==2 && } */}

          {/* { key ==2 && } */}
          
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default Navigation;

// import React from "react";
// import { Tabs } from "antd";
// import Home from "../../pages/Home";
// const Navigation = () => (
//   <Tabs
//     defaultActiveKey="1"
//     centered
//     items={new Array(3).fill(null).map((_, i) => {
//       const id = String(i + 1);
//       return {
//         label: `Tab ${id}`,
//         key: id,
//         children: id == 3 && <Home />,
//       };
//     })}
//   />
// );
// export default Navigation;
