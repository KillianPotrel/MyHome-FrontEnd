import React, { useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventCalendar, ParamsFilter, useDeleteEventCalendar, useManyEventCalendar, usePutEventCalendar } from '../api/EventCalendar';
import ModalNewEvent from '../components/ModalNewEvent';
import { Member, useManyMembersByFamily } from '../api/Family';
import { useQueryClient } from '@tanstack/react-query';
import { errorToast } from '../services/toastify.service';
import { EventClickArg } from '@fullcalendar/core';
import EventSourceRender from '../components/EventSourceRender';
import Skeleton from 'react-loading-skeleton';
import PermissionGates from '../_utils/PermissionGates';

const input_type_event = [
    { id: 'event', name: 'event', description: 'Évènement ponctuel'},
    { id: 'exit_request', name: 'exit_request', description: 'Sortie validée'},
    { id: 'menu', name: 'menu', description: 'Menu'},
    { id: 'housework', name: 'housework', description: 'Ménage'},
    { id: 'schedule', name: 'schedule', description: 'Horaire'},
]
const Planning = () : JSX.Element => {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const [display, setDisplay] = useState("hidden")
    const [eventCalendar, setEventCalendar] = useState<EventCalendar>()
    const [paramsFilter, setParamsFilter] = useState<ParamsFilter>({
        members: [],
        type_event: []
    })
    const cancelButtonRef = useRef(null)
    const { data : dataEventCalendar, isLoading : isLoadingCalendar } = useManyEventCalendar(paramsFilter)
    const eventCalendars : any[] = dataEventCalendar?.data

    const { data : dataMembers, isLoading : isLoadingMember } = useManyMembersByFamily()
    const members : Member[] | undefined = dataMembers?.data
    
    const putEventCalendar = usePutEventCalendar()
    const deleteEventCalendar = useDeleteEventCalendar()

    const handleDisplayFilter = () => {
      if(display=== "hidden"){
        setDisplay("flex")
      } else {
        setDisplay("hidden")
      }
    } 

    const handleCheckboxFilter = (e : any) => {
        let tempParamsFilter : ParamsFilter = paramsFilter
        if(e.target.name.includes('member')){
            const id_member = e.target.name.split('_')[1]
            if(tempParamsFilter.members.find(item => item === id_member) && e.target.checked === false){
                var myIndex = tempParamsFilter.members.indexOf(id_member);
                if (myIndex !== -1) {
                    tempParamsFilter.members.splice(myIndex, 1);
                }
            } else {
                tempParamsFilter.members.push(id_member)
            }
        } else {
          if(tempParamsFilter.type_event.find(item => item === e.target.name) && e.target.checked === false){
              var myIndex = tempParamsFilter.type_event.indexOf(e.target.name);
              if (myIndex !== -1) {
                  tempParamsFilter.type_event.splice(myIndex, 1);
              }
          } else {
              tempParamsFilter.type_event.push(e.target.name)
          }
        }
        setParamsFilter(tempParamsFilter)
    }

    const handleSearchFilter = () => {
        queryClient.refetchQueries(["manyEventCalendar"]);
    }

    const handleEventClick = (info : EventClickArg) => {
        info.jsEvent.preventDefault();
        setEventCalendar(null)
        const start : Date = new Date(info.event._instance.range.start);
        const convert_start = start.setHours(start.getHours() - 2);
        const start_date = new Date(convert_start).toLocaleDateString().split('/')
        const start_time = new Date(convert_start).toLocaleTimeString()

        const end : Date = new Date(info.event._instance.range.end);
        const convert_end = end.setHours(end.getHours() - 2);
        const end_date = new Date(convert_end).toLocaleDateString().split('/')
        const end_time = new Date(convert_end).toLocaleTimeString()
    
        setEventCalendar({
            id: parseInt(info.event._def.publicId),
            title: info.event._def.title,
            start: start_date[2] + "-" + start_date[1] + "-" + start_date[0] + " " + start_time,
            end: end_date[2] + "-" + end_date[1] + "-" + end_date[0] + " " + end_time,
            source: info.event._def.extendedProps.source,
            url: info.event._def.url !== "null" ? info.event._def.url : '',
            source_id: info.event._def.extendedProps.source_id,
            family_id: info.event._def.extendedProps.family_id,
            responsable_id: info.event._def.extendedProps.responsable_id,
        })
        setOpen(true)
    }

    const handleChange = (e: any) => {
        let value = e.target.value
        if(e.target.name === "start" || e.target.name === "end") value = e.target.value.replace("T", " ")
        setEventCalendar({
            ...eventCalendar,
                [e.target.name]: value,
            });
    }

    const handleSubmit = () => {
        if(!eventCalendar?.title || !eventCalendar?.start || !eventCalendar?.end) {
            errorToast("Un des champs est mal renseigné")
            return
        }
        putEventCalendar.mutate(eventCalendar)
        setEventCalendar(null)
        setOpen(false)
    }

    const handleDelete = () => {
      deleteEventCalendar.mutate(eventCalendar.id)
      setEventCalendar(null)
      setOpen(false)
  }
    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {isLoadingCalendar || isLoadingMember ? (
        <div className='mt-10'>
          <Skeleton count={1} height={100} style={{marginBottom: "15px"}} />
          <Skeleton count={5} />
        </div>
      ) : (
        <>
          <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div>
                                        <div className="mt-3 sm:ml-4 sm:mt-0">
                                            <Dialog.Title as="h3" className="text-center text-base font-semibold leading-6 text-gray-900">
                                                Modifier l'évènement
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className='flex flex-col justify-center gap-6 py-4'>
                                                    <div className='flex flex-row'>
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="title">
                                                                Titre 
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                id="title"
                                                                value={eventCalendar?.title}
                                                                onChange={handleChange}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                                />
                                                        </div>
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="responsable_id">
                                                                Responsable 
                                                            </label>
                                                            <select
                                                                id="responsable_id"
                                                                name="responsable_id"
                                                                value={eventCalendar?.responsable_id ?? 0}
                                                                onChange={handleChange}
                                                                className="relative block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                            >
                                                                <option value={undefined}></option>
                                                                {members && members.map(member => (
                                                                    <option key={member.id} value={member.id}>{member.firstname}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row justify-between'>
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="start">
                                                                Date de début
                                                            </label>
                                                            <input
                                                                type="datetime-local"
                                                                name="start"
                                                                id="start"
                                                                value={eventCalendar?.start}
                                                                onChange={handleChange}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                                />
                                                        </div>
                                                        
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="end">
                                                                Date de fin
                                                            </label>
                                                            <input
                                                                type="datetime-local"
                                                                name="end"
                                                                id="end"
                                                                value={eventCalendar?.end}
                                                                onChange={handleChange}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                                />
                                                        </div>
                                                    </div>
                                                    <div className='w-full p-1'>
                                                          <label htmlFor="url">
                                                              Lien de l'évènement (URL) 
                                                          </label>
                                                          <div className='flex flex-row justify-between'>
                                                          <input
                                                              type="url"
                                                              name="url"
                                                              id="url"
                                                              value={eventCalendar?.url}
                                                              onChange={handleChange}
                                                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                              />
                                                          {eventCalendar?.url && 
                                                              <button
                                                                  type="button"
                                                                  className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
                                                                  onClick={() => window.open(eventCalendar?.url, '_blank')}
                                                              >
                                                                  Voir
                                                              </button>
                                                          
                                                          }
                                                          </div>
                                                    </div>
                                                </div>
                                                {eventCalendar?.source !== "event" &&
                                                  <EventSourceRender source={eventCalendar?.source} source_id={eventCalendar?.source_id}/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse justify-between sm:px-6">
                                    <div className='flex gap-3'>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Annluer
                                        </button>
                                        <PermissionGates permission_key='modify_event'>
                                          <button
                                              type="button"
                                              className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
                                              onClick={handleSubmit}
                                          >
                                              Modifier
                                          </button>
                                        </PermissionGates>
                                    </div>
                                    <PermissionGates permission_key='modify_event'>
                                      <button
                                          type="button"
                                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                          onClick={handleDelete}
                                      >
                                          Supprimer
                                      </button>
                                    </PermissionGates>
                                </div>
                            </Dialog.Panel>
                          </Transition.Child>
                      </div>
                  </div>
              </Dialog>
          </Transition.Root>
        <div className="flex justify-center flex-col">
          <div className="mt-8 max-h-lg">
            <div className='flex justify-between'>
                <h3 className="text-xl font-bold mb-4">Calendrier</h3>
                <PermissionGates permission_key='modify_event'>
                  <button 
                      type='button'
                      onClick={handleDisplayFilter}
                      className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                      >
                          Filtre de recherche
                  </button>
                  <ModalNewEvent />
                </PermissionGates>
            </div>
            <div className={`${display} justify-center my-5`}>
              
              <div className="w-full divide-y divide-gray-900/10">
                  <div className="w-full bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                      <div className="flex flex-col justify-arround">
                        <div className="mt-6 space-y-6">
                          <div className="text-m font-semibold leading-6 text-gray-900">Membres</div>
                          <div className='flex flex-row gap-5'>
                            {members && members?.map(member => (
                              <div key={member.id} className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    id={'member_' + member.id}
                                    name={'member_' + member.id}
                                    type="checkbox"
                                    onChange={handleCheckboxFilter}
                                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                                  />
                                </div>
                                <div className="text-sm leading-6">
                                  <label htmlFor="comments" className="font-medium text-gray-900">
                                    {member?.firstname}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 space-y-6">
                          <div className="text-m font-semibold leading-6 text-gray-900">Type d'évènements</div>
                          <div className='flex flex-row gap-5'>
                            {input_type_event.map(event_type => (
                              <div key={event_type.id} className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    id={event_type.id}
                                    name={event_type.name}
                                    type="checkbox"
                                    onChange={handleCheckboxFilter}
                                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                                  />
                                </div>
                                <div className="text-sm leading-6">
                                  <label htmlFor="comments" className="font-medium text-gray-900">
                                    {event_type.description}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                      <button
                        type="button"
                        className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        onClick={handleSearchFilter}
                      >
                        Rechercher
                      </button>
                    </div>
                  </div>
              </div>
            </div>
            {eventCalendars && 
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                locale={'fr-FR'}
                scrollTime={"07:00:00"}
                height={800}
                events={eventCalendars}
                eventContent={renderEventContent}
                headerToolbar={{
                  start: 'prev,next',
                  center:'title',
                  end:"timeGridWeek,dayGridMonth",
                }}
                eventColor='transparent'
                eventTextColor='#333333'
                eventBorderColor='transparent'
                eventBackgroundColor='transparent'
                eventClick={handleEventClick} 
              />
            }
          </div>
    
        </div>
        </>
      )}
      </div>
    );
};

function renderEventContent(eventInfo : any) {
    let color = '';
    const source = eventInfo.event.extendedProps.source;
    switch (source) {
      case 'menu':
        color = '#F2E6FF';
        break;
      case 'exit_request':
        color = '#D1F0FF';
        break;
      case 'schedule':
        color = '#FFF2D1';
        break;
      case 'housework':
        color = '#E6FCD9';
        break;
      case 'event':
        color = '#FFE6D1';
        break;
      default:
        color = '#FFE6D1';
        break;
    }
    return (
      <div style={{ 
        backgroundColor: color,
        height: "100%",
        width: "100%",
        borderRadius: '3px',
        overflow: 'hidden',
        // textDecorationLine: "line-through"
      }}> { eventInfo.event.title } </div>


    );
}

export default Planning;