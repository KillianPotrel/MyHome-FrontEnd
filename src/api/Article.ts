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
    label: string,
    quantity: number,
    unit: string,
}

export type ArticleParams = {
    article_recipe?: ArticleRecipe
    article_warning?: ArticleWarning, 
    article_shopping?: ArticleShopping,
    entity_id?: number
}

export type ArticleShopping = {
    id?:number,
    shopping_id?: number,
    checked_at?: number,
    is_generate?: number,
    article_id?: number, 
    article_custom_id?: number,
    is_custom?: number,
    label?: string,
    quantity?: number,
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
    return useMutation({
        mutationFn: () => axios.post(URL_API + "setIngredientRecipe", { 
            token: accountService.getToken(),
            family_id: parseInt(accountService.getFamily()),
            is_custom: params.article_recipe.article_custom,
            recipe_id: params.entity_id,
            article_id: params.article_recipe.article_id,
            label: params.article_recipe.label,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["oneRecipe", params.entity_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useDeleteArticleRecipe = (params : ArticleParams) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => axios.post(URL_API + "deleteIngredientRecipe", { 
            token: accountService.getToken(),
            ingredient_recipe_id: params.article_recipe.id,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["oneRecipe",params.entity_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useArticleShoppingList = (shopping_id : number) =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getArticleShoppingList", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            shopping_id,
        }}), 
        queryKey: ["manyArticleShopping",shopping_id],
    })

export const usePostArticleShopping = (article: ArticleParams) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (s) => { 
            return axios.post(URL_API + "putArticlesToShoppingList", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            shopping_id : article.entity_id,
            is_custom: article.article_shopping.is_custom,
            article_id: article.article_shopping.article_id,
            label: article.article_shopping.label,
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["oneListById", article.entity_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePutArticleShopping = (shopping_id : number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleShopping) => axios.post(URL_API + "putArticleShopping", { 
            token: accountService.getToken(),
            id_article_shopping : article.id, 
            quantity: article.quantity,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["oneListById", shopping_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useCheckArticleShopping = (shopping_id : number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleShopping) => axios.post(URL_API + "putArticleShopping", { 
            token: accountService.getToken(),
            id_article_shopping : article.id, 
            checked_at : article.checked_at  === null ? 1 : 0, 
        }), 
        onSettled() {
            queryClient.invalidateQueries(["oneListById", shopping_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useDeleteArticleShopping = (shopping_id : number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleShopping) => axios.post(URL_API + "deleteArticleShopping", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            id_article_shopping: article.id,
        }), 
        onSettled() {
            queryClient.invalidateQueries(["oneListById", shopping_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}