import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"
import { URL_API } from "../services/key"

export type Pivot = {
    user_id: number,
    family_id: number,
    accepted_at: Date,
    role_id: number,
}

export type Family = {
    id: number,
    name: string,
    nbMembres: number,
    created_at: Date,
    updated_at: Date,
    pivot: Pivot,
}

export type Member = {
    id?: number,
    name?: string,
    avatar?: string,
    birthday?: Date,
    firstname?: string,
    email?: string,
    email_verified_at?: "2023-03-15T21:11:11.000000Z"
    role?: number,
}

export type ResponseInvitationArgs = {
    token?: string,
    family_id: number,
    accepted: number,
}

export type CreateFamilyArgs = {
    token?: string,
    family_name: string,
    members: Member[],
}

export const useManyFamilyByUser = () =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getFamiliesByUser/" + accountService.getToken()), 
        queryKey: ["manyFamilyByUser"],
    })

export const useManyInvitationByUser = () =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getInvitationByUser/" + accountService.getToken()), 
        queryKey: ["manyInvitationByUser"],
    })

export const usePostResponseInvitation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (args : ResponseInvitationArgs) => {
            args.token = accountService.getToken()
            return axios
                .post(URL_API + "responseToInvitation", args)
        },
        onSettled() {
            queryClient.invalidateQueries({queryKey : ['manyFamilyByUser','manyInvitationByUser']})
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostCreateFamily = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (args : CreateFamilyArgs) => {
            args.token = accountService.getToken()
            return axios
                .post(URL_API + "createFamily", args)
        },
        onSettled() {
            queryClient.invalidateQueries({queryKey : ['manyFamilyByUser','manyInvitationByUser']})
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const useManyMembersByFamily = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getMembresFamily", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyInvitationByUser"],
    })