import React from "react";
import { Layout, Menu } from "antd";
const { Header, Content } = Layout;
import logo from "../../assets/img/logo.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={logo} alt="Logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <Menu.Item key="home">
            <Link to="/user/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="signup">
            <Link to="/signup">Signup</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default App;
