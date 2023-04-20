import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"

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
        mutationFn: (user: User) => axios.post("http://my-home.back.kpotrel.fr/api/user/create", user),  
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePostUserLogin = () => {
    return useMutation({
        mutationFn: (args : { email : User['email'], password: User['password']}) => 
        axios
        .post("http://my-home.back.kpotrel.fr/api/user/login", args)
        .then((res) => {
            console.log(res) 
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
         .post("http://my-home.back.kpotrel.fr/api/disconect", args)
         .then((res) => { 
            console.log(res)
            accountService.logout();
        }),
         onSuccess:(result) => {console.log(result)}   
         })
}