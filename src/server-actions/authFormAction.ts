'use server';

import {setCookie} from "cookies-next";
import {cookies} from "next/headers";
import {getAuthUserData} from "@/services/api.auth.service";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const authFormAction = async (prevState: any, formData: FormData) => {
    try {
        const authData = {
            username: formData.get('username'),
            password: formData.get('password'),
            expiresInMins: 1,
        };

        const authUser = await getAuthUserData(authData);
        await setCookie('auth-user', JSON.stringify(authUser), {cookies});
        await setCookie('dummyAccessToken', authUser.accessToken, {cookies});
        await setCookie('dummyRefreshToken', authUser.refreshToken, {cookies});

        return { ...prevState, data: authUser, error: null };
    } catch (err) {
        console.log("authentication error", err);
        return { ...prevState, data: null, error: "Invalid username or password" }
    }
}