import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import classdetailService from "./classdetailServices";

const initialState = {
  classdetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//? Create Class Details
export const createClassDetails = createAsyncThunk(
  "class/create",
  async (classData, thunkAPI) => {
    try {
      return await classdetailService.createClassDetail(classData);
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
export const getAllClassDetail = createAsyncThunk(
  "class/getAll",
  async (_, thunkAPI) => {
    try {
      return await classdetailService.getAllClassDetail();
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

//? get a single
export const getSingleclassDetailByTrain = createAsyncThunk(
  "class/getone",
  async (trainId, thunkAPI) => {
    try {
      return await classdetailService.getSingleclassDetailByTrain(trainId);
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
export const deleteClassDetail = createAsyncThunk(
  "class/delete",
  async (data, thunkAPI) => {
    try {
      return await classdetailService.deleteClassDetail(data);
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
export const updateClassDetail = createAsyncThunk(
  "class/update",
  async (classData, thunkAPI) => {
    try {
      return await classdetailService.updateClassDetail(classData);
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

export const classDetailSlice = createSlice({
  name: "classdetail",
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
      .addCase(createClassDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClassDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classdetails.push(action.payload);
      })
      .addCase(createClassDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllClassDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClassDetail.fulfilled, (state, action) => {
        // console.log("fulfiled", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.classdetails = action.payload;
      })
      .addCase(getAllClassDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteClassDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClassDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload._id);
        state.classdetails = state.classdetails.filter(
          (classdetail) => classdetail._id !== action.payload._id
        );
      })
      .addCase(deleteClassDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateClassDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateClassDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classdetails.push(action.payload);
      })
      .addCase(updateClassDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleclassDetailByTrain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleclassDetailByTrain.fulfilled, (state, action) => {
        // console.log("fulfiled", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.classdetails = action.payload;
      })
      .addCase(getSingleclassDetailByTrain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = classDetailSlice.actions;

export default classDetailSlice.reducer;
