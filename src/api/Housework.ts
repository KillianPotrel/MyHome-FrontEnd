import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import axios from "axios"
import { FetchError } from "../type/fetchError"
import { successToast } from "../services/toastify.service"

export type Housework = {
    id: number,
    title: string,
    responsable_id: number,
    day_id: number,
    periodicity: number,
    date: Date,
    family_id: number,
    responsable_name: string,
}

export type HouseworkParams = {
    family_id?: number,
    title: string,
    responsable_id: number,
    day_id?: number,
    periodicity?: number,
    date?: Date,
}

export const useManyHousework = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getAllHouseWorkByFamily", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyHousework"],
    })
    

export const usePostHousework = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params : HouseworkParams) => {
            return axios.post(URL_API + "postHouseWork", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                title: params.title,
                responsable_id: params.responsable_id,
                day_id: params.day_id,
                periodicity: params.periodicity,
                date: params.date,
        })}, 
        onSuccess() {
            successToast("Tâche ajoutée")
        },
        onSettled() {
            queryClient.invalidateQueries(["manyHousework"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useDeleteHousework = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (housework_id : number) => {
            return axios.post(URL_API + "deleteHouseWorkById", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                housework_id,
        })}, 
        onSuccess() {
            successToast("Tâche supprimée")
        },
        onSettled() {
            queryClient.invalidateQueries(["manyHousework"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

    
