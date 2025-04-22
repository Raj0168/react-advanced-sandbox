import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
import themeReducer from "./slices/themeSlice";
import snackbarReducer from "./slices/snackbarSlice";
import historyReducer from "./slices/historySlice";
import userReducer from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { encryptTransform } from "redux-persist-transform-encrypt";

const secret_key = "5l4lYf51r1ZzD6OaZb7pDwNvHfD3D3TSKDjFblUwA8aI="; // env in prod

const userPersistConfig = {
  key: "user",
  storage,
  transforms: [
    encryptTransform({
      secretKey: secret_key,
      onError: (error) => console.error("Encryption error:", error),
    }),
  ],
};

const themePersistConfig = {
  key: "theme",
  storage,
};

const historyPersistConfig = {
  key: "searchHistory",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  searchHistory: persistReducer(historyPersistConfig, historyReducer),
  api: apiReducer,
  snackbar: snackbarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
