import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPostAll = createAsyncThunk(
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

export const getPostOne = createAsyncThunk(
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

export const addPost = createAsyncThunk(
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

export const updatePost = createAsyncThunk(
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

export const deletePost = createAsyncThunk(
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
  post: [],
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostAll.fulfilled, (state, action) => {
      //   state.post = action.payload;
    });
    builder.addCase(getPostOne.fulfilled, (state, action) => {
      //   state.post = action.payload;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      // state.post.unshift(action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      //   const newState = state.post.map(item =>
      //     action.meta.arg.id === item.id
      //       ? {
      //           ...action.payload,
      //         }
      //       : item,
      //   );
      //   state.post = newState;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      //   const newState = state.post.filter(item => item.id !== action.payload);
      //   state.post = newState;
    });
  },
});

export default postSlice.reducer;
