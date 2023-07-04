import axios from 'axios';

// console.log('import.meta.env.mode', import.meta.env);

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_APIURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    timeout: 20000
});

instance.interceptors.request.use(config => {
    // config.headers.token = localStorage.getItem("SI_TOKEN");
    config.headers = {
        ...config.headers,
        // Authorization: `Bearer ${localStorage.getItem('SI_TOKEN')|| ''}`
    };
    // console.log("config",config)
    return config;
});

instance.interceptors.response.use(
    res => {
        return res;
    },
    function (error) {
        // handle global error
        // console.log(error.response);
        if (error.code === 'ECONNABORTED') {
            console.log('連線時間過長');
        }

        return Promise.reject(error);
    }
);

export default function (method, url, data = null, config) {
    method = method.toLowerCase();
    switch (method) {
        case 'post':
            return instance.post(url, data, config);
        case 'get':
            return instance.get(url, { params: data });
        case 'delete':
            return instance.delete(url, { params: data });
        case 'put':
            return instance.put(url, data);
        case 'patch':
            return instance.patch(url, data);
        default:
            console.log(`未知的 method: ${method}`);
            return false;
    }
}
