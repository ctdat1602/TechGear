import { createSlice } from '@reduxjs/toolkit';

const bottomTabSlice = createSlice({
  name: 'buttomTab',
  initialState: {
    isShow: true,
  },
  reducers: {
    showBottomTabs: state => {
      state.isShow = true;
    },
    hideBottomTabs: state => {
      state.isShow = false;
    },
  },
});

export const { showBottomTabs, hideBottomTabs } = bottomTabSlice.actions;
export default bottomTabSlice.reducer;