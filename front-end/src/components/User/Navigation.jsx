import React from "react";
import { Button, Layout, Menu } from "antd";
const { Header, Content } = Layout;
import logo from "../../assets/img/logo.png";
import "../User/HomeCarousel.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/Users/userSlice";

const App = ({ selectedPage }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("selectedPage from Contact", selectedPage);
  return (
    <Layout className="layout">
      <Header
        style={{ display: "flex", justifyContent: "space-between" }}
        className="fixed-header"
      >
        <img src={logo} alt="Logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[`${selectedPage}`]}
          // defaultSelectedKeys={["home"]}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <Menu.Item key="home">
            <Link to="/user/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="history">
            <Link to="/user/railway-history">History</Link>
          </Menu.Item>
          <Menu.Item key="services">
            <Link to="/user/railway-services">Services</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/user/about">About</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/user/contacts">Contact</Link>
          </Menu.Item>
          <Menu.Item key="terms">
            <Link to="/user/railway-terms">Terms</Link>
          </Menu.Item>

          {user && (
            <Menu.Item key="profile">
              <Link to="/user/profile">Hi ! {user.name}</Link>
            </Menu.Item>
          )}

          {user && (
            <Menu.Item
              onClick={() => {
                localStorage.clear();
                navigate("/login");
                dispatch(setUser(null));
              }}
              key="login"
            >
              {/* <Button color="primary" size="large"> */}
              <Link>Logout</Link>
              {/* </Button> */}
            </Menu.Item>
          )}

          {/* <Menu.Item key="signup">
            <Link to="/login">Signup</Link>
          </Menu.Item> */}
        </Menu>
      </Header>
    </Layout>
  );
};

export default App;

// !Old code
// import React, { useState } from "react";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
// import Home from "../../pages/Home";
// const { Header, Content, Footer } = Layout;

// const Navigation = () => {
//   const [key, setKey] = useState(1);

//   const navigationItem = ["Home", "About", "some"];
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout className="layout">
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <div className="demo-logo" />
//         <Menu
//           onSelect={(e) => setKey(e.key)}
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={["1"]}
//           items={new Array(3).fill(null).map((_, index) => {
//             const key = index + 1;
//             return {
//               key,
//               label: navigationItem[index],
//             };
//           })}
//         />
//       </Header>
//       <Content
//         style={{
//           padding: "0 50px",
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: "16px 0",
//           }}
//         >
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <div
//           className="site-layout-content"
//           style={{
//             background: colorBgContainer,
//           }}
//         >
//           {key == 1 && <Home />}
//           {/* { key ==2 && } */}
//           {/* { key ==2 && } */}

//           {/* { key ==2 && } */}

//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: "center",
//         }}
//       >
//         Ant Design ©2023 Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };
// export default Navigation;
