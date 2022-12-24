import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import imges from '~/lib/img'
import { appConfig, width } from '~/configs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ViewProps } from '~/navigation/types/viewTypes'
import icons from '~/lib/icon'

const robots = require('~/assets/images/robot.png');

type ICustomHeader = {
    showHeaders?: boolean;
    title?: string;
    style?: 'with-user' | 'none-user';
    height?: number;
    showImge?: boolean;
    nameIn4?: boolean;
    showTitle?: boolean;
    showback?: boolean;
};

const CustomHeader = (props: ICustomHeader) => {
    const navigation = useNavigation<ViewProps['navigation']>();
    const { showHeaders, title, showTitle, showback } = props
    const insets = useSafeAreaInsets();

    return (
        <>
            {!!showHeaders &&
                <>
                    <StatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
                    <ImageBackground source={imges.backgroud} style={{ width: width, height: 180, backgroundColor: "#333366", }}>
                        <View style={{ marginTop: insets.top, marginHorizontal: 16 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 22, fontWeight: '900', lineHeight: 40, color: '#FCCB06' }}>Chào Thắng !</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}> Rất vui khi bạn đã dành thời gian ra để</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}> ghé thăm gian hàng của chúng mình</Text>
                                    {/* <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', height: 40, right: 30 }}>
                                        <TouchableOpacity style={{ backgroundColor: '#FCCB06', width: 100, borderRadius: 5, alignItems: 'center' }} activeOpacity={0.7}>
                                            <Text style={{ marginVertical: 4, marginHorizontal: 5, fontSize: 14, color: '#000', fontWeight: '900' }}>Đến cửa hàng</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={robots} style={{ width: 100 }} />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </>
            }
            <>
                {props.style == 'none-user' && (
                    <View style={{ height: 85, backgroundColor: appConfig.colors.main, paddingHorizontal: 18 }}>
                        <View style={{ height: 50 }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            {!!showTitle &&
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Image source={icons.iconleft} style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                            }
                            <View style={{ alignItems: 'center', flex: 1, left: !!showTitle ? -20 : 0 }}>
                                <Text numberOfLines={1} style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    fontFamily: appConfig.fonts.Bold,
                                }}>
                                    {title}
                                </Text>
                            </View>

                        </View>
                    </View>
                )}
            </>
            <>
                {!!showback &&
                    <StatusBar barStyle="dark-content" />
                }
            </>
        </>
    )
}

export default CustomHeader

const styles = StyleSheet.create({})