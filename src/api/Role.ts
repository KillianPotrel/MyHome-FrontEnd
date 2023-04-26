import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"

export type Role = {
    id: number,
    label: string,
    created_at: Date,
    updated_at: Date,
}


export const useGetManyRole = () =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getRoles"), 
        queryKey: ["manyRole"],
    })