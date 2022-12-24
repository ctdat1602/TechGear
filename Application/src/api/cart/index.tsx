import { instance } from '../instance';

const cartApi = {
    order(data: any) {
        return instance.post<IApiResult<any>>('/api/postOrder', data);
    },
    getorder() {
        return instance.post<IApiResult<any>>('/api/order');
    },
};

export { cartApi };