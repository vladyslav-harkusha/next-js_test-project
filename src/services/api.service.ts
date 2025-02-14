import axios from "axios";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {ILoginData} from "@/models/ILoginData";
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";
import {IRefreshTokensPair} from "@/models/IRefreshTokensPair";
import {setCookie, getCookie} from "cookies-next";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(requestObj => {
    if (requestObj.method?.toUpperCase() === 'GET') {
        requestObj.headers.Authorization = 'Bearer ' + localStorage.getItem('dummyAccessToken');
    }

    return requestObj;
});

axiosInstance.interceptors.response.use(responseObj => {
    return responseObj;
}, async (error) => {
    if (error.response.status === 401 && getCookie('dummyRefreshToken')) {
        await refreshAuth();
    }

    return error;
});

export const getAuthUserData = async (loginData: ILoginData): Promise<IAuthResponseWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IAuthResponseWithTokens>(urlEndpoints.login, loginData);

    setCookie('authUser', JSON.stringify(userWithTokens), { maxAge: 3600 });
    setCookie('dummyAccessToken', userWithTokens.accessToken, { maxAge: 3600 });
    setCookie('dummyRefreshToken', userWithTokens.refreshToken, { maxAge: 3600 });

    return userWithTokens;
};

export const refreshAuth = async (): Promise<IRefreshTokensPair> => {
    const { data: newTokens } = await axiosInstance.post<IRefreshTokensPair>(urlEndpoints.refresh, {
        refreshToken: getCookie('dummyRefreshToken'),
        expiresInMins: 30
    });

    setCookie('dummyAccessToken', newTokens.accessToken);
    setCookie('dummyRefreshToken', newTokens.refreshToken);

    return newTokens;
};

export type urlParamsType = {
    endpoint: string;
    search: string
    page: number;
    limit: number;
}

export const getEntitiesByUrlParams = async <T>(urlParams: urlParamsType) => {
    const { endpoint, search, page, limit } = urlParams;
    const skip = (page - 1) * limit;
    const response = await axiosInstance.get<T>(`${endpoint + search}skip=${skip}&limit=${limit}`);
    return response.data as T;
};

export const getEntityById = async <T>(endpoint: string, id: string) => {
    const response = await axiosInstance.get<T>(`${endpoint}/${id}`);
    return response.data as T;
};


