import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomHeader from '~/components/CustomHeader'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { appConfig } from '~/configs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { NewspaperApi } from '~/api/newspaper'
import { hideBottomTabs } from '~/store/reducers/bottomTab'

const DetailNewPasge = () => {
    const route = useRoute<any>();
    const id = route.params.Detail._id;
    const insets = useSafeAreaInsets();
    const focus = useIsFocused();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [item, setItem] = useState<any>([]);


    useEffect(() => {
        if (focus) {
            dispatch(hideBottomTabs());
            _getNewPasge();
        }
    }, [focus]);

    const _getNewPasge = async () => {
        setLoading(true)
        try {
            const res: any = await NewspaperApi.newspaperID(id);
            setItem(res.data)
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
            flex: 1,

        }}>
            <CustomHeader style='none-user' title='Tin tức' showTitle />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                        <Image source={{ uri: item.image }} style={{ width: "100%", height: 200, borderRadius: 5 }} />
                    </View>
                    <View style={{ paddingBottom: 20 }}>
                        <Text style={{ fontSize: 20, color: '#000', fontFamily: appConfig.fonts.SemiBold, fontWeight: "700" }}>{item.name}</Text>
                    </View>
                    <View style={{ paddingBottom: 20 }}>
                        <Text style={{ fontSize: 14, color: '#4B4B4B', fontFamily: appConfig.fonts.SemiBold, fontWeight: "400" }}>
                            {item.descriptions}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailNewPasge

const styles = StyleSheet.create({})