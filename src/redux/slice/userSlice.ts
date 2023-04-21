import { userAPI } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMyInfo = createAsyncThunk(
  "GET_ONE",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await request API
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
      console.log(payload);
      const { data } = await userAPI.editAvatar(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const updateNickname = createAsyncThunk(
  "POST_UPDATAE_NICKNAME",
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

type UserInit = {
  id: number;
  nickname: string;
  avatar: string;
};
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
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = { ...state.user, avatar: action.payload.data.avatar };
    });
    builder.addCase(updateNickname.fulfilled, (state, action) => {
      // state.user = {...state.user,nickname:}
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
