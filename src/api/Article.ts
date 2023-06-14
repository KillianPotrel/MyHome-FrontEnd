import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"

export type ArticleSearch = {
    id?: number,
    created_at?: Date,
    updated_at?: Date,
    code?: string,
    product_name: string,
    product_img?: string,
    is_custom?: number,
    countries_fr?: string,
}

export type ArticleCustom = {
    token: string,
    family: string,
    label: string,
}

export type ArticleWarning = {
    id?: number,
    token?: string,
    family_id?: number,
    is_custom?: number,
    article_id?: number,
    label?: string,
    is_allergic?: number,
}

export type ArticleRecipe = {
    id: number,
    recipe_id: number,
    article_custom ?: number,
    article_id ?: number,
    product_name: string,
    quantity: number,
    unit: string,
}

export type ArticleParams = {
    article_recipe?: ArticleRecipe
    article_warning?: ArticleWarning, 
    recipe_id?: number
}

export const useManyArticleSearch = (args : string) =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getArticleBySearch", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            search: args,
        }}), 
        queryKey: ["manyArticleSearch"],
    })

export const useManyArticleWarning = (user_id ?: number) =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getArticleWarningUser", { params: { 
            token: accountService.getToken(),
            user_id,
        }}), 
        queryKey: ["manyArticleWarning"],
    })
    
    
export const usePostArticleWarning = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleWarning) => axios.post(URL_API + "setArticleWarningUser", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            is_custom: article.is_custom,
            article_id: article.article_id,
            label: article.label,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["manyArticleWarning"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useDeleteArticleWarning = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleWarning) => axios.post(URL_API + "deleteArticleWarningUser", { 
            token: accountService.getToken(),
            article_warning_id: article.id,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["manyArticleWarning"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePutArticleWarning = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleWarning) => axios.post(URL_API + "setArticleWarningUserAlergique", { 
            token: accountService.getToken(),
            article_warning_id: article.id,
            is_allergic: article.is_allergic === 1 ? 0 : 1
        }), 
        onSettled() {
            queryClient.invalidateQueries(["manyArticleWarning"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostArticleRecipe = (params : ArticleParams) => {
    const queryClient = useQueryClient()
    console.log()
    return useMutation({
        mutationFn: () => axios.post(URL_API + "setIngredientRecipe", { 
            token: accountService.getToken(),
            family_id: parseInt(accountService.getFamily()),
            is_custom: params.article_recipe.article_custom,
            recipe_id: params.recipe_id,
            article_id: params.article_recipe.article_id,
            label: params.article_recipe.product_name,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["oneRecipe", params.recipe_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useDeleteArticleRecipe = (params : ArticleParams) => {
    const queryClient = useQueryClient()
    // console.log(params)
    return useMutation({
        mutationFn: () => axios.post(URL_API + "deleteIngredientRecipe", { 
            token: accountService.getToken(),
            ingredient_recipe_id: params.article_recipe.id,
        }), 
        onSettled() {
            console.log(params)
            queryClient.invalidateQueries(["oneRecipe",params.recipe_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}