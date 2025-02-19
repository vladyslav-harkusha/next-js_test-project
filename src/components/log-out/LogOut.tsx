'use client';

import {FC} from "react";
import './LogOut.scss';
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";
import MainButton from "@/components/UI/main-button/MainButton";
import {useDeleteCookie} from "cookies-next";
import {redirect} from "next/navigation";
import {refreshHomePage} from "@/server-actions/refreshHomePage";

type Props = { authUser: IAuthResponseWithTokens }

export const LogOut: FC<Props> = ({ authUser }) => {
    const deleteCookie = useDeleteCookie();

    const handleLogOut = async () => {
        deleteCookie('auth-user');
        deleteCookie('dummyAccessToken');
        deleteCookie('dummyRefreshToken');
        await refreshHomePage();
        redirect('/');
    };

    return (
        <div className='log-out'>
            <h3 className='title-greeting'>
                Hello, <span>{authUser.firstName} {authUser.lastName}</span>, now you have access to Users and Recipes pages
            </h3>

            <div className='wrapper'>
                <p>You can log out from this App</p>
                <MainButton buttonText='Log out' buttonOnclick={handleLogOut}/>
            </div>
        </div>
    );
};