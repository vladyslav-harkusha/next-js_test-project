import './UserPage.scss';
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import UserDetails from "@/components/user-details/UserDetails";
import {Params} from "next/dist/server/request/params";
import {Suspense} from "react";
import Loader from "@/components/UI/loader/Loader";

type Props = { params: Promise<Params> }

export default async function UserPage({ params }: Props) {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) redirect('/auth');

    const { userId } = await params;

    return (
        <div className='user-details-page'>
            <h2 className='user-details-page-title'>User details page</h2>
            <Suspense fallback={<Loader />}>
                <UserDetails userId={String(userId)} />
            </Suspense>
        </div>
    );
};
