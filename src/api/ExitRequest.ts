import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../services/account.service"
import axios from "axios"
import { FetchError } from "../type/fetchError"
import { URL_API } from "../services/key"
import { User } from "./User"

export type ExitRequest = {
    id?: number, 
    date_debut: Date, 
    date_fin: Date, 
    motif: string,
    token?: string,
    user?: User
}

export type ResponseExitRequestParams = {
    token?: string,
    exit_request_id: number,
    accepted: number
}

export const useManyExitRequest = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getExitRequest", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyExitRequest"],
    })

export const usePostExitRequest = () => {
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
        onError(err: FetchError) {
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
                    exit_request_id: params.exit_request_id,
                    accepted: params.accepted,
                })
        },
        onSettled() {
            queryClient.invalidateQueries(["manyExitRequest"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}