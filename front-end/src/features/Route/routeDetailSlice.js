import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import routedetailService from "./routeDetailServices";

const initialState = {
  routeDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createRouteDetails = createAsyncThunk(
  "route/create",
  async (routeData, thunkAPI) => {
    try {
      return await routedetailService.createRouteDetails(routeData);
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

//? get notes
export const getAllRoutedetail = createAsyncThunk(
  "route/getAll",
  async (token, thunkAPI) => {
    try {
      return await routedetailService.getAllRoutedetail(token);
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

//! get  route detail by train id
export const getSingleRouteDetailByTrain = createAsyncThunk(
  "route/getAll",
  async (trainId, thunkAPI) => {
    try {
      return await routedetailService.getSingleRouteDetailByTrain(trainId);
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
export const deleteRouteDetail = createAsyncThunk(
  "route/delete",
  async (trainId, thunkAPI) => {
    try {
      return await routedetailService.deleteRouteDetail(trainId);
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

//?update Note
export const updateRouteDetail = createAsyncThunk(
  "route/update",
  async (classData, thunkAPI) => {
    try {
      return await routedetailService.updateRouteDetail(classData);
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

export const routeDetailSlice = createSlice({
  name: "routedetails",
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
      .addCase(createRouteDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRouteDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        console.log("payload", action.payload.savedOriginalRoute);

        for (let i = 0; i < 2; i++) {
          i == 0
            ? state.routeDetails.push(action.payload.savedOriginalRoute)
            : state.routeDetails.push(action.payload.savedReverseRoute);
        }
      })
      .addCase(createRouteDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSingleRouteDetailByTrain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRouteDetailByTrain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.routeDetails = action.payload;
      })
      .addCase(getSingleRouteDetailByTrain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // .addCase(getAllRoutedetail.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getAllRoutedetail.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.routeDetails = action.payload;
      // })
      // .addCase(getAllRoutedetail.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })

      .addCase(deleteRouteDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRouteDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload.TrainId);
        state.routeDetails = state.routeDetails.filter(
          (routedetail) => routedetail.TrainId !== action.payload.TrainId
        );
      })
      .addCase(deleteRouteDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateRouteDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRouteDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.routeDetails.push(action.payload);
      })
      .addCase(updateRouteDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = routeDetailSlice.actions;

export default routeDetailSlice.reducer;
