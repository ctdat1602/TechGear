import { combineReducers } from '@reduxjs/toolkit';
import { userSlice, globalState, bottomTabSlice, news } from './reducers';

const rootReducer = combineReducers({
	user: userSlice,
	globalState: globalState,
	bottomTab: bottomTabSlice,
	news: news,
});

export default rootReducer;
