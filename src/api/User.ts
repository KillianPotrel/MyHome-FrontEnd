import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"
import { URL_API } from "../services/key"

export type User = {
    firstname: string 
    lastname: string | null
    birthday: Date | null
    avatar: string | null
    email: string
    password: string
}

export const usePostUserRegister = () => {
    return useMutation({
        mutationFn: (user: User) => axios.post(URL_API + "user/create", user),  
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostUserLogin = () => {
    return useMutation({
        mutationFn: (args : { email : User['email'], password: User['password']}) => 
            axios
            .post(URL_API + "user/login", args)
            .then((res) => {
                if(res.status === 200){
                    accountService.saveToken(res.data.data.token);
                } 
            }),
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostUserLogout = () => {
    return useMutation({
         mutationFn: (args : { token : string | null }) => axios
         .post(URL_API + "disconect", args)
         .then((res) => { 
            accountService.logout();
            accountService.disconnectFamily();
        }),
    })
}

export const useUserInfo = (user_id?: number) =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getUserInfo", { params: { token: accountService.getToken(), user_id: user_id} }), 
        queryKey: ["oneUserInfo"],
        onSettled(res) {console.log(res)}
    })