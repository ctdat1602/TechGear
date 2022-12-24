import { instance } from '../instance';

const accountApi = {
	login(data: any) {
		return instance.post<IApiResult<any>>('/api/login', data);
	},
	register(data: any) {
		return instance.post<IApiResult<any>>('/api/Register', data);
	},
};

export { accountApi };
