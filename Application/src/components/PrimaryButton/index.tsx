import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { appConfig } from '~/configs';

type IPrimaryButton = {
    title: string;
    onPress?: Function;
    loading?: boolean;
    isbutoom?: boolean;
    style?: any;
};

const PrimaryButton = (props: IPrimaryButton) => {
    const { title, onPress, loading } = props;

    return (
        <TouchableOpacity
            onPress={() => {
                !!onPress ? onPress() : {};
            }}
            activeOpacity={0.5}
            style={[styles.container, { ...props.style }]}>
            <Text style={styles.title}>{title}</Text>
            {!!loading && <ActivityIndicator color="#FDFDFD" size="small" style={styles.loading} />}
        </TouchableOpacity>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: appConfig.colors.main,
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        color: '#FDFDFD',
        fontFamily: appConfig.fonts.SemiBold,
    },
    loading: {
        marginLeft: 10,
    },
})