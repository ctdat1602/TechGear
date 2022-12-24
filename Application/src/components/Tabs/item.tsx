import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { appConfig } from '~/configs';
import tabIcons from '~/lib/tabs';
import { ViewProps } from '~/navigation/types/viewTypes';
import { hideBottomTabs } from '~/store/reducers/bottomTab';

const showText = false;

const TabItem = (props: any) => {
	const { color, tab, text, name } = props;
	const actived = color === appConfig.colors.main ? true : false;
	const insets = useSafeAreaInsets();

	const navigation = useNavigation<ViewProps['navigation']>();
	const dispatch = useDispatch();

	return (
		<TouchableOpacity onPress={() => navigation.navigate(name)} style={[styles.main, { width: appConfig.sizes.dW / tab }]}>
			<View
				style={[
					{
						flex: 1,
						backgroundColor: appConfig.colors.white,
						width: appConfig.sizes.dW / tab,
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}>
				<View style={{ flexDirection: 'row' }}>
					{name == 'HomeTab' && (
						<Image resizeMode="contain" source={actived ? tabIcons.activated.HOME : tabIcons.normal.HOME} style={styles.icon} />
					)}
					{name == 'User' && (
						<Image resizeMode="contain" source={actived ? tabIcons.activated.USER : tabIcons.normal.USER} style={styles.icon} />
					)}
					{name == 'SHOPPING' && (
						<TouchableOpacity style={[styles.shopping, { marginBottom: 45 + insets.bottom }, styles.boxShadow]}
							onPress={() => {
								dispatch(hideBottomTabs());
								navigation.navigate('SHOPPING');
							}}
						>
							{!!text && (
								<View style={styles.wrapNumber}>
									<View style={styles.redRound}>
										<Text style={styles.textNumber}>1</Text>
									</View>
								</View>
							)}

							<Image resizeMode="contain" source={actived ? tabIcons.activated.SHOPPING : tabIcons.normal.SHOPPING} style={styles.icon} />
						</TouchableOpacity>
					)}
					{name == 'Products' && (
						<Image resizeMode="contain" source={actived ? tabIcons.activated.NOTI : tabIcons.normal.NOTI} style={styles.icon} />
					)}
					{name == 'NewPasges' && (
						<Image resizeMode="contain" source={actived ? tabIcons.activated.MESS : tabIcons.normal.MESS} style={styles.icon} />
					)}
				</View>
				{showText && (
					<Text
						style={{
							color: actived ? appConfig.colors.main : '#1C1C1C',
							fontSize: 10,
							fontFamily: appConfig.fonts.Regular,
							marginTop: 4,
						}}>
						{text}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default TabItem;

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24,
	},
	main: {
		flex: 1,
		zIndex: 999999,
	},
	shopping: {
		width: 56,
		height: 56,
		backgroundColor: appConfig.colors.main,
		borderRadius: 999,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapNumber: {
		width: '100%',
		height: 16,
		marginBottom: -10,
		zIndex: 999,
		alignItems: 'center',
		justifyContent: 'center',
	},
	redRound: {
		height: 16,
		width: 16,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 99,
		backgroundColor: appConfig.colors.red,
		marginRight: -15,
	},
	textNumber: {
		fontSize: 11,
		fontFamily: appConfig.fonts.Regular,
		color: '#fff',
		marginTop: -2,
	},
	boxShadow: {
		shadowColor: appConfig.colors.trans50,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 9,
	},
});
