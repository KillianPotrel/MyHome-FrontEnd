import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { FetchError } from "../type/fetchError"
import { accountService } from "../services/account.service"

export type Schedule = {
    id?: number,
    day: number,
    morning_hour_start?: Date,
    morning_hour_end?: Date, 
    afternoon_hour_start?: Date,
    afternoon_hour_end?: Date,
    lunch_outside?: boolean,
    evening_meal_outside?: boolean,
  }

  
export const useManySchedule = () =>
useQuery({
    queryFn: () =>
    axios.get(URL_API + "getSchedules", { params: { 
        token: accountService.getToken()
    }}), 
    queryKey: ["manySchedule"],
})

 // http://myhomeback.test/api/getSchedules?token=65179465-2eb5-45e1-9f3e-a28cf660e098
export const usePutSchedule = () => {
    return useMutation({
        mutationFn: (schedules: Schedule[]) => axios.post(URL_API + "user/create", schedules),  
        onError(err: FetchError) {
            return err
        },
    })
}