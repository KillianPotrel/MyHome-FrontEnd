import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { URL_API } from "../services/key"
import { accountService } from "../services/account.service"
import { successToast } from "../services/toastify.service"
import { FetchError } from "../type/fetchError"

export type EventCalendar = {
    id? : number,
    title: string,
    start: string,
    end: string,
    family_id?: number,
    responsable_id?: number,
    source?: string,
    source_id?: number,
    url?: string,
}

export type ParamsFilter = {
    members: number[],
    type_event: string[]
}

export const useManyEventCalendar = (params : ParamsFilter) =>
    useQuery({
        queryFn: () => {
            return axios.get(URL_API + "getAllEventCalendarByFamily", { params: { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                members: params.members,
                event_type: params.type_event
            }})}, 
        queryKey: ["manyEventCalendar"],
    })

export const usePostEventCalendar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (event : EventCalendar) => {
            return axios.post(URL_API + "createEventCalendar", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                title: event.title,
                responsable_id: event.responsable_id,
                start: event.start,
                end: event.end,
                url: event.url,
        })}, 
        onSuccess() {
            successToast("Évènement ajouté")
        },
        onSettled() {
            queryClient.invalidateQueries(["manyEventCalendar"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}

export const usePutEventCalendar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (event : EventCalendar) => {
            return axios.post(URL_API + "putEventCalendar", { 
                event_calendar_id: event.id,
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                title: event.title,
                responsable_id: event.responsable_id,
                start: event.start,
                end: event.end,
                url: event.url,
                // event_calendar_id	varchar(255)	Oui
                // title	string	oui
                // source	string	oui
                // source_id	integer	oui
        })}, 
        onSuccess() {
            successToast("Évènement modifié")
        },
        onSettled() {
            queryClient.invalidateQueries(["manyEventCalendar"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}



export const useDeleteEventCalendar = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (event_calendar_id : number) => {
            return axios.post(URL_API + "deleteEventCalendar", { 
                token: accountService.getToken(),
                family_id: accountService.getFamily(),
                event_calendar_id,
        })}, 
        onSuccess() {
            successToast("Évènement supprimé")
        },
        onSettled() {
            queryClient.invalidateQueries(["manyEventCalendar"])
        },
        onError(err: FetchError) {
            return err
        },
    })
}
