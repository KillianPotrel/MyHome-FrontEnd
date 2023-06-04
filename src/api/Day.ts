import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"

export type Day = {
    id: number, 
    label: string, 
    created_at: Date, 
    updated_at: Date
}
export const useManyDay = () =>
    useQuery({
        queryFn: () => axios.get(URL_API + "getDays"), 
        queryKey: ["manyDay"],
    })