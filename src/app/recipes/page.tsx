import './RecipesPage.scss';
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function RecipesPage() {
    const isAuthorized = await hasCookie('auth-user', { cookies });
    if (!isAuthorized) {
        redirect('/auth')
    }

    // const totalRecipesCount = 50;

    return (
        <div className='recipes-page'>
            <h2 className='recipes-page-title'>Recipes page</h2>
            {/*<SearchComponent urlEndpoint={urlEndpoints.allRecipes} />*/}
            {/*<RecipesList />*/}
            {/*<Pagination totalItems={totalRecipesCount} />*/}
        </div>
    );
};
