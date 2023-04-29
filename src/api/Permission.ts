import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { FetchError } from "../type/fetchError"
import { accountService } from "../services/account.service"

export type Permission = {
    id: number,
    key: string,
    label: string,
    created_at: Date,
    updated_at: Date,
}


export const useGetManyPermission = () =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getAllPermissions", { params: { token: accountService.getToken() } }), 
        queryKey: ["manyPermission"],
    })