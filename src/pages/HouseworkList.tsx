import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Housework, HouseworkParams, useDeleteHousework, useManyHousework, usePostHousework } from '../api/Housework';
import { Dialog, Transition } from '@headlessui/react';
import { format } from '../_utils/FormatDate';
import { Day, useManyDay } from '../api/Day';
import { Member, useManyMembersByFamily } from '../api/Family';
import { errorToast } from '../services/toastify.service';
import Skeleton from 'react-loading-skeleton';
import PermissionGates from '../_utils/PermissionGates';

const HouseworkList = () : JSX.Element => {
    const [open, setOpen] = useState(false)
    const [newHousework, setNewHousework] = useState<HouseworkParams>()
    const [isPeriodical, setIsPeriodical] = useState(false)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if(!newHousework) setIsPeriodical(true)
    },[newHousework])
    const { data : dataHousework, isLoading : isLoadingHousework } = useManyHousework()
    const houseworks : Housework[] = dataHousework?.data

    const { data : dataDay, isLoading : isLoadingDay } = useManyDay()
    const days : Day[] = dataDay?.data

    const { data : dataMember, isLoading : isLoadingMember } = useManyMembersByFamily()
    const members : Member[] = dataMember?.data

    const deleteHousework = useDeleteHousework()
    const postHousework = usePostHousework()

    const handleChange = (e: any) => {
        if(e.target.name === "date"){
            setNewHousework({
                ...newHousework,
                    [e.target.name]: new Date(e.target.value),
                });
        } else {
            setNewHousework({
                ...newHousework,
                    [e.target.name]: e.target.value,
                });
        }
    }

    const handleSubmit = () => {
        if(isPeriodical) {
            if(!newHousework?.title || !newHousework?.responsable_id || !newHousework?.day_id || !newHousework?.periodicity) {
                errorToast("Un des champs est mal renseigné")
                return
            }
            const tempHousework : HouseworkParams = {
                title: newHousework.title,
                responsable_id: newHousework.responsable_id,
                day_id: newHousework.day_id,
                periodicity: newHousework.periodicity
            }
            postHousework.mutate(tempHousework)
        } else {
            if(!newHousework?.title || !newHousework?.responsable_id || !newHousework?.date ) {
                errorToast("Un des champs est mal renseigné")
                return
            }
            const tempHousework : HouseworkParams = {
                title: newHousework.title,
                responsable_id: newHousework.responsable_id,
                date: newHousework.date,
            }
            postHousework.mutate(tempHousework)
        }
        setNewHousework(null)
        setOpen(false)
    }

    const handleDelete = (housework_id : number) => {
        deleteHousework.mutate(housework_id)
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {isLoadingHousework || isLoadingDay || isLoadingMember ? (
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
                                                Création d'une tâche
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className='flex flex-col justify-center gap-6 py-4'>
                                                    
                                                    <div className='flex flex-row'>
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="title">
                                                                Description 
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                id="title"
                                                                value={newHousework?.title}
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
                                                                value={newHousework?.responsable_id ?? 0}
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
                                                    <hr className="my-3"/>
                                                    <div className='flex flex-row items-center'>
                                                        <input
                                                        id={`periodical`}
                                                        name="is_periodical"
                                                        type="radio"
                                                        checked={isPeriodical}
                                                        onChange={() => setIsPeriodical(true)}
                                                        className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-600"
                                                        />
                                                        <div className="ml-3 min-w-0 flex-1 text-sm leading-6">
                                                            <label htmlFor={`periodical`} className="select-none font-medium text-gray-900">
                                                                Périodique
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-row justify-between'>
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="day_id">
                                                                Jour 
                                                            </label>
                                                            <select
                                                                id="day_id"
                                                                name="day_id"
                                                                value={newHousework?.day_id ?? 0}
                                                                onChange={handleChange}
                                                                className="relative block w-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                            >
                                                                <option value={undefined}></option>
                                                                {days && days.map(day => (
                                                                    <option key={day.id} value={day.id}>{day.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        
                                                        <div className='w-full p-1'>
                                                            <label htmlFor="periodicity">
                                                                Périodicité (en jour)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="periodicity"
                                                                id="periodicity"
                                                                checked={isPeriodical}
                                                                onChange={handleChange}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                                                />
                                                        </div>
                                                    </div>
                                                    <hr className="my-3"/>
                                                    <div className='flex flex-row items-center'>
                                                        <input
                                                            id={`punctual`}
                                                            name="is_periodical"
                                                            type="radio"
                                                            value={isPeriodical === true ? 0 : 1}
                                                            onChange={() => setIsPeriodical(false)}
                                                            className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-600"
                                                            />
                                                        <div className="ml-3 min-w-0 flex-1 text-sm leading-6">
                                                            <label htmlFor={`punctual`} className="select-none font-medium text-gray-900">
                                                                Ponctuel
                                                            </label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <label htmlFor="date">
                                                            Date 
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="date"
                                                            id="date"
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
            <div className="py-12 flex justify-center flex-col">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Tâches ménagères</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Vous pouvez retrouver toutes les tâches ménagères qui peuvent être soit périodique soit ponctuel.
                        </p>
                    </div>
                    <PermissionGates permission_key='modify_housework'>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="block rounded-md bg-amber-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            >
                                Ajouter une tâche
                            </button>
                        </div>
                    </PermissionGates>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        {houseworks && houseworks.length > 0 ?
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <div className="max-h-96 overflow-y-scroll">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="sticky top-0 z-10 bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Nom
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Jour
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Périodique
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Responsable
                                                </th>
                                                
                                                <PermissionGates permission_key='modify_housework'>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                        <span className="sr-only">Delete</span>
                                                    </th>
                                                </PermissionGates>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white overflow-y-scroll max-h-96">
                                            {houseworks.map((housework) => (
                                            <tr key={housework.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {housework.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {days?.find(item => item.id === housework?.day_id)?.label}                                                
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {housework.periodicity !== null && 
                                                        <>
                                                            {housework.periodicity}
                                                            {housework?.periodicity > 1 ? " jours" : " jour" }
                                                        </>
                                                    }
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {format(housework.date)}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {housework.responsable_name}
                                                </td>
                                                <PermissionGates permission_key='modify_housework'>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <button 
                                                            type='button' className="text-red-600 hover:text-red-900"
                                                            onClick={() => handleDelete(housework.id)}>
                                                            Supprimer<span className="sr-only">, {housework.id}</span>
                                                        </button>
                                                    </td>
                                                </PermissionGates>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                                :
                                <p className="text-center mt-4 text-lg leading-8 text-gray-600">Vous n'avez pas encore de tâches ménagères</p>
                            }
                    </div>
                </div>
            </div>
            </>
        )}
        </div>
    );
};

export default HouseworkList;



  