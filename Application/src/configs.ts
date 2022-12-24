import { Colors } from 'green-native-ts';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const appConfig = {
    hostURL: 'http://192.168.1.19:3000',
    playIframeURL: '',
    oneSignalID: 'b01dda70-15b3-4dc6-8d7c-8fde88997073',
    showBottomSheet: false,
    colors: {
        ...Colors,
        main: '#333366',
        yellow: '#FCCB06',
        backgroud: '#5E5EED',
        placeholder: '#8E8E93',
        input: '#F9F9FB',
        boder: 'rgba(84, 84, 88, 0.2)',
        white: '#fff',
        black: '#000',
        red: '#F21313',
        none: 'rgba(0, 0, 0, 0)',
        text: '#371F62',
        pink: "#FBE5EB",
        textoften: "#757575"
    },
    sizes: {
        dW: width,
        dH: height,
    },
    fonts: {
        Bold: 'SVN-Biennale-Bold',
        SemiBold: 'SVN-Biennale-SemiBold',
        Regular: 'SVN-Biennale-Book',
    },
};

export { width, height };