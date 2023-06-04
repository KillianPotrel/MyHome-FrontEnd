import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"

export type Notification = {
    id: number,
    user_family_id: number,
    category: string,
    text: string,
    url?: string,
    already_view: 0,
    created_at: Date,
    updated_at: Date,
  }

  
export const useManyNotification = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getNotifications", { params: { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
        }}), 
        queryKey: ["manyNotification"],
    })

    
export const useDeleteNotification = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (args ?: number) => {
            return axios.post(URL_API + "deleteNotifications", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            notification_id: args
        })}, 
        onSettled() {
            queryClient.invalidateQueries(["manyNotification"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}