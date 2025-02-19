import './UsersPage.scss';
import {urlEndpoints} from "@/constants/urlEndpoints";
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SearchParams} from "next/dist/server/request/search-params";
import UsersList from "@/components/users-list/UsersList";
import Pagination from "@/components/pagination/Pagination";
import Loader from "@/components/UI/loader/Loader";
import {SearchComponent} from "@/components/search-component/SearchComponent";
import {Suspense} from "react";

type Props = {
    searchParams: Promise<SearchParams>;
}

export default async function UsersPage({ searchParams }: Props) {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) redirect('/auth');

    return (
        <div className='users-page'>
            <h2 className='users-page-title'>Users page</h2>
            <SearchComponent urlEndpoint={urlEndpoints.users} />
            <Suspense fallback={<Loader />}>
                <UsersList searchParams={searchParams}/>
            </Suspense>
            <Pagination totalItems={208} />
        </div>
    );
};
