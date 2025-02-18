import axios from "axios";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {ILoginData} from "@/models/ILoginData";
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {IRefreshTokensPair} from "@/models/IRefreshTokensPair";
import {setNewAuthCookies} from "@/server-actions/refreshTokens";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
        expiresInMins: 1
    });

    return newTokens;
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            originalRequest._retry = true;

            try {
                const tokensPair = await getNewTokens();
                console.log(tokensPair);

                await fetch('http://localhost:3000/auth/api', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tokensPair)
                });

                originalRequest.headers["Authorization"] = `Bearer ${tokensPair.accessToken}`;

                return axios(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
