import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import imges from '~/lib/img';
import { appConfig, width } from '~/configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PrimaryButton from '~/components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { ViewProps } from '~/navigation/types/viewTypes';
import { useDispatch } from 'react-redux';
import { LocalStorage } from '~/utils/LocalStorage';
import { setWelcome } from '~/store/reducers/globalState';

const WelcomeScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const _onSubmit = async () => {
        setLoading(true);
        try {
            LocalStorage.setWelcome();
            dispatch(setWelcome(false));
        } catch (error) {
            console.log('_startApp: ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <StatusBar backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" translucent />
            <SwiperFlatList
                // autoplay
                showPagination
                data={listImg}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 50 + insets.top }}>
                            <View style={{ marginBottom: insets.bottom, paddingHorizontal: 26, width: 296, }}>
                                <Text style={{ color: "#000", fontSize: 24, fontFamily: appConfig.fonts.SemiBold, fontWeight: '700', }}>{item.title}</Text>
                            </View>
                            <Image source={item.image} style={{ height: 400, borderTopRightRadius: 30, borderBottomRightRadius: 30, width: width }} />
                            <View style={{ position: "absolute", marginHorizontal: 20, top: 450, }}>
                                <View style={{ marginVertical: 5, alignItems: 'center', marginBottom: insets.top, marginTop: item.btn !== "B???t ?????u" ? insets.top : 0 }}>
                                    <Text style={{ color: "#000", fontSize: 14, fontFamily: appConfig.fonts.Regular, textAlign: 'center', marginBottom: 10 }} numberOfLines={5}>{item.contents}</Text>
                                    <Text style={{ color: "#000", fontSize: 14, fontFamily: appConfig.fonts.Regular, textAlign: 'center' }} numberOfLines={5}>{item.content2}</Text>
                                </View>
                                {item.btn === "B???t ?????u" &&
                                    <PrimaryButton
                                        title={item.btn}
                                        onPress={_onSubmit} />
                                }
                            </View>
                        </View>
                    </View>
                )}
            />
        </>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({})

const listImg = [
    {
        key: 1,
        title: "S??? S??NG T???O NH???NG TR???I NGHI???M",
        contents: "Mang ?????n nh???ng s???n ph???m ?????c ?????c , v???i c??c thi???t k??? m???i m??? v?? ?????y s??? s??ng ",
        content2: "Tr???i nghi???m nh???ng s???n ph???m ????? ????a ra s??? l???a ch???n ph?? h???p cho b???n th??n",
        image: imges.Slideshow,
        btn: "Ti???p t???c"
    },
    {
        key: 2,
        title: "TR??CH NHI???M - D???CH V???",
        contents: "Tr??ch nhi???m v?? d???ch v??? lu??n ???????c ?????c l??n h??ng ?????u",
        content2: "Mang ?????n cho kh??ch h??ng s??? tin t?????ng , uy t??n tuy???t ?????i v?? b???o v??? quy???n l???i cho kh??ch h??ng",
        image: imges.Slideshow,
        btn: "B???t ?????u"
    }
]