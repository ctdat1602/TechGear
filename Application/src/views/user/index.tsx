import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import CustomHeader from '~/components/CustomHeader'
import { appConfig } from '~/configs'
import imges from '~/lib/img'
import icons from '~/lib/icon'
import PrimaryButton from '~/components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import { logOut } from '~/utils'
import { useDispatch } from 'react-redux'

const UserScreen = () => {
    const navigation = useNavigation<ViewProps['navigation']>();
    const dispatch = useDispatch();

    return (
        <View style={{ backgroundColor: '#FFF', flex: 1 }}>
            <CustomHeader style='none-user' title='Thông tin' />
            <View style={styles.main}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#EFEFEF',
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    borderRadius: 5
                }}
                >
                    <View>
                        <Image source={imges.thangdeptrai} style={{ width: 90, height: 90, borderRadius: 5 }} />
                    </View>

                    <View style={{ marginHorizontal: 16, width: "50%" }}>
                        <Text style={{ fontSize: 20, color: '#000', fontFamily: appConfig.fonts.SemiBold, fontWeight: "700", lineHeight: 30 }}>Đỗ Mạnh Thắng</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <View style={{ justifyContent: 'center', height: 14, }}>
                                <Image source={icons.email} style={{ height: 12, marginRight: 10, top: 2 }} />
                            </View>
                            <Text numberOfLines={1}
                                style={{ fontSize: 12, color: '#4B4B4B', fontFamily: appConfig.fonts.Regular }}>
                                thang@gmail.com
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <View style={{ justifyContent: 'center', height: 14, }}>
                                <Image source={icons.phone} style={{ height: 12, marginRight: 10, top: 2 }} />
                            </View>
                            <Text numberOfLines={1}
                                style={{ fontSize: 12, color: '#4B4B4B', fontFamily: appConfig.fonts.Regular }}>
                                0335911328
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <View style={{ justifyContent: 'center', height: 14, }}>
                                <Image source={icons.address} style={{ height: 12, marginRight: 10, top: 2 }} />
                            </View>
                            <Text numberOfLines={1}
                                style={{ fontSize: 12, color: '#4B4B4B', fontFamily: appConfig.fonts.Regular }}>
                                Tan Phu , Ho Chi Minh
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <PrimaryButton title='Chỉnh sửa thông tin' />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <PrimaryButton title='Đổi mật khẩu' />
                </View>
                <View style={{ marginBottom: 20 }} >
                    <TouchableOpacity
                        onPress={() => logOut(dispatch)}
                        activeOpacity={0.5}
                        style={[styles.container]}>
                        <Text style={styles.title}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default UserScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    container: {
        backgroundColor: appConfig.colors.yellow,
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700',
        fontFamily: appConfig.fonts.SemiBold,
    },
    loading: {
        marginLeft: 10,
    },
})