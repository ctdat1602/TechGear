import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '~/components/CustomHeader'
import imges from '~/lib/img'
import { toast } from '~/utils/function'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { appConfig } from '~/configs'
import { ViewProps } from '~/navigation/types/viewTypes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { hideBottomTabs, showBottomTabs } from '~/store/reducers/bottomTab'
import { NewspaperApi } from '~/api/newspaper'
import Spinner from 'react-native-loading-spinner-overlay/lib'

let pageIndex = 1;
let pageSize = 10;

const todoApiInit = {
    pageSize: pageSize,
    pageIndex: pageIndex,
};

const NewPasgeScreen = () => {
    const [todoApi, setTodoApi] = useState<any>(todoApiInit);
    const [totalRow, setTotalRow] = useState<any>(1);
    const [page, setPage] = useState(1);

    const insets = useSafeAreaInsets();
    const navigation = useNavigation<ViewProps['navigation']>();
    const focus = useIsFocused();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        if (page !== 1) {
            setTodoApi({ ...todoApi, pageIndex: page });
        }
    }, [page]);

    useEffect(() => {
        if (focus) {
            dispatch(showBottomTabs());
            _getNewPasge();
        }
    }, [focus]);

    const _getNewPasge = async () => {
        setLoading(true)
        try {
            const res: any = await NewspaperApi.newspaper();
            setData(res.data)
        } catch (error: any) {
            console.log(error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <CustomHeader style='none-user' title='Tin tức' showTitle />
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} data={data} />}
                keyExtractor={(item: any) => {
                    return item.key;
                }}
                style={{ marginTop: 10 }}
                ListFooterComponent={<View style={{ height: 30 }} />}
                onEndReached={info => {
                    const split = Math.ceil(totalRow / pageSize);
                    if (page < split) {
                        setPage(page + 1);
                    } else {
                        toast('Đã hết danh sách');
                    }
                }}
                onEndReachedThreshold={0.5}
            />
            {loading && <Spinner visible={true} textContent={'Đang tải..'} textStyle={styles.spinnerTextStyle} />}
        </View>
    )
}

const RenderItem = (props: any) => {
    const { item } = props;
    const navigation = useNavigation<ViewProps['navigation']>();
    return (
        <>
            <TouchableOpacity style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                backgroundColor: '#EFEFEF',
                paddingVertical: 8,
                flex: 1,
                marginVertical: 8,
                borderRadius: 5
            }}
                onPress={() => navigation.navigate("DetailNewPasge", { Detail: item })}
            >
                <View>
                    <Image source={{ uri: item.image }} style={{ width: 150, height: 120 }} />
                </View>

                <View style={{ marginHorizontal: 16, width: "50%" }}>
                    <Text style={{ fontSize: 14, color: '#000', fontFamily: appConfig.fonts.Bold }}>{item.name}</Text>
                    <Text numberOfLines={5} style={{ fontSize: 12, color: '#4B4B4B', fontFamily: appConfig.fonts.Regular }}>{item.contain}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("DetailNewPasge", { Detail: item })}>
                            <Text style={{ fontSize: 10, color: '#4B4B4B', fontFamily: appConfig.fonts.Regular, borderBottomWidth: 1 }}>Xem thêm</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'flex-end', flex: 1 }}>
                            <Text style={{ fontSize: 10, color: '#4B4B4B', fontFamily: appConfig.fonts.Regular }}>{item.date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default NewPasgeScreen

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: appConfig.fonts.Bold,
    },
})

