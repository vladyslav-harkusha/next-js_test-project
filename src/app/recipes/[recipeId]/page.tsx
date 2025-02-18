import './RecipePage.scss';
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function RecipePage() {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) {
        redirect('/auth')
    }

    return (
        <div className='recipe-details-page'>
            <h2 className='recipe-details-page-title'>Recipe details page</h2>
            {/*<RecipeDetails/>*/}
        </div>
    );
};
