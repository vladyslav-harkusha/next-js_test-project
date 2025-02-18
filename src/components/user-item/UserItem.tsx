'use client';

import './UserItem.scss';
import {IUser} from "@/models/IUser";
import {redirect} from "next/navigation";

type Props = {
    user: IUser;
}

export default function UserItem({ user }: Props) {
    const { id, firstName, lastName, email } = user;

    const handleUserClick = () => {
        redirect(`users/${id}`);
    };

    return (
        <li className='user-item' onClick={handleUserClick}>
            <h4 className='user-name'>{id}: {firstName} {lastName}</h4>
            <span>---email: {email}</span>
        </li>
    );
};