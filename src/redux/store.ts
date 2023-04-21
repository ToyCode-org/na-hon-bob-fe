import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import postSlice from "./slice/postSlice";
import commentSlice from "./slice/commentSlice";

const store = configureStore({
  reducer: {
    userSlice,
    postSlice,
    commentSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
