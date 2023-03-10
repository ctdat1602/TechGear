import { Alert, Clipboard, Linking, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import { LocalStorage } from '../LocalStorage';
import { setInformations, setLogin, setToken } from '~/store/reducers/user';

export const isIOS = () => {
    return Platform.OS === 'ios' ? true : false;
};

export const isAndroid = () => {
    return Platform.OS === 'android' ? true : false;
};

export const toast = (text: string) => {
    SimpleToast.show(text, SimpleToast.SHORT);
};

export const openLink = (url: string) => {
    Linking.openURL(url);
};

export const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
};

export const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export const timeOutToken = (props: any) => {
    const { onPress, error } = props;

    if (error.message == '' || error.message == 'Không tìm thấy token') {
        Alert.alert('Phiên đăng nhập đã hết hiệu lực', 'Đăng nhập lại để tiếp tục', [{ text: 'OK', onPress: () => onPress() }]);
    }
};

export const getTime = (date: any) => {
    return moment(date).format('hh:mm');
};

export const getStrDate = (date: any) => {
    return moment(date).format('DD/MM/yyy');
};

export const getIndex = (data: any, item: any) => {
    return data.indexOf(item);
};

export const logOut = (dispatch: any) => {
    LocalStorage.logout();
    dispatch(setLogin(false));
    dispatch(setInformations({}));
};

export const parseToMoney = (value: any) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
