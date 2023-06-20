import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"
import { ArticleShopping } from "./Article"
import { successToast, warningToast } from "../services/toastify.service"

export type ShoppingList = {
    id: number,
    family_id: number,
    archived_at: string,
    nb_articles?: number,
    shopping_articles: ArticleShopping[],
}


export const useManyListArchived = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getShoppingListArchived", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyListArchived"],
    })
    
export const useOneListCurrent = () =>
    useQuery({
        queryFn: () =>{
            return axios.get(URL_API + "getFamilyShoppingList", { params: { 
                token: accountService.getToken(),
                family_id: accountService.getFamily()
                }})
        },
        queryKey: ["oneListCurrent"],
    })

export const useOneListById = (shopping_id : number) =>
    useQuery({
        queryFn: () =>{
            return axios.get(URL_API + "getShoppingListById", { params: { 
                token: accountService.getToken(),
                shopping_list_id: shopping_id,
                }})
        },
        queryKey: ["oneListById", shopping_id],
    })

export const useDeleteShoppingArchived = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (shopping_id : number) => {
            return axios.post(URL_API + "deleteArchivedList", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                shopping_list_id: shopping_id,
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["manyListArchived"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useArchiveCurrentList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => {
            return axios.post(URL_API + "archivedShoppingList", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["oneListCurrent"])
            queryClient.invalidateQueries(["manyListArchived"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useDuplicateArticleInCurrent = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (shopping_id : number) => {
            return axios.post(URL_API + "postArticleArchivedInCurrent", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                shopping_list_id: shopping_id,
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["oneListCurrent"])
            queryClient.invalidateQueries(["manyListArchived"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useGenerateArticleByRecipe = () => {
    return useMutation({
        mutationFn: (recipe_id : number) => {
            return axios.post(URL_API + "generateShoppingListByRecipe", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                recipe_id,
        })}, 
        onSuccess() {
            successToast("Vos articles de la recette ont été ajouté à la liste de course")
            warningToast("Pensez à vérifier les quantités des articles ajoutés")
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useGenerateArticleByMeal = () => {
    return useMutation({
        mutationFn: (menu_id : number) => {
            return axios.post(URL_API + "generateShoppingListByMenu", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                menu_id,
        })}, 
        onSuccess() {
            successToast("Vos articles du menu ont été ajouté à la liste de course")
            warningToast("Pensez à vérifier les quantités des articles ajoutés")
        },
        onError(err: FetchError) {
            return err
        },
    })
}
