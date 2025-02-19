'use client';

import {FC} from "react";
import './RecipeItem.scss';
import cn from 'classnames';
import {IRecipe} from "@/models/IRecipe";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import {urlEndpoints} from "@/constants/urlEndpoints";

type Props = { recipe: IRecipe }

export const RecipeItem: FC<Props> = ({ recipe }) => {
    const { id, name, tags } = recipe;
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();

    const handleRecipeClick = () => {
        redirect(`${urlEndpoints.recipes}/${id}`);
    };

    const handleTagClick = (recipeTag: string) => {
        params.set('searchParams', `/tag/${recipeTag}?`);
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const hashTag = params.get('searchParams') || '';

    return (
        <li className='recipe-item'>
            <h4 className='recipe-name' onClick={handleRecipeClick}>{id}: {name}</h4>
            <ul className='recipe-tags-list'>
                {tags.map(tag => (
                    <li
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={cn('recipe-tag-item', {'tag--active': tag === hashTag.slice(5, hashTag.length - 1)})}
                    >
                        #{tag}
                    </li>
                ))}
            </ul>
        </li>
    );
};