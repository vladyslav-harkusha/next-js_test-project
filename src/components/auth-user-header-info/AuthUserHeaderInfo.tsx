'use client'

import './AuthUserHeaderInfo.scss';
import {redirect} from "next/navigation";
import {IAuthResponseWithTokens} from "@/models/IAuthResponseWithTokens";
import Image from "next/image";

type Props = { authUser: IAuthResponseWithTokens }

export default function AuthUserHeaderInfo({ authUser }: Props) {

    return (
        <div className='auth-user-info' onClick={() => redirect(`users/${authUser.id}`)}>
            <div>
                <p className='username'>username: {authUser.username}</p>
                <p className='user-email'>{authUser.email}</p>
            </div>
            <div className='user-photo-wrapper'>
                <Image fill sizes="9vh" src={authUser.image} alt="auth-user-photo"/>
            </div>
        </div>
    );
};