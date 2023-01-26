/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TFolder } from '../types';

const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: [] as TFolder[],
  },
  reducers: {
    setFolders(state, { payload }) {
      state.folders = [...payload];
    },
  },
});

export const { setFolders } = foldersSlice.actions;

export default foldersSlice.reducer;
