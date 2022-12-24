import { instance } from '../instance';

const productApi = {
    product() {
        return instance.get<IApiResult<any>>('/api/sortPriceHighToLow');
    },
    search(data: any) {
        return instance.get<IApiResult<any>>(`/api/search/${data}`);
    }
};

export { productApi };
