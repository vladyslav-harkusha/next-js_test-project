import './RecipeDetails.scss';
import Link from "next/link";
import {urlEndpoints} from "@/constants/urlEndpoints";
import {getEntityById} from "@/services/api.get-data.service";
import {IRecipe} from "@/models/IRecipe";
import Image from 'next/image';

type Props = { recipeId: string }

export default async function RecipeDetails({ recipeId }: Props) {
    const currentRecipe = await getEntityById<IRecipe>(urlEndpoints.authRecipes, recipeId);

    if (!currentRecipe) return <h2 className='not-found-message'>Recipe with id=<span>{recipeId}</span> is not found</h2>
    const { name, userId, id, image, ingredients, instructions } = currentRecipe;

    return (
        <div className='recipe-details'>
            <h3 className='title'>recipe №{id}: {name}</h3>
            <div className='wrapper'>
                <Image src={image} width={400} height={400} alt={name} loading={"lazy"}/>
                <div className='instructions'>
                    <ul className='ingredients-list'>
                        <p>ingredients:</p>
                        {ingredients.map((ingredient, id) => (
                            <li key={ingredient} className='ingredient-item'>{id + 1}: {ingredient}</li>
                        ))}
                    </ul>

                    <ul className='instructions-list'>
                        <p>instructions:</p>
                        {instructions.map((instruction, id) => (
                            <li key={instruction} className='instruction-item'>{id + 1}: {instruction}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <Link href={urlEndpoints.users + '/' + userId} className='link-to-author'>Go to recipe author page {`>>`}</Link>
        </div>
    );
};