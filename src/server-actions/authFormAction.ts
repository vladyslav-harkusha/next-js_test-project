'use server';

import {getAuthUserData} from "@/services/api.service";

export const authFormAction = async (prevState: any, formData: FormData) => {
    try {
        const authData = {
            username: formData.get('username'),
            password: formData.get('password'),
            expiresInMins: 30,
        };

        const authUser = await getAuthUserData(authData);

        return { ...prevState, data: authUser, error: null };
    } catch (err) {
        console.log("authentication error", err);
        return { ...prevState, data: null, error: "Invalid username or password" }
    }
}