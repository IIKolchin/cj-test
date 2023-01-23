import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector as selectorHook,
} from 'react-redux';
import foldersSlice from '../features/folders/foldersSlice';

const store = configureStore({
  reducer: {
    folders: foldersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type RootState = ReturnType<typeof store.getState>;

export default store;
