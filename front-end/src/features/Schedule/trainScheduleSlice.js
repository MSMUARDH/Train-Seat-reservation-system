import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import scheduledetailService from "./trainScheduleServices";

const initialState = {
  trainSchedules: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTrainSchedule = createAsyncThunk(
  "trainschedule/create",
  async (scheduleData, thunkAPI) => {
    try {
      return await scheduledetailService.createTrainSchedule(scheduleData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllScheduleDetail = createAsyncThunk(
  "trainschedule/getAll",
  async (_, thunkAPI) => {
    try {
      return await scheduledetailService.getAllScheduleDetail();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//? get a single item
export const getScheduleDetailByRoute = createAsyncThunk(
  "trainschedule/getAll",
  async (routeId, thunkAPI) => {
    try {
      return await scheduledetailService.getScheduleDetailByRoute(routeId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ? delete Note
export const deleteTrainSchedule = createAsyncThunk(
  "trainschedule/delete",
  async (scheduleId, thunkAPI) => {
    try {
      return await scheduledetailService.deleteTrainSchedule(scheduleId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//?update
export const updateTrainSchedule = createAsyncThunk(
  "trainschedule/update",
  async (classData, thunkAPI) => {
    try {
      return await scheduledetailService.updateTrainSchedule(classData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const trainScheduleSlice = createSlice({
  name: "trainschedule",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrainSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrainSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trainSchedules.push(action.payload);
      })
      .addCase(createTrainSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(getAllScheduleDetail.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getAllScheduleDetail.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.trainSchedules = action.payload;
      // })
      // .addCase(getAllScheduleDetail.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
      .addCase(deleteTrainSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrainSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trainSchedules = state.trainSchedules.filter(
          (trainschedule) => trainschedule._id !== action.payload._id
        );
      })
      .addCase(deleteTrainSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateTrainSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrainSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trainSchedules.push(action.payload);
      })
      .addCase(updateTrainSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getScheduleDetailByRoute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScheduleDetailByRoute.fulfilled, (state, action) => {
        // console.log("fulfiled", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.trainSchedules = action.payload;
      })
      .addCase(getScheduleDetailByRoute.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = trainScheduleSlice.actions;

export default trainScheduleSlice.reducer;
