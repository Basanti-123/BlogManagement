import { configureStore } from "@reduxjs/toolkit";
import { bookmarkReducer } from "../slices/bookmarkSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { blogReducer } from "../slices/blogSlice";
import storage from "redux-persist/lib/storage"; // LS
import { userReducer } from "../slices/userSlice";

const persistBookmarkConfig = {
  key: "blogify-bookmark",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistBookmark = persistReducer(persistBookmarkConfig, bookmarkReducer);

export const store = configureStore({
  reducer: {
    bookmark: persistBookmark,
    blogs: blogReducer,
    users: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  devTools: true,
});

export const newStore = persistStore(store);
