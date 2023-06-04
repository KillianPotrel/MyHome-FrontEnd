import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"

export type Permission = {
    id: number,
    key: string,
    label: string,
    created_at: Date,
    updated_at: Date,
}

export type MutationArgs = {
    permission : Permission,
    activate: number
}


export const useManyPermission = () =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getAllPermissions", { params: { token: accountService.getToken() } }), 
        queryKey: ["manyPermission"],
    })


export const useManyPermissionUserFamily = (args_user_id : number) =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getPermissionsByFamily", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            user_id: args_user_id 
        }}), 
        queryKey: ["manyPermissionUserFamily",args_user_id],
    })
    
export const usePutPermissionUser = (user_id : number) => {
    const queryClient = useQueryClient()
    return useMutation({
        //permission: Permission, user_id, activate
        mutationFn: (args : MutationArgs) => axios.post(URL_API + "editPermissionsByFamilleUser", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            user_id : user_id,
            permission_id: args.permission.id,
            activate: args.activate
        }), 
        onSettled() {
            queryClient.invalidateQueries(["manyPermissionUserFamily", user_id])
        },
        onError(err: FetchError) {
            return err
        },
    })
}
