import { commentAPI } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddCommentDispatch,
  CommentsData,
  EditCommentDispatch,
  GetCommentDispatch,
} from "@/components/post";

export const initComment = createAsyncThunk(
  "INIT_COMMENT",
  async (payload, thunkAPI) => {
    try {
      return thunkAPI.fulfillWithValue("init");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCommentAll = createAsyncThunk(
  "GET_ALL_COMMENT",
  async (payload: GetCommentDispatch, thunkAPI) => {
    try {
      const { data } = await commentAPI.getCommentByPostIdPaging(
        payload.post_id,
        payload.page,
      );
      const page = payload.page;
      return thunkAPI.fulfillWithValue({ ...data, page });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (payload: AddCommentDispatch, thunkAPI) => {
    try {
      const { data } = await commentAPI.createComment(
        payload.post_id,
        payload.content,
      );
      const user = {
        nickname: payload.nickname,
        avatar: payload.avatar,
      };
      return thunkAPI.fulfillWithValue({ ...data, user });
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  },
);

export const updateComment = createAsyncThunk(
  "UPDATAE_COMMENT",
  async (payload: EditCommentDispatch, thunkAPI) => {
    try {
      await commentAPI.editComment(payload.comment_id, payload.content);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "DELETE_ONE_COMMENT",
  async (payload: number, thunkAPI) => {
    try {
      await commentAPI.deleteComment(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface InitalState {
  comment: CommentsData[];
  isLoading: boolean;
  error: null | string;
  totalPages: number;
  hasNextPage: boolean;
}

/* InitialState */
// data, isLoading, error로 상태관리
const initialState: InitalState = {
  comment: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  hasNextPage: true,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initComment.fulfilled, (state, action) => {
      state.comment = [];
      state.hasNextPage = true;
    });
    builder.addCase(getCommentAll.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCommentAll.fulfilled, (state, action) => {
      const page = action.payload.page;
      const totalPages = action.payload.totalPages;
      const comments = action.payload.data;
      const newState = state.comment.concat(comments);
      state.comment = newState;
      state.totalPages = totalPages;
      state.hasNextPage = page < totalPages;
      state.isLoading = false;
    });
    builder.addCase(addComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comment.unshift({
        ...action.payload.data,
        user: action.payload.user,
      });
      state.isLoading = false;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const newState = state.comment.map(comment =>
        comment.comment_id === action.payload.comment_id
          ? { ...comment, content: action.payload.content }
          : comment,
      );

      state.comment = newState;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const newState = state.comment.filter(
        comment => comment.comment_id !== action.payload,
      );
      state.comment = newState;
    });
  },
});

export default commentSlice.reducer;
