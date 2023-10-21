import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import trainService from "./trainMasterServices";

const initialState = {
  trains: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//? Create Train
export const createTrain = createAsyncThunk(
  "Train/create",
  async (trainData, thunkAPI) => {
    try {
      return await trainService.createTrain(trainData);
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

//? get trains
export const getAllTrain = createAsyncThunk(
  "Train/getAll",
  async (token, thunkAPI) => {
    try {
      return await trainService.getAllTrain(token);
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

// //? edit this for
// export const getAllTrain = createAsyncThunk(
//   "Train/getAll",
//   async (token, thunkAPI) => {
//     try {
//       return await trainService.getAllTrain(token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// ? delete Note
export const deleteTrain = createAsyncThunk(
  "note/delete",
  async (data, thunkAPI) => {
    try {
      return await trainService.deleteTrain(data);
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

//?update Train
export const updateTrain = createAsyncThunk(
  "train/update",
  async (trainData, thunkAPI) => {
    try {
      return await trainService.updateTrain(trainData);
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

export const trainSlice = createSlice({
  name: "train",
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
      .addCase(createTrain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trains.push(action.payload);
      })
      .addCase(createTrain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTrain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTrain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trains = action.payload;
      })
      .addCase(getAllTrain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTrain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trains = state.trains.filter(
          (train) => train._id !== action.payload._id
        );
      })
      .addCase(deleteTrain.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateTrain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trains.push(action.payload);
      })
      .addCase(updateTrain.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = trainSlice.actions;

export default trainSlice.reducer;
