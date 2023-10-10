import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { antThemeConfig } from "../antThemeConfig";

// Context API
import AppDataProvider from "./context/provider/AppDataProvider";
import AuthProvider from "./context/provider/AuthProvider";

// Redirect
import HandleAuthRedirect from "./auth/HandleAuthRedirect";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminHome from "./pages/admin/AdminHome";
import ClassDetailPage from "./pages/admin/ClassDetailPage";
import RouteDetailPage from "./pages/admin/RouteDetailPage";
import TrainScheduleTable from "./pages/admin/TrainSchedulePage";
import TrainSchedulePage from "./pages/admin/TrainSchedulePage";
import PickupInfoPage from "./pages/admin/PickupInfoPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<HandleAuthRedirect />}>
          <Route path="/" element={<Home />} errorElement={<Error />} />
        </Route>
        <Route path="/admin" element={<AdminHome />} errorElement={<Error />} />

        {/* <Route element={<HandleAuthRedirect />}>
          <Route
            path="/admin"
            element={<AdminHome />}
            errorElement={<Error />}
          />
        </Route> */}
        {/* admin/class-detail/64bd0a8c0b03b0e076514cba */}

        <Route path="/login" element={<Login />} errorElement={<Error />} />
        <Route
          path="/admin/class-detail/:trainid"
          element={<ClassDetailPage />}
        />

        <Route
          exact
          path="/admin/route-detail/:trainid"
          element={<RouteDetailPage />}
        />

        <Route
          exact
          path="/admin/schedule-detail/:trainid/:routeid"
          element={<TrainSchedulePage />}
        />

        <Route
          exact
          path="/admin/pickup-info/:trainid/:routeid"
          element={<PickupInfoPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <ConfigProvider theme={antThemeConfig}>
      <AppDataProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AppDataProvider>
    </ConfigProvider>
  );
}

export default App;
