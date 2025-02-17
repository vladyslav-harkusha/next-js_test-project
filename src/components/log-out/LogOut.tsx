import {FC} from "react";

import './LogOut.scss';
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";
import MainButton from "@/components/UI/main-button/MainButton";

type Props = {
    authUser: IAuthResponseWithTokens;
}

export const LogOut: FC<Props> = ({ authUser }) => {


    const handleLogOut = () => {
        // localStorage.setItem('dummyAccessToken', '');
        // localStorage.setItem('dummyRefreshToken', '');
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