import { postAPI } from "@/api/api";
import { Post, UpdateDispatch, postFormData } from "@/components/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPostAll = createAsyncThunk(
  "GET_ALL_POST",
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await postAPI.getAllPost(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addPost = createAsyncThunk(
  "POST_ADD",
  async (payload: postFormData, thunkAPI) => {
    try {
      const { data } = await postAPI.createPost(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  },
);

export const updatePost = createAsyncThunk(
  "POST_UPDATAE",
  async (payload: UpdateDispatch, thunkAPI) => {
    try {
      const { data } = await postAPI.updatePost(
        payload.post_id,
        payload.formData,
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deletePost = createAsyncThunk(
  "DELETE_ONE_POST",
  async (payload: number, thunkAPI) => {
    try {
      await postAPI.deletePost(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface InitalState {
  post: Post[];
  isLoading: boolean;
  error: null | string;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}

/* InitialState */
// data, isLoading, error로 상태관리
const initialState: InitalState = {
  post: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  hasNextPage: true,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostAll.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPostAll.fulfilled, (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.hasNextPage = state.page < state.totalPages;
      state.page += 1;
      state.post = state.post.concat(action.payload.data);
      state.isLoading = false;
    });
    builder.addCase(addPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.post.unshift(action.payload);
      state.isLoading = false;
    });
    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const newState = state.post.map(post =>
        post.post_id === action.payload.post_id
          ? {
              ...post,
              thumbnail: post.thumbnail,
              title: post.title,
            }
          : post,
      );
      state.post = newState;
      state.isLoading = false;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const newState = state.post.filter(
        post => post.post_id !== action.payload,
      );
      state.post = newState;
    });
  },
});

export default postSlice.reducer;
