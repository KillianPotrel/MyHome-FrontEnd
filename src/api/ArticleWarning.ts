import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
    article_id?: number,
    label?: string,
    is_allergic?: number,
}

export const useManyArticleSearch = (args : string) =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getArticleBySearch", { params: { 
            token: accountService.getToken(),
            search: args,
        }}), 
        queryKey: ["manyArticleSearch"],
    })

export const useManyArticleWarning = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getArticleWarningUser", { params: { 
            token: accountService.getToken()
        }}), 
        queryKey: ["manyArticleWarning"],
    })
    
    
export const usePostArticleWarning = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (article: ArticleWarning) => axios.post(URL_API + "setArticleWarningUser", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
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