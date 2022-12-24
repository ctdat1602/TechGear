import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { appConfig } from '~/configs';

const ErrorText = (props: any) => {
	const { content } = props;

	return <>{!!content && <Text style={styles.text}>{content || ''}</Text>}</>;
};

export default ErrorText;

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		color: appConfig.colors.red,
		fontFamily: appConfig.fonts.Regular,
		width: '100%',
		textAlign: 'center',
		marginBottom: 10,
	},
});
