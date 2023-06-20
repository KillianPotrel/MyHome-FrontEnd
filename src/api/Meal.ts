import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Recipe } from "./Recipe"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"
import { errorToast, successToast } from "../services/toastify.service"

export type Meal = {
    id: number,
    family_id: number,
    day: string,
    is_lunch: number,
    recipes: Recipe[],
    recipes_custom: Recipe[]
}

export type RecipeMealParams = {
    recipe_id?: number,
    meal_id?: number,
    is_custom?: number, 
    label?: string,
}

export type MealParams = {
    day: Date,
    is_lunch: number,
}

export const useManyMeal = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getAllMenus", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyMeal"],
    })
    
export const useOneMeal = (meal_id : number) =>
    useQuery({
        queryFn: () =>{
            if(meal_id) {

                return axios.get(URL_API + "getMenuById", { params: { 
                    token: accountService.getToken(),
                    menu_id: meal_id,
                }})
            }
            return null 
        },
        queryKey: ["oneMeal", meal_id],
    })
    
export const usePutRegenerateRecipeMeal = (meal_id : number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params : RecipeMealParams) =>  axios.post(URL_API + "putRegenerateRecipe", {
                    token: accountService.getToken(),
                    menu_id: meal_id,
                    is_custom: params.is_custom,
                    recipe_id: params.recipe_id,
                })
        ,
        onSettled() {
            queryClient.invalidateQueries(["oneMeal", meal_id])
        },
        onError(err: FetchError) {
            if(err.response.status === 403){
                errorToast("Vous n'avez pas d'autres recettes de la même catégorie pour pouvoir en générer une nouvelle.");
            }
            return err
        },
    })
}

export const useDeleteRecipeMeal = (meal_id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params : RecipeMealParams) => {
            return axios.post(URL_API + "deleteMenuRecipeId", { 
                token: accountService.getToken(),
                recipe_id: params.recipe_id,
                menu_id: meal_id,
                is_custom: params.is_custom,
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["oneMeal", meal_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostRecipeMeal = (meal_id : number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params : RecipeMealParams) => {
            return axios.post(URL_API + "postRecipeOnMenu", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                recipe_id: params.recipe_id,
                menu_id: params.meal_id,
                is_custom: params.is_custom,
                label: params.label,
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["oneMeal", meal_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostMeal = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params : MealParams) => {
            return axios.post(URL_API + "postMenu", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                day: params.day,
                is_lunch: params.is_lunch,
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["manyMeal"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}