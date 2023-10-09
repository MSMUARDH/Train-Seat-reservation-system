import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

// components
import TrainDetailTable from "../../components/TrainDetailTable";
import TrainForm from "../../components/TrainForm";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  //   getItem("Train Table ", "1", <PieChartOutlined />),
  //   getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Train", "sub1", <UserOutlined />, [
    getItem("Show Table", "1"),
    getItem("Create Train", "2"),
    getItem("Route Details", "3"),
    getItem("Add Schedule", "4"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "5"),
    getItem("Team 2", "6"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const AdminHome = () => {
  const [childData, setChildData] = useState("");

  //! Function to receive data from the child component
  const receiveDataFromChild = (data) => {
    setChildData(data);
  };

  const [key, setKey] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);

  const getTrainDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-all-train-detail"
      );

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // getTrainDetails();

  useEffect(() => {
    getTrainDetails();
  }, [key]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
          onClick={(e) => setKey(e.keyPath[0])}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* //!testing child to parent */}
            {key == 1 && (
              <TrainDetailTable
                setKey={setKey}
                // sendDataToParent={receiveDataFromChild}
                data={data}
              />
            )}
            {key == 2 && <TrainForm />}
            {key == 3 && <h1>this is key 3</h1>}
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
    </Layout>
  );
};
export default AdminHome;
