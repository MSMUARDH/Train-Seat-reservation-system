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
import AvailabilityPage from "./pages/User/AvailabilityPage";
import ClassSelection from "./pages/User/ClassSelectionPage";
import ClassSelectionPage from "./pages/User/ClassSelectionPage";
import { TrainProvider } from "./context/userSlectedTrainDetails/TrainContext";
import SeatSelectionPage from "./pages/User/SeatSelectionPage";
import SeatselectionmodelTestPage1 from "./pages/User/SeatselectionmodelTestPage1";
import Payment from "./pages/User/Payment";
import SeatselectionmodelTestPage2 from "./pages/User/SeatselectionmodelTestPage2";

// newly added routes 11/05
import RailwayHistoryPage from "./pages/User/RailwayHistoryPage";
import RailwayServicesPage from "./pages/User/RailwayServicesPage";
import ContactPage from "./pages/User/ContactPage";
import TermssndConditionsPage from "./pages/User/TermssndConditionsPage";
import UserProfile from "./pages/User/UserProfile";
import TrainScheduleCheckPage from "./pages/User/TrainScheduleCheckPage";

// import HomePage from "./pages/User/HomePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<HandleAuthRedirect />}>
          {/* <Route
            path="/user/home"
            element={<HomePage />}
            errorElement={<Error />}
          /> */}
        </Route>
        <Route path="/admin" element={<AdminHome />} errorElement={<Error />} />
        {/* /////////////////////////////////////////////////////////// */}
        <Route path="/user/home" element={<Home />} errorElement={<Error />} />
        {/* RailwayHistory */}
        <Route
          path="/user/railway-history"
          element={<RailwayHistoryPage />}
          errorElement={<Error />}
        />
        <Route
          path="/user/railway-services"
          element={<RailwayServicesPage />}
          errorElement={<Error />}
        />
        <Route
          path="/user/contacts"
          element={<ContactPage />}
          errorElement={<Error />}
        />
        <Route
          path="/user/railway-terms"
          element={<TermssndConditionsPage />}
          errorElement={<Error />}
        />
        <Route
          path="/user/profile"
          element={<UserProfile />}
          errorElement={<Error />}
        />
        <Route
          path="/user/profile"
          element={<UserProfile />}
          errorElement={<Error />}
        />
        <Route
          path="/user/train-schedule"
          element={<TrainScheduleCheckPage />}
          errorElement={<Error />}
        />
        {/* ///////////////////////////////////////////// */}
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
        <Route
          exact
          path="/user/check-train-availability"
          element={<AvailabilityPage />}
        />
        <Route
          exact
          path="/user/select-train-class/:trainid/:routeid"
          element={<ClassSelectionPage />}
        />
        <Route
          exact
          path="/user/seat-selection"
          element={<SeatSelectionPage />}
        />
        //! below route is under the testing
        <Route
          exact
          path="/user/test-seat-selection1"
          element={<SeatselectionmodelTestPage1 />}
        />
        <Route
          exact
          path="/user/test-seat-selection2"
          element={<SeatselectionmodelTestPage2 />}
        />
        //! below route is under the testing
        <Route exact path="/user/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <ConfigProvider theme={antThemeConfig}>
      <TrainProvider>
        <AppDataProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AppDataProvider>
      </TrainProvider>
    </ConfigProvider>
  );
}

export default App;
