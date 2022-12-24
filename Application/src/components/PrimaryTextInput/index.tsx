import { StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { appConfig, width } from '~/configs';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign, Ionicons } from 'green-native-ts/src/components/Icon';

const PrimaryTextInput = (props: any) => {
    const { title, value, onChangeText, style, isPassword, isNumber, isError, ischeck } = props;
    const [focused, setFocused] = React.useState(false);
    const [flag, setFlag] = React.useState(-10);
    const useFocused = useIsFocused();

    const ANIM_RING_BOTTOM = new Animated.Value(20);

    const startAnimation = () => {
        Animated.timing(ANIM_RING_BOTTOM, {
            toValue: 0,
            useNativeDriver: true,
            duration: 100,
        }).start();
    };

    useEffect(() => {
        setFlag(0);
    }, [useFocused]);

    useEffect(() => {
        if (focused && value == '') {
            startAnimation();
        }
    }, [focused]);

    useEffect(() => {
        if (value != '' && flag == 0) {
            startAnimation();
        }
    }, [flag]);

    const [showPassword, setShowPassword] = React.useState(false);

    const onChangeStatus = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: isError ? 'red' : 'rgba(84, 84, 88, 0.2)',
                    },
                ]}>
                {(focused || value !== '') && (
                    <Animated.View
                        style={[
                            styles.labelText,
                            {
                                transform: [{ translateY: ANIM_RING_BOTTOM }],
                            },
                        ]}>
                        <View style={{ backgroundColor: '#fff' }}>
                            <Text style={{
                                fontFamily: appConfig.fonts.Regular,
                                marginHorizontal: 5,
                                fontSize: 14,
                                color: '#818181',
                            }}>
                                {focused || value !== '' ? title : ''}
                            </Text>
                        </View>
                        <View style={{ flex: 1, }} />
                    </Animated.View>
                )}

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder={!focused ? title : ''}
                        placeholderTextColor={appConfig.colors.placeholder}
                        secureTextEntry={isPassword == true ? !showPassword : false}
                        keyboardType={isNumber == true ? 'phone-pad' : 'default'}
                        style={[
                            style,
                            {
                                fontSize: 14,
                                flex: 1,
                                color: "#000",
                                marginBottom: focused || value !== '' ? -10 : 3,
                                zIndex: 999,
                                fontFamily: appConfig.fonts.Regular,
                            },
                        ]}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />

                    {isPassword && (
                        <TouchableOpacity
                            onPress={() => onChangeStatus()}
                            style={[
                                styles.button,
                                {
                                    marginBottom: focused || value !== '' ? -8 : 0,
                                },
                            ]}
                            activeOpacity={0.7}>
                            {showPassword ? (
                                <Ionicons name="eye-outline" size={20} color="#A7A7A7" />
                            ) : (
                                <Ionicons name="eye-off-outline" size={20} color="#A7A7A7" />
                            )}
                        </TouchableOpacity>
                    )}

                    {!!ischeck && (
                        <View style={[
                            styles.button,
                            {
                                marginBottom: focused || value !== '' ? -8 : 0,
                            },
                        ]}>
                            <AntDesign name="checkcircle" size={20} color="#4BAE4F" />
                        </View>
                    )}
                </View>
            </View>
            {/* {isError && (
                <Text
                    style={{ marginTop: 5, color: 'red', fontSize: 11, fontFamily: appConfig.fonts.Regular }}>
                    Không được bỏ trống
                </Text>
            )} */}
        </>
    );
}

export default PrimaryTextInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        paddingHorizontal: 20,
        borderRadius: 5,
        height: 54,
        justifyContent: 'center',
        backgroundColor: '#ffff'
    },
    labelText: {
        marginVertical: -10,
        flexDirection: 'row',
    },
    button: {
        height: 36,
        justifyContent: 'center',
    },
});