import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const localUser = {
	async setToken(params: any) {
		await AsyncStorage.setItem('accessToken', params);
	},
	async getToken() {
		const response = await AsyncStorage.getItem('accessToken');
		return response == null ? null : response;
	},
	async setUserInformation(params: any) {
		await AsyncStorage.setItem('user', JSON.stringify(params));
	},
	async getUserInformation() {
		const response = await AsyncStorage.getItem('user');
		return response == null ? null : JSON.parse(response);
	},
	async logout() {
		await AsyncStorage.multiRemove(['user', 'accessToken']);
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState: {
		logged: false,
		token: '',
		informations: {},
	},
	reducers: {
		setLogin: (state, action) => {
			state.logged = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setInformations: (state, action) => {
			state.informations = action.payload;
		},
	},
});

export const { setLogin, setToken, setInformations } = userSlice.actions;
export { localUser, userSlice };
export default userSlice.reducer;
