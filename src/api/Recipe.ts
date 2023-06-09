import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../services/account.service";
import { URL_API } from "../services/key";
import axios from "axios";
import { FetchError } from "../type/fetchError";

export type Recipe = {
    id: number,
    title: string,
    category_id: number,
    cooking_time: number,
    preparation_time: number,
    difficulty: number,
    image: string,
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