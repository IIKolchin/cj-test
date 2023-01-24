/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TFolder } from '../../services/types';

const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: [] as TFolder[],
  },
  reducers: {
    setFolders(state, { payload }) {
      state.folders = [...payload];
    },
    addFolder(state, { payload }) {
      state.folders = [...payload];
    },
    removeFolder(state, { payload }) {
      state.folders = [...payload];
    },
  },
});

export const { addFolder, removeFolder, setFolders } = foldersSlice.actions;

export default foldersSlice.reducer;
