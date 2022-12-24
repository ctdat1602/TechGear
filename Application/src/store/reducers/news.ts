import { createSlice } from '@reduxjs/toolkit';

const news = createSlice({
	name: 'news',
	initialState: {
		data: [],
	},
	reducers: {
		setNews: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setNews } = news.actions;
export default news.reducer;
