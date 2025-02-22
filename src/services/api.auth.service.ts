import axios from "axios";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {ILoginData} from "@/models/ILoginData";
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {IRefreshTokensPair} from "@/models/IRefreshTokensPair";
import {setNewAuthCookies} from "@/server-actions/refreshTokens";

export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await getCookie('dummyAccessToken', {cookies});

        if (accessToken && config.method?.toUpperCase() === 'GET') {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        console.log(error)
    }
);

export const getAuthUserData = async (loginData: ILoginData): Promise<IAuthResponseWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IAuthResponseWithTokens>(urlEndpoints.login, loginData);

    return userWithTokens;
};

export const getNewTokens = async (): Promise<IRefreshTokensPair> => {
    const refreshToken = await getCookie('dummyRefreshToken', {cookies});

    const { data: newTokens } = await axiosInstance.post<IRefreshTokensPair>(urlEndpoints.refresh, {
        refreshToken,
        expiresInMins: 60
    });

    return newTokens;
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const tokensPair = await getNewTokens();

                await setNewAuthCookies(tokensPair.accessToken, tokensPair.refreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${tokensPair.accessToken}`;

                return axios(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
