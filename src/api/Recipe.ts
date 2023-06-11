import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/account.service";
import { URL_API } from "../services/key";
import axios from "axios";
import { FetchError } from "../type/fetchError";
import { RecipeStep } from "./RecipeStep";
import { ArticleCustom, ArticleRecipe } from "./Article";

export type Recipe = {
    id: number,
    title: string,
    category_id: number,
    cooking_time: number,
    preparation_time: number,
    difficulty: number,
    image: string,
    recipe_steps: RecipeStep[],
    recipe_articles: ArticleRecipe[],
    family_id: number,
    created_at: Date,
    updated_at: Date
}

export const useManyRecipeByFamily = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getAllRecipes", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyRecipe"],
    })

export const usePostRecipe = () => {
    return useMutation({
        mutationFn: () => {
            return axios
                .post(URL_API + "createRecipe", {
                    token : accountService.getToken(),
                    family_id : accountService.getFamily()
                })
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useOneRecipeById = (recipe_id : number) =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getRecipeById", { params: { 
            token: accountService.getToken(),
            recipe_id
        }}), 
        queryKey: ["manyRecipe"],
    })
    
export const useDeleteRecipe = () => {
    return useMutation({
        mutationFn: (recipe_id : number) => {
            return axios.post(URL_API + "deleteRecipeById", { 
            token: accountService.getToken(),
            family_id: parseInt(accountService.getFamily()),
            recipe_id
        })}, 
        onError(err: FetchError) {
            return err
        },
    })
}