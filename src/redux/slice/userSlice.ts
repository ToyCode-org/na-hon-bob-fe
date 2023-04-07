import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserAll = createAsyncThunk(
  "GET_ALL",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      return thunkAPI.fulfillWithValue("data");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getUserOne = createAsyncThunk(
  "GET_ONE",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      return thunkAPI.fulfillWithValue("data");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addUser = createAsyncThunk(
  "POST_ADD",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      return thunkAPI.fulfillWithValue("data");
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  },
);

export const updateUser = createAsyncThunk(
  "POST_UPDATAE",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      return thunkAPI.fulfillWithValue("data");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "DELETE_ONE",
  async (payload, thunkAPI) => {
    try {
      // await delete request API
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  user: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserAll.fulfilled, (state, action) => {
      //   state.user = action.payload;
    });
    builder.addCase(getUserOne.fulfilled, (state, action) => {
      //   state.user = action.payload;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      // state.user.unshift(action.payload);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      //   const newState = state.user.map((item) =>
      //     action.meta.arg.id === item.id
      //       ? {
      //           ...action.payload,
      //         }
      //       : item
      //   );
      //   state.user = newState;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      //   const newState = state.user.filter(
      //     (item) => item.id !== action.payload
      //   );
      //   state.user = newState;
    });
  },
});

export default userSlice.reducer;
