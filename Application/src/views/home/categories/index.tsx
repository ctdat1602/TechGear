import { StyleSheet, Image, View, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomHeader from '~/components/CustomHeader'
import imges from '~/lib/img'
import { appConfig, width } from '~/configs'
import Search from '~/components/Search'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import { useDispatch } from 'react-redux'
import { hideBottomTabs } from '~/store/reducers/bottomTab'
import { HomeApi } from '~/api/home'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { parseToMoney } from '~/utils'

const CategoriesHome = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();
    const focus = useIsFocused();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const route = useRoute<any>();
    const item = route.params.item._id;
    const name = route.params.item.name;
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        if (focus) {
            dispatch(hideBottomTabs());
            _getCategories();
        }
    }, [focus]);

    const _getCategories = async () => {
        setLoading(true)
        try {
            const res: any = await HomeApi.categoriesID(item);
            setData(res.data)
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const _search = (text: string) => {
        setLoading(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CustomHeader style='none-user' title={name} showTitle />

            <View style={styles.main}>
                <Search onSearch={_search} placeholder={"Nhập vào để tìm sản phẩm"} slieshow />
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item: any) => {
                        return item.key;
                    }}
                    style={{ marginTop: 10, marginBottom: 30 }}
                    renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                />
            </View>

            {loading && <Spinner visible={true} textContent={'Đang tải..'} textStyle={styles.spinnerTextStyle} />}
        </View>
    )
}

const RenderItem = (props: any) => {
    const navigation = useNavigation<ViewProps['navigation']>();
    const dispatch = useDispatch();
    const { item, index } = props;
    return (
        <>
            {index < 4 &&
                <TouchableOpacity
                    onPress={() => {
                        dispatch(hideBottomTabs())
                        navigation.navigate("DetailScreen", { Detail: item })
                    }}
                    style={styles.Items}>
                    <Image source={{ uri: item.image } || imges.logo} style={{ width: 160, height: 144, backgroundColor: '#fff' }} />
                    <View style={{ marginTop: 8, marginHorizontal: 8, marginVertical: 8 }}>
                        <Text style={{ fontSize: 14, color: '#000', fontWeight: "700", fontFamily: appConfig.fonts.Regular }}>{item.name} </Text>
                        <Text style={{ fontSize: 14, color: 'red', fontWeight: "700", fontFamily: appConfig.fonts.Regular }}> {parseToMoney(item.price)}đ </Text>
                        <Text style={{ fontSize: 14, color: 'red', fontWeight: "700", fontFamily: appConfig.fonts.Regular }}> {parseToMoney(item.discountPrice)}đ </Text>
                    </View>
                </TouchableOpacity>
            }
        </>
    )
}

export default CategoriesHome

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 16,
        marginVertical: 16,
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
        paddingBottom: 10,
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 5,
        shadowColor: appConfig.colors.trans50,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 9,
    },
    spinnerTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: appConfig.fonts.Bold,
    },
})

