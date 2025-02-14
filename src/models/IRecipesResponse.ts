import {IRecipe} from "./IRecipe.ts";

export interface IRecipesResponse {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}