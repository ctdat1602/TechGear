import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { appConfig, width } from '~/configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewProps } from '~/navigation/types/viewTypes';
import icons from '~/lib/icon';
import CustomHeader from '~/components/CustomHeader';
import PrimaryButton from '~/components/PrimaryButton';
import imges from '~/lib/img';
import { parseToMoney, toast } from '~/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imgDetail = require('~/assets/images/detail.png');

const DetailScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();
    const [arrow, setArrow] = useState(false);
    const route = useRoute<any>();
    const item = route.params.Detail;
    const data: any = route.params.Data || [];
    const focus = useIsFocused();
    const [dataCart, setDataCart] = useState<any[]>([]);
    const [idarr, setIdArr] = useState<any>();

    useEffect(() => {
        if (focus) {
            getDataCart();
        }
    }, []);


    const getDataCart = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('DataDetail');
            if (jsonValue != null) {
                const data = JSON.parse(jsonValue);
                setDataCart(data);
            } else {
                return null;
            }
        } catch (e) { }
    };

    const handleAddProducts = async () => {
        getDataCart();
        if (dataCart.length === 0) {
            try {
                const jsonValue = JSON.stringify([{ ...item, quantity: 1 }]);
                await AsyncStorage.setItem('DataDetail', jsonValue);
            } catch (e) {
                console.log(e);
            }
        } else {
            let cloneArr = dataCart;
            let itemID = cloneArr.find((data: any) => data._id);
            if (itemID._id !== item._id) {
                console.log(itemID._id !== item._id);
                cloneArr.push({ ...item, quantity: 1 });
            }
            try {
                const jsonValue = JSON.stringify(cloneArr);
                await AsyncStorage.setItem('DataDetail', jsonValue);
            } catch (e) {
                console.log(e);
            }
        }
        navigation.navigate("SHOPPING", { Detail: item })
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <StatusBar
                translucent
                barStyle={'dark-content'}
            />
            <View style={[styles.header, { height: insets.top + 10, marginBottom: -(insets.top + 50), paddingTop: 10 + insets.top }]}>
                <View style={styles.wBack}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5} style={styles.btnBack}>
                        <Image resizeMode="contain" source={icons.goback} style={styles.iBack} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={item.image ? { uri: item.image } : imges.logo} style={{ width: width, height: 360, marginTop: 45 + insets.top }}>
                </ImageBackground>

                <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 10 }}>
                    <View style={{ width: 331, marginBottom: 10 }}>
                        <Text style={{ color: "#000", fontSize: 20, fontFamily: appConfig.fonts.SemiBold, fontWeight: "700" }}>{item.name}</Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.text}>Giá niêm yết :
                            <Text style={{ color: "red", fontSize: 14, fontFamily: appConfig.fonts.SemiBold, fontWeight: "700" }}> {parseToMoney(item.discountPrice)}đ</Text>
                            <Text style={{ color: "#000", fontSize: 12, fontFamily: appConfig.fonts.Regular, }}> (Đã bao gồm VAT)</Text>
                        </Text>
                        <Text style={styles.text}>Giá gốc :
                            <Text style={{ color: "red", fontSize: 14, fontFamily: appConfig.fonts.SemiBold, fontWeight: "700" }}> {parseToMoney(item.price)}đ</Text>
                        </Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.text}>Sản phẩm còn lại :
                            <Text style={{ color: "red", fontSize: 14, fontFamily: appConfig.fonts.SemiBold, fontWeight: "700" }}>{item.quantity}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setArrow(!arrow)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.text}>Thông số kỹ thuật </Text>
                            </View>
                            <View style={{ width: 50 }}>
                                {arrow ?
                                    <Image source={icons.Updown} style={{ width: 15, height: 15 }} />
                                    :
                                    <Image source={icons.UpArrow} style={{ width: 15, height: 15 }} />
                                }
                            </View>
                        </View>
                        {arrow && <View style={{ paddingBottom: 30 }}>
                            <Text style={styles.TextInfro}>{item.descriptions}</Text>
                        </View>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ marginBottom: 10 + insets.bottom, marginHorizontal: 16 }}>
                <PrimaryButton title='Thêm vô gỏ hàng'
                    onPress={() => handleAddProducts()}
                />
            </View>
        </View >
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 16
    },
    text: {
        color: "#000",
        fontSize: 14,
        fontFamily: appConfig.fonts.SemiBold,
        fontWeight: "700"
    },
    infrotext: {
        fontSize: 12,
        color: '#000',
        fontWeight: "400"
    },
    itemText: {
        marginBottom: 5
    },
    TextInfro: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: appConfig.fonts.Regular,
        color: '#4B4B4B'
    },
    header: {
        width: '100%',
        zIndex: 999,
    },
    wBack: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: 16,
    },
    tBack: {
        fontFamily: appConfig.fonts.Regular,
        color: appConfig.colors.blueGreyDark,
        fontSize: 16,
        marginLeft: 8,
    },
    btnBack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iBack: {
        width: 20,
        height: undefined,
        aspectRatio: 1,
    },
})

