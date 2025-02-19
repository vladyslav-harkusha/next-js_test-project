import './RecipesList.scss';
import {SearchParams} from "next/dist/server/request/search-params";
import {getEntitiesByUrlParams} from "@/services/api.get-data.service";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {IRecipesResponse} from "@/models/IRecipesResponse";
import {RecipeItem} from "@/components/recipe-item/RecipeItem";

type Props = { searchParams: Promise<SearchParams> }

export default async function RecipesLis({ searchParams }: Props) {
    const recipesParams = await searchParams;

    const recipesData = await getEntitiesByUrlParams<IRecipesResponse>({
        endpoint: urlEndpoints.authRecipes,
        search: recipesParams.searchParams || '?',
        limit: Number(recipesParams.limit) || 15,
        page: Number(recipesParams.page) || 1
    });

    if (!recipesData) return <h2>Load recipes error</h2>;
    const recipes  = recipesData.recipes;

    return (
        <div className='recipes-list'>
            <p className='recipes-list-description'>
                {recipes.length
                    ? 'click on recipe item to see recipe details / click on #hashtag to search recipes by hashtag'
                    : 'no recipes found'
                }
            </p>
            <ul>
                {recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
            </ul>
        </div>
    );
};