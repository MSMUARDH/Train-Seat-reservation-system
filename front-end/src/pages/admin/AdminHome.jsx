import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrain, createTrain } from "../../features/Train/trainSlice";

import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

// components
import TrainDetailTable from "../../components/TrainDetailTable";
import TrainForm from "../../components/TrainForm";
import TrainDetailPage from "./TrainDetailPage";
import AllClassDetailPage from "./AllClassDetailPage";
import AllRouteDetailPage from "./AllRouteDetailPage";
import AllScheduleDetailPage from "./AllScheduleDetailPage";
import IncomeReport from "./IncomeReport";
import MonthlyIncomeReport from "./MonthlyIncomeReport";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";



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
    getItem("Train Table", "1"),
    getItem("All Classdetails", "2"),
    getItem("All Route Details", "3"),
    getItem("All  Schedule Details", "4"),
  ]),
  getItem("Reports", "sub2", <FileOutlined />, [
    getItem("Income by train", "5"),
    getItem("Monthly Income Report", "6"),
  ]),
  getItem("Logout", "7"),
];
const AdminHome = () => {
  const navigate = useNavigate();
  const { trains } = useSelector((state) => state.Trains);
  // const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [key, setKey] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);

  // const getTrainDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/admin/get-all-train-detail"
  //     );

  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   dispatch(getAllTrain());
  // }, [key]);

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
          // onClick={(e) => console.log(e.keyPath[0])}
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
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* //!testing child to parent */}
            {/* {key == 1 && <TrainDetailTable setKey={setKey} trains={trains} />} */}

            {key == 1 && <TrainDetailPage />}
            {/* {key == 2 && <TrainForm />} */}
            {key == 2 && <AllClassDetailPage />}
            {key == 3 && <AllRouteDetailPage />}
            {key == 4 && <AllScheduleDetailPage />}
            {key == 5 && <IncomeReport />}
            {key == 6 && <MonthlyIncomeReport />}
            {key == 7 && <Logout />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Railway Department ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminHome;
