import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { accountService } from "../services/account.service"
import { FetchError } from "../type/fetchError"
import { URL_API } from "../services/key"
import { Schedule } from "./Schedule"
import { errorToast, successToast } from "../services/toastify.service"

export type User = {
    id?: number,
    token?: string,
    firstname: string 
    lastname: string | null
    birthday: Date | null
    avatar: any
    email: string
    password: string
    schedules?: Schedule[]
}

export type ChangePassword = {
    token?: string,
    oldpassword: string,
    newpassword: string,
}

export const usePostUserRegister = () => {
    return useMutation({
        mutationFn: (user: User) => axios.post(URL_API + "user/create", user),  
        onSuccess() {
            successToast("Inscription réussi");
        },
        onError(err: FetchError) {
            errorToast("Erreur lors de l'inscription");
            if(err.response.status === 401)
              errorToast("Cet email est déjà pris");
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
        onSuccess() {
            successToast("Connexion réussi");
        },
        onError(err: FetchError) {
            errorToast("Erreur lors de la connexion");
            if(err.response.status === 403)
                errorToast("Merci de confirmer votre adresse email");
            if(err.response.status === 405)
                errorToast("Email ou mot de passe incorrect");
              
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
        onSuccess() {
            successToast("Déconnexion de l'utilisateur");
        },
        onError() {
            errorToast("Erreur lors de la déconnexion");
        }
    })
}

export const useUserInfo = (user_id?: number) =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getUserInfo", { params: { token: accountService.getToken(), user_id: user_id} }), 
        queryKey: ["oneUserInfo"],
    })

export const usePutUser = () => {
    return useMutation({
        mutationFn: (args : User) => {
            args.token = accountService.getToken()
            return axios.post(URL_API + "editInfoUser", args,
                { headers: {
                    'Content-Type': 'application/json',
                    }},
                
        )},
        onSuccess() {
            successToast("Changement des informations réussi");
        },
        onError(err: FetchError) {
            errorToast("Erreur lors des modifications du profil");
            return err
        },
    })
}

export const usePutPassword = () => {
    return useMutation({
        mutationFn: (args : ChangePassword) => {
            args.token = accountService.getToken()
            return axios
                .post(URL_API + "changePassword", args)
        },
        onSuccess() {
            successToast("Changement de mot de passe réussi");
        },
        onError(err: FetchError) {
            errorToast("Erreur lors de la modification du mot de passe");
            if(err.response.status === 404)
            errorToast("L'ancien mot de passe n'est pas correct");
            if(err.response.status === 403)
                errorToast("Le mot de passe doit faire au minimum 7 caractères");
            return err
        },
    })
}
    