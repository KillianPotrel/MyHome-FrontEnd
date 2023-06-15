import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"

export type Difficulty = {
    id: number,
    label: string,
    color: string,
    strong: number,
}

export const useManyDifficulty = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getAllDifficulties", { params: { 
            token: accountService.getToken(),
        }}), 
        queryKey: ["manyDifficulty"],
    })