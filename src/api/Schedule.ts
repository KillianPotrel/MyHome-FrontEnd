import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { FetchError } from "../type/fetchError"
import { accountService } from "../services/account.service"
import { errorToast, successToast } from "../services/toastify.service"

export type Schedule = {
    id?: number,
    day_id: number,
    morning_hour_start?: string,
    morning_hour_end?: string, 
    afternoon_hour_start?: string,
    afternoon_hour_end?: string,
    lunch_outside?: number,
    evening_meal_outside?: number,
  }

export const useManySchedule = () =>
    useQuery({
        queryFn: () =>
        axios.get(URL_API + "getSchedules", { params: { 
            token: accountService.getToken()
        }}), 
        queryKey: ["manySchedule"],
    })

export const useOneSchedule = (schedule_id : number) =>
    useQuery({
        queryFn: () =>{
            if(schedule_id) {
                return axios.get(URL_API + "getScheduleById", { params: { 
                    token: accountService.getToken(),
                    family_id: accountService.getFamily(),
                    schedule_id,
                }})
            }
            return null 
        },
        queryKey: ["oneSchedule", schedule_id],
    })

export const usePostSchedule = () => {
    return useMutation({
        mutationFn: (schedules: Schedule[]) => axios.post(URL_API + "postSchedules", { 
            token: accountService.getToken(),
            family_id: accountService.getFamily(),
            schedules
        }),  
        onSuccess() {
            successToast("Changement des horaires réussi");
        },
        onError(err: FetchError) {
            errorToast("Erreur lors des modifications des horaires");
            return err
        },
    })
}