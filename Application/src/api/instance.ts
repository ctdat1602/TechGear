import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { appConfig } from '~/configs';

// GET CONFIG URL
function getUrl(config: any) {
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '').split('?')[0];
    }
    return config.url;
}

// API INSTANCE
export const instance = axios.create({
    baseURL: appConfig.hostURL,
    headers: {
        Accept: 'application/json',
    },
});

// SENT REQUEST
instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const url = getUrl(config);
        // CONSOLE LOG CALL API
        console.log(`%c ${config.method?.toString().toUpperCase()} - ${url}:`, 'color: #0086b3; font-weight: bold', config);
        return config;
    },
    error => {
        console.log(`%c ${error.response.status}  :`, 'color: red; font-weight: bold', error.response.data);
        return Promise.reject(error);
    },
);

// RESPONSE
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(response);
        console.log(` %c ${response.status} - ${getUrl(response.config)}:`, 'color: #008000; font-weight: bold', {
            ...response,
            config: response.config,
        });
        return response;
    },
    function (error) {
        if (error.response) {
            console.log(`%c ${error.response.status}  :`, 'color: red; font-weight: bold', error.response.data);
            return Promise.reject({
                status: error.response.status,
                message: error.response.data.message,
            });
        } else if (error.request) {
            console.log(`%c ${JSON.stringify(error)}  :`, 'color: red; font-weight: bold', error.response.data);
            return Promise.reject(error.request);
        } else {
            console.log(`%c ${JSON.stringify(error)}  :`, 'color: red; font-weight: bold', 'có gì đó sai sai, hình như là setting sai');
            return Promise.reject(error);
        }
    },
);
