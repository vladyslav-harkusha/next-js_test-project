'use server';

import { cookies } from 'next/headers';

export async function setNewAuthCookies(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    try {
        cookieStore.set({
            name: 'dummyAccessToken',
            value: accessToken,
        });

        cookieStore.set({
            name: 'dummyRefreshToken',
            value: refreshToken,
        });

        return { success: true, message: 'Cookies are update' };
    } catch (error) {
        console.error('Ошибка установки cookies:', error);
        return { success: false, message: 'Updating cookies error' };
    }
}