import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../services/account.service"
import axios from "axios"
import { FetchError } from "../type/fetchError"
import { URL_API } from "../services/key"
import { User } from "./User"
import { errorToast, successToast } from "../services/toastify.service"

export type ExitRequest = {
    id?: number, 
    date_debut: Date, 
    date_fin: Date, 
    motif: string,
    token?: string,
    user?: User,
    userResponse?: string,
}

export type ResponseExitRequestParams = {
    token?: string,
    exit_request_id: number,
    accepted: number
}

export const useManyExitRequest = (status: string) =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getExitRequest", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            status,
        }}), 
        queryKey: ["manyExitRequest", status],
    })

export const useOneExitRequest = (exit_request_id : number) =>
    useQuery({
        queryFn: () =>{
            if(exit_request_id) {
                return axios.get(URL_API + "getExitRequestById", { params: { 
                    token: accountService.getToken(),
                    family_id: accountService.getFamily(),
                    exit_request_id,
                }})
            }
            return null 
        },
        queryKey: ["oneExitRequest", exit_request_id],
    })

export const usePostExitRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (existRequest : ExitRequest) => {
            return axios
                .post(URL_API + "exitRequest",  { 
                    token: accountService.getToken(),
                    family_id: accountService.getFamily(),
                    motif: existRequest.motif,
                    date_debut: existRequest.date_debut,
                    date_fin: existRequest.date_fin,
                })
        },
        onSuccess() {
            successToast("Demande effectué");
        },
        onSettled() {
            queryClient.invalidateQueries(["manyExitRequest"])
        },
        onError(err: FetchError) {
            errorToast("Erreur lors de la demande de sortie");
            return err
        },
    })
}

export const useResponseExitRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (params : ResponseExitRequestParams) => {
            return axios
                .post(URL_API + "responseExitRequest",  {
                    token: accountService.getToken(),
                    family_id: accountService.getFamily(),
                    exit_request_id: params.exit_request_id,
                    accepted: params.accepted,
                })
        },
        onSettled() {
            queryClient.invalidateQueries(["manyExitRequest", "waiting"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}