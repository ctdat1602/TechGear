import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ViewProps } from '~/navigation/types/viewTypes';
import { useDispatch } from 'react-redux';
import { hideBottomTabs, showBottomTabs } from '~/store/reducers/bottomTab';
import { productApi } from '~/api/product';
import CustomHeader from '~/components/CustomHeader';
import { appConfig, width } from '~/configs';
import Spinner from 'react-native-loading-spinner-overlay/lib'
import Search from '~/components/Search';
import { HomeApi } from '~/api/home';
import imges from '~/lib/img';
import { parseToMoney } from '~/utils';
import { useKeyboard } from 'green-native-ts';
import { isFulfilled } from '@reduxjs/toolkit';

const ProducstScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();

    const focus = useIsFocused();
    const dispatch = useDispatch();
    const keyboard: boolean = useKeyboard();

    const [product, setProduct] = useState<any>([]);
    const [productFilter, setProductFilter] = useState<any>([]);
    const [search, setSearch] = useState<any>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        if (keyboard) {
            dispatch(hideBottomTabs());
        } else {
            dispatch(showBottomTabs());
        }
    }, [keyboard]);


    useEffect(() => {
        _getCategories()
        _getProduct();
    }, []);

    const _getCategories = async () => {
        setLoading(true)
        try {
            const res: any = await HomeApi.categories();
            setCategories(res.data);
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const _getProduct = async () => {
        setLoading(true)
        try {
            const res: any = await productApi.product();
            setProductFilter(res.data);
            setProduct(res.data);
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    const _search = async (text: string) => {
        if (text) {
            const newdata = product.filter((item: any) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1;
            })
            setProductFilter(newdata);
            setSearch(text)
        } else {
            setProductFilter(product);
            setSearch(text)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CustomHeader style='none-user' title="Sản phẩm" showTitle />
            <View style={{ marginHorizontal: 16, }}>
                <Search onSearch={_search} placeholder="Nhập vào để tìm sản phẩm" />

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 16, }}>
                    <Text style={styles.textTitle}>Lọc sản phẩm</Text>
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
                <View style={{ marginHorizontal: 16, }}>
                    <Text style={styles.textTitle}>Tất cả sản phẩm</Text>
                </View>

                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={productFilter}
                    keyExtractor={(item: any, index: any) => {
                        return index.toString();
                    }}
                    style={{ marginTop: 10, marginBottom: 30 }}
                    renderItem={({ item, index }) => <RenderItem item={item} index={index} data={productFilter} />}
                />

            </ScrollView>
            {loading && <Spinner visible={true} textContent={'Đang tải..'} textStyle={styles.spinnerTextStyle} />}
        </View>
    )
}

const RenderItem = (props: any) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<ViewProps['navigation']>()
    const { item, productFilter } = props
    return (
        <TouchableOpacity
            onPress={() => {
                dispatch(hideBottomTabs())
                navigation.navigate("DetailScreen", { Detail: item, Data: productFilter })
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
    )

}

export default ProducstScreen

const styles = StyleSheet.create({
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
        backgroundColor: '#fff',
        paddingBottom: 10,
        marginLeft: 16,
        borderRadius: 5,
        shadowColor: appConfig.colors.trans50,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 9,
    },
    spinnerTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: appConfig.fonts.Bold,
    }
})