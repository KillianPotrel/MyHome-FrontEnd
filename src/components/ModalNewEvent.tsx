import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { Member, useManyMembersByFamily } from '../api/Family';
import { EventCalendar, usePostEventCalendar } from '../api/EventCalendar';
import { errorToast } from '../services/toastify.service';


const ModalNewEvent = ():JSX.Element => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [newEvent, setNewEvent] = useState<EventCalendar>()
    const postEventCalendar = usePostEventCalendar()
    
    const { data : dataMember } = useManyMembersByFamily()
    const members : Member[] = dataMember?.data

    const handleChange = (e: any) => {
        let value = e.target.value
        if(e.target.name === "start" || e.target.name === "end") value = e.target.value.replace("T", " ")
        setNewEvent({
            ...newEvent,
                [e.target.name]: value,
            });
        
    }

    const handleSubmit = () => {
        if(!newEvent?.title || !newEvent?.responsable_id || !newEvent?.start || !newEvent?.end || newEvent.start >= newEvent.end) {
            errorToast("Un des champs est mal renseigné")
            return
        }
        postEventCalendar.mutate(newEvent)
        
        setNewEvent(null)
        setOpen(false)
    }

    return (
        <>
            <button 
                type='button'
                onClick={() => setOpen(true)}
                className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Nouvel évènement
            </button>
            
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
                                                Créer un nouvel évènement
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
                                                                value={newEvent?.title}
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
                                                                value={newEvent?.responsable_id ?? 0}
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
                                                                value={newEvent?.start}
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
                                                                value={newEvent?.end}
                                                                onChange={handleChange}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                                />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="url">
                                                            Lien de l'évènement (URL) 
                                                        </label>
                                                        <input
                                                            type="url"
                                                            name="url"
                                                            id="url"
                                                            //value={newEvent?.url}
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
                                    onClick={handleSubmit}
                                >
                                    Créer
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Annluer
                                </button>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ModalNewEvent;