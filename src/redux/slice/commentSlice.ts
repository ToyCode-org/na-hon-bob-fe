import { commentAPI } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddCommentDispatch,
  CommentsData,
  EditCommentDispatch,
  GetCommentDispatch,
} from "@/components/post";

export const getCommentAll = createAsyncThunk(
  "GET_ALL",
  async (payload: GetCommentDispatch, thunkAPI) => {
    try {
      const { data } = await commentAPI.getCommentByPostIdPaging(
        payload.post_id,
        payload.page,
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addComment = createAsyncThunk(
  "POST_ADD",
  async (payload: AddCommentDispatch, thunkAPI) => {
    try {
      if (payload.page === 1) {
        const { data } = await commentAPI.createComment(
          payload.post_id,
          payload.content,
        );
        const reduce = {
          ...payload,
          reduceData: { ...data.data, isEditable: true },
        };
        return thunkAPI.fulfillWithValue(reduce);
      }
      await commentAPI.createComment(payload.post_id, payload.content);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  },
);

export const updateComment = createAsyncThunk(
  "POST_UPDATAE",
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
  "DELETE_ONE",
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
}

/* InitialState */
// data, isLoading, error로 상태관리
const initialState: InitalState = {
  comment: [],
  isLoading: false,
  error: null,
  totalPages: 1,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCommentAll.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCommentAll.fulfilled, (state, action) => {
      state.comment = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    });
    builder.addCase(addComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comment.unshift(action.payload?.reduceData);
      state.comment.pop();
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
