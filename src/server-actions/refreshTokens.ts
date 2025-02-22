'use server';

import { cookies } from 'next/headers';

export async function setNewAuthCookies(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    try {
        cookieStore.set("dummyAccessToken", accessToken, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            maxAge:  60*60
        });

        cookieStore.set("dummyRefreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
        });

        return { success: true, message: 'Cookies are update' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Updating cookies error' };
    }
}