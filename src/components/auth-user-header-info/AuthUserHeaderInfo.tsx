'use client'
import './AuthUserHeaderInfo.scss';
import {redirect} from "next/navigation";
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";

type Props = {
    authUser: IAuthResponseWithTokens;
}

export default function AuthUserHeaderInfo({ authUser }: Props) {

    return (
        <div className='auth-user-info' onClick={() => redirect(`users/${authUser.id}`)}>
            <div>
                <p className='username'>username: {authUser.username}</p>
                <p className='user-email'>{authUser.email}</p>
            </div>
            <div className='user-photo-wrapper'>
                <img src={authUser.image} alt="user-photo"/>
            </div>
        </div>
    );
};