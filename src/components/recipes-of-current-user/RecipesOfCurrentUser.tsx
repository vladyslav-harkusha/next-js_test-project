import './RecipesOfCurrentUser.scss';
import {IRecipesResponse} from "@/models/IRecipesResponse";
import {getEntitiesByUrlParams} from "@/services/api.get-data.service";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {RecipeItem} from "@/components/recipe-item/RecipeItem";

type Props = {
    userId: string
}

export default async function RecipesOfCurrentUser({ userId }: Props) {
    const recipesData: IRecipesResponse | undefined  = await getEntitiesByUrlParams({
        endpoint: urlEndpoints.authRecipes,
        search: '?',
        limit: 50,
        page: 1
    })

    const recipesOfCurrentUser = recipesData?.recipes.filter(recipe => String(recipe.userId) === String(userId));

    return (
        <>
            {!recipesOfCurrentUser || !recipesOfCurrentUser.length
                ? <p className='no-recipes-info'>Current user has no own recipes</p>
                : <ul className='user-recipes'>
                    <p>Recipes of this user:</p>
                    {recipesOfCurrentUser.map(recipe => <RecipeItem key={recipe.id} recipe={recipe} />)}
                </ul>
            }
        </>
    );
};
