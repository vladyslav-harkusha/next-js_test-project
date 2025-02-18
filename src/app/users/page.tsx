import './UsersPage.scss';
import {urlEndpoints} from "@/constants/urlEndpoints";
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {getEntitiesByUrlParams} from "@/services/api.get-data.service";

export default async function UsersPage() {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) {
        redirect('/auth')
    }

    const users = await getEntitiesByUrlParams({
        endpoint: 'auth/users',
        search: '?',
        limit: 15,
        page: 1
    });

    return (
        <div className='users-page'>
            <h2 className='users-page-title'>Users page</h2>
            <p>{JSON.stringify(users)}</p>
            {/*<SearchComponent urlEndpoint={urlEndpoints.allUsers} />*/}
            {/*<UsersList />*/}
            {/*<Pagination totalItems={totalUsersCount} />*/}
        </div>
    );
};
