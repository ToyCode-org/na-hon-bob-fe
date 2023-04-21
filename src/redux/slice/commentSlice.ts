import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCommentAll = createAsyncThunk(
  "GET_ALL",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      //   return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCommentOne = createAsyncThunk(
  "GET_ONE",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      //   return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addComment = createAsyncThunk(
  "POST_ADD",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      //   return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  },
);

export const updateComment = createAsyncThunk(
  "POST_UPDATAE",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
      //   return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteComment = createAsyncThunk(
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
  comment: [],
  isLoading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // builder.addCase(getCommentAll.fulfilled, (state, action) => {
    //   state.comment = action.payload;
    // });
    // builder.addCase(getCommentOne.fulfilled, (state, action) => {
    //   state.comment = action.payload;
    // });
    // builder.addCase(addComment.fulfilled, (state, action) => {
    //   // state.comment.unshift(action.payload);
    // });
    // builder.addCase(updateComment.fulfilled, (state, action) => {
    //   const newState = state.comment.map((item) =>
    //     action.meta.arg.id === item.id
    //       ? {
    //           ...action.payload,
    //         }
    //       : item
    //   );
    //   state.comment = newState;
    // });
    // builder.addCase(deleteComment.fulfilled, (state, action) => {
    //   const newState = state.comment.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   state.comment = newState;
    // });
  },
});

export default commentSlice.reducer;
