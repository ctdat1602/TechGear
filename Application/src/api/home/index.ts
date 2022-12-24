import { instance } from '../instance';

const HomeApi = {
    categories() {
        return instance.get<IApiResult<any>>('/api/categories');
    },
    categoriesID(ID: any) {
        return instance.get<IApiResult<any>>(`/api/filterByCategory/${ID}`);
    },
    topDiscount() {
        return instance.get<IApiResult<any>>('/api/topDiscount');
    },
};

export { HomeApi };
