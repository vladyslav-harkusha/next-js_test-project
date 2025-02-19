import './RecipePage.scss';
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Params} from "next/dist/server/request/params";
import {Suspense} from "react";
import Loader from "@/components/UI/loader/Loader";
import RecipeDetails from "@/components/recipe-details/RecipeDetails";

type Props = { params: Promise<Params> }

export default async function RecipePage({ params }: Props) {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) redirect('/auth');

    const { recipeId } = await params;

    return (
        <div className='recipe-details-page'>
            <h2 className='recipe-details-page-title'>Recipe details page</h2>
            <Suspense fallback={<Loader />}>
                <RecipeDetails recipeId={String(recipeId)} />
            </Suspense>
        </div>
    );
};
