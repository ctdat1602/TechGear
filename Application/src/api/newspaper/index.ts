import { instance } from '../instance';

// http://IP_ADDRESS:3000/api/...

const NewspaperApi = {
    newspaper() {
        return instance.get<IApiResult<any>>('/api/newspaper');
    },
    newspaperID(ID: any) {
        return instance.get<IApiResult<any>>(`/api/newspaper/${ID}`);
    },
};

export { NewspaperApi };
