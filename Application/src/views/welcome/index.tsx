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
                                <View style={{ marginVertical: 5, alignItems: 'center', marginBottom: insets.top, marginTop: item.btn !== "Bắt đầu" ? insets.top : 0 }}>
                                    <Text style={{ color: "#000", fontSize: 14, fontFamily: appConfig.fonts.Regular, textAlign: 'center', marginBottom: 10 }} numberOfLines={5}>{item.contents}</Text>
                                    <Text style={{ color: "#000", fontSize: 14, fontFamily: appConfig.fonts.Regular, textAlign: 'center' }} numberOfLines={5}>{item.content2}</Text>
                                </View>
                                {item.btn === "Bắt đầu" &&
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
        title: "SỰ SÁNG TẠO NHỮNG TRẢI NGHIỆM",
        contents: "Mang đến những sản phẩm đặc đắc , với các thiết kế mới mẻ và đầy sự sáng ",
        content2: "Trải nghiệm những sản phẩm để đưa ra sự lựa chọn phù hợp cho bản thân",
        image: imges.Slideshow,
        btn: "Tiếp tục"
    },
    {
        key: 2,
        title: "TRÁCH NHIỆM - DỊCH VỤ",
        contents: "Trách nhiệm và dịch vụ luôn được đặc lên hàng đầu",
        content2: "Mang đến cho khách hàng sự tin tưởng , uy tín tuyệt đối và bảo vệ quyền lợi cho khách hàng",
        image: imges.Slideshow,
        btn: "Bắt đầu"
    }
]