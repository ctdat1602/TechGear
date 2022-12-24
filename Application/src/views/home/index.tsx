import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '~/components/CustomHeader'
import { appConfig, width } from '~/configs'
import SwiperFlatList from 'react-native-swiper-flatlist'
import imges from '~/lib/img'
import icons from '~/lib/icon'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { hideBottomTabs, showBottomTabs } from '~/store/reducers/bottomTab';
import { accountApi } from '~/api/account'
import { parseToMoney, toast } from '~/utils'
import { HomeApi } from '~/api/home'
import Spinner from 'react-native-loading-spinner-overlay/lib'

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();
    const focus = useIsFocused();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [categories, setCategories] = useState<any>([]);
    const [topDiscount, setTopDiscount] = useState<any>([]);
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        if (focus) {
            dispatch(showBottomTabs());
            _getCategories()
            _getTopDiscount()
        }
    }, [focus]);

    const _getCategories = async () => {
        setLoading(true)
        try {
            const res: any = await HomeApi.categories();
            setCategories(res.data)
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const _getTopDiscount = async () => {
        setLoading(true)
        try {
            const res: any = await HomeApi.topDiscount();
            setTopDiscount(res.data)
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CustomHeader showHeaders />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main}>
                    <Text style={styles.textTitle}>Chương trình / Ưu đãi</Text>
                </View>
                <View style={styles.main}>
                    <View style={{
                        height: 170,
                        borderRadius: 5
                    }}>
                        <SwiperFlatList
                            autoplay
                            autoplayLoop
                            showPagination={false}
                            data={listImg}
                            renderItem={({ item }) => (
                                <View style={{ width: width - 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Image source={item.image} style={{ height: 170, borderRadius: 5, width: width / 1.1 }} />
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.main}>
                    <Text style={styles.textTitle}>Bạn quan tâm đến sản phẩm ? </Text>
                </View>
                <View style={{ height: 30 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {categories.map((item: any, index: any) =>
                            <>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('CategoriesHome', { item: item })}
                                    key={index?.toString()}
                                    style={[styles.title, { marginLeft: index === 0 ? 16 : 0 }]}
                                >
                                    <Image source={item.image} />
                                    <Text style={{ fontSize: 14, color: '#000', fontWeight: '600', fontFamily: appConfig.fonts.SemiBold }}>{item.name}</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                </View>

                <View style={styles.main}>
                    <Text style={styles.textTitle}>Sản phẩm nổi bật</Text>
                </View>


                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={topDiscount}
                    keyExtractor={(item: any) => {
                        return item.key;
                    }}
                    style={{ marginTop: 10, marginBottom: 30 }}
                    renderItem={({ item, index }) => <RenderItem item={item} index={index} data={topDiscount} />}
                />

            </ScrollView>
            {loading && <Spinner visible={true} textContent={'Đang tải..'} textStyle={styles.spinnerTextStyle} />}
        </View>
    )
}

const RenderItem = (props: any) => {
    const navigation = useNavigation<ViewProps['navigation']>();
    const dispatch = useDispatch();
    const { item, index, data } = props;
    return (
        <>
            {index < 4 &&
                <TouchableOpacity
                    onPress={() => {
                        dispatch(hideBottomTabs())
                        navigation.navigate("DetailScreen", { Detail: item, Data: data })
                    }}
                    style={styles.Items}>
                    <Image source={!!item.image ? { uri: item.image } : imges.logo}
                        style={{ width: 160, height: 144, backgroundColor: '#fff' }} />
                    <View style={{ padding: 8 }}>
                        <Text
                            style={{
                                fontSize: 14, color: '#000',
                                fontWeight: "700",
                                fontFamily: appConfig.fonts.Regular
                            }}
                            numberOfLines={2}
                        >
                            {item.name}</Text>
                        <View style={{
                            marginTop: 8,
                            flexDirection: 'row',
                        }}>
                            {item.discountPrice !== 0 ?
                                <>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{
                                            fontSize: 12, color: '#696960',
                                            fontWeight: "700", fontFamily: appConfig.fonts.Regular,
                                            marginRight: 5,
                                            textDecorationLine: 'line-through',
                                        }}>
                                            {parseToMoney(item.price)}đ</Text>
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'red', fontWeight: "700", fontFamily: appConfig.fonts.Regular }}>
                                        {parseToMoney(item.discountPrice)}đ</Text>
                                </>
                                :
                                <>
                                    <Text style={{ fontSize: 14, color: 'red', fontWeight: "700", fontFamily: appConfig.fonts.Regular }}>
                                        {parseToMoney(item.price)}đ</Text>
                                </>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            }
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 16,
    },
    textTitle: {
        fontSize: 16,
        color: appConfig.colors.black,
        fontWeight: '700',
        marginVertical: 16
    },
    title: {
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: appConfig.colors.yellow,
        marginRight: 8
    },
    Items: {
        width: width / 2 - 16 * 1.5,
        marginBottom: 15,
        backgroundColor: '#ffff',
        marginLeft: 16,
        borderRadius: 5,
        shadowColor: appConfig.colors.trans50,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 9,
    },
    spinnerTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: appConfig.fonts.Bold,
    },
})

const listImg = [
    {
        key: 1,
        image: imges.slide1,
    },
    {
        key: 2,
        image: imges.slide2,
    },
    {
        key: 3,
        image: imges.slide3,
    },
    {
        key: 4,
        image: imges.slide4,
    },
]
