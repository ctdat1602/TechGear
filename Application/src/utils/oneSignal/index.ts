import OneSignal from 'react-native-onesignal';
import { isIOS, isNull } from 'green-native-ts';
import { appConfig } from '~/configs';

export const initOneSignal = async () => {
	await OneSignal.setLogLevel(6, 0);
	await OneSignal.setAppId(appConfig.oneSignalID);

	if (isIOS()) {
		OneSignal.promptForPushNotificationsWithUserResponse(response => {
			console.log('Prompt response:', response);
		});
	}

	OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
		let notification = notificationReceivedEvent.getNotification();
		console.log('notification: ', notification);
		const data = notification.additionalData;
		console.log('additionalData: ', data);
	});

	OneSignal.setNotificationOpenedHandler(notification => {
		console.log('notification:', notification);
	});
};

export const getDeviceID = async () => {
	const deviceState: any = await OneSignal.getDeviceState();
	console.log('getDeviceID User ID: ', deviceState.userId);

	if (!isNull(deviceState.userId)) {
		return deviceState.userId;
	} else {
		getDeviceID();
	}
};
