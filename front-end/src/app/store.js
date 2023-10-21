import { configureStore } from "@reduxjs/toolkit";
import trainsReducer from "../features/Train/trainSlice";
import classReducer from "../features/ClassDetail/classdetailSlice";
import routeReducer from "../features/Route/routeDetailSlice";
import trainSheduleReducer from "../features/Schedule/trainScheduleSlice";
import pickupInfoReducer from "../features/Pickupinfo/pickupinfoSlice";

import { userSlice } from "../features/Users/userSlice";
import { alertsSlice } from "../features/Alert/alertSlice";

export const store = configureStore({
  reducer: {
    Trains: trainsReducer,
    Classdetails: classReducer,
    Routedetails: routeReducer,
    Scheduledetails: trainSheduleReducer,
    Pickupinfodetails: pickupInfoReducer,
    user: userSlice.reducer,
    alerts: alertsSlice.reducer,
  },
});
