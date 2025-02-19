import './RecipesPage.scss';
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import SearchComponent from "@/components/search-component/SearchComponent";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {Suspense} from "react";
import Loader from "@/components/UI/loader/Loader";
import {SearchParams} from "next/dist/server/request/search-params";
import RecipesList from "@/components/recipes-list/RecipesList";

type Props = { searchParams: Promise<SearchParams> }

export default async function RecipesPage({ searchParams }: Props) {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) redirect('/auth');

    return (
        <div className='recipes-page'>
            <h2 className='recipes-page-title'>Recipes page</h2>
            <SearchComponent urlEndpoint={urlEndpoints.recipes} />
            <Suspense fallback={<Loader />}>
                <RecipesList searchParams={searchParams} />
            </Suspense>
            <Pagination totalItems={50} />
        </div>
    );
}
