import { useQuery } from "@tanstack/react-query"
import { Recipe } from "./Recipe"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"

export type Meal = {
    id: number,
    family_id: number,
    jour: string,
    is_lunch: number,
    recipes: Recipe[],
    recipes_custom: Recipe[]
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