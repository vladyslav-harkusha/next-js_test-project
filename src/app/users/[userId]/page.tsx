import './UserPage.scss';
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function UserPage() {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) {
        redirect('/auth')
    }

    return (
        <div className='user-details-page'>
            <h2 className='user-details-page-title'>User details page</h2>
            {/*<UserDetails />*/}
        </div>
    );
};
