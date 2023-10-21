import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pickupinfoService from "./pickupinfoServices";

const initialState = {
  pickupInfoDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPickupInfoDetail = createAsyncThunk(
  "pickupinfo/create",
  async (pickupInfo, thunkAPI) => {
    try {
      return await pickupinfoService.createPickupInfoDetail(pickupInfo);
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
export const getAllPickupInfoByRoute = createAsyncThunk(
  "pickupinfo/getAll",
  async (routeId, thunkAPI) => {
    try {
      return await pickupinfoService.getAllPickupInfoByRoute(routeId);
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
// export const getNote = createAsyncThunk(
//   "note/getone",
//   async (noteId, thunkAPI) => {
//     try {
//       return await notesService.getNote(noteId);
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
export const deletePickupInfo = createAsyncThunk(
  "pickupinfo/delete",
  async (pickupInfoId, thunkAPI) => {
    try {
      return await pickupinfoService.deletePickupInfo(pickupInfoId);
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
export const updatePicupInfo = createAsyncThunk(
  "pickupinfo/update",
  async (pickupInfo, thunkAPI) => {
    try {
      return await pickupinfoService.updatePicupInfo(pickupInfo);
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

export const pickupInfoSlice = createSlice({
  name: "pickupinfodetail",
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
      .addCase(createPickupInfoDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPickupInfoDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pickupInfoDetails.push(action.payload);
      })
      .addCase(createPickupInfoDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPickupInfoByRoute.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPickupInfoByRoute.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pickupInfoDetails = action.payload;
      })
      .addCase(getAllPickupInfoByRoute.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePickupInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePickupInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload._id);
        state.pickupInfoDetails = state.pickupInfoDetails.filter(
          (pickupinfo) => pickupinfo._id !== action.payload._id
        );
      })
      .addCase(deletePickupInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updatePicupInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePicupInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pickupInfoDetails.push(action.payload);
      })
      .addCase(updatePicupInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = pickupInfoSlice.actions;

export default pickupInfoSlice.reducer;
