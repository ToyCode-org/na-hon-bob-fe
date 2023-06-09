import { userAPI } from "@/api/api";
import { swalError } from "@/swal/swal";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyInfo = createAsyncThunk(
  "GET_MY_INFO",
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
  "UPDATAE_AVATAR",
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
  "UPDATAE_NICKNAME",
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
  "DELETE_ONE_USER",
  async (payload, thunkAPI) => {
    try {
      const { data } = await userAPI.deleteUser();
      return thunkAPI.fulfillWithValue(data.data.status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const userInit = {
  id: 0,
  nickname: "",
  avatar: "",
};
/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  user: userInit,
  isLogin: false,
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
      if (action.payload.isLogin) {
        state.user = action.payload.data;
        state.isLogin = true;
      } else {
        state.user = userInit;
        state.isLogin = false;
      }
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
    builder.addCase(updateNickname.rejected, (state, action) => {
      swalError("사용할 수 없는 닉네임입니다.");
    });
  },
});

export default userSlice.reducer;
