import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"

export type Category = {
    id: number,
    label: string,
}

export const useManyCategory = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getAllCategories", { params: { 
            token: accountService.getToken(),
        }}), 
        queryKey: ["manyCategory"],
    })