import axios from "axios";
import { getLocalStorage, removeLocalStorage } from "./localStorage";
import { USER_SUB_DOMAIN, USER_TOKEN } from "./variables";
import { setIsAuth } from "./dispatch";

const api = axios.create();

const abortController = new AbortController();

// Handle all configuration of request
api.interceptors.request.use((config) => {
    const token = getLocalStorage(USER_TOKEN);
    const subdomain = getLocalStorage(USER_SUB_DOMAIN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (subdomain) config.baseURL = `https://${subdomain}.ox-sys.com`;
    return config;
});

// Handle errors of all responses
api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        const data = err.response?.data;
        if (data.code === 401) {
            setIsAuth(false);
            removeLocalStorage(USER_TOKEN);
        }
        return Promise.reject(data);
    }
);

export { abortController };
export default api;
