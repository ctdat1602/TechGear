import AsyncStorage from '@react-native-async-storage/async-storage';

const USER = 'USER';
const WELCOME = 'WELCOME';
const TOKEN = 'ACCESS_TOKEN';

const LocalStorage = {
    // WELCOME
    async setWelcome() {
        await AsyncStorage.setItem(WELCOME, 'true');
    },
    async getWelcome() {
        const response = await AsyncStorage.getItem(WELCOME);
        return response == null ? null : response;
    },
    //TOKEN
    async setToken(params: any) {
        await AsyncStorage.setItem(TOKEN, params);
    },
    async getToken() {
        const response = await AsyncStorage.getItem(TOKEN);
        return response == null ? null : response;
    },
    // USER
    async setUserInformation(params: any) {
        try {
            let temp = JSON.stringify(params);
            await AsyncStorage.setItem(USER, temp);
        } catch (error) {
            console.log(error);
        }
    },
    async getUserInformation() {
        const response = await AsyncStorage.getItem(USER);
        return response == null ? null : JSON.parse(response);
    },
    // LOGOUT
    async logout() {
        await AsyncStorage.multiRemove([USER, TOKEN]);
    },
    // XÓA TOKEN
    async deleteToken() {
        await AsyncStorage.removeItem(TOKEN);
    },
}

export { LocalStorage };