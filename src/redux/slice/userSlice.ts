import { userAPI } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyInfo = createAsyncThunk(
  "GET_ONE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userAPI.getMyInfo();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  "POST_UPDATAE_AVATAR",
  async (payload: string, thunkAPI) => {
    try {
      const { data } = await userAPI.editAvatar(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const updateNickname = createAsyncThunk(
  "POST_UPDATAE_NICKNAME",
  async (payload: string, thunkAPI) => {
    try {
      const { data } = await userAPI.editNickname(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "DELETE_ONE",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userAPI.deleteUser();
      return thunkAPI.fulfillWithValue(data.data.status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  user: {
    id: 0,
    nickname: "",
    avatar: "",
  },
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMyInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(updateAvatar.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.user = { ...state.user, avatar: action.payload.data.avatar };
      state.isLoading = false;
    });
    builder.addCase(updateNickname.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateNickname.fulfilled, (state, action) => {
      state.user = { ...state.user, nickname: action.payload.data.nickname };
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
